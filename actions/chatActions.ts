"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

interface HistoryEntry {
    role: "user" | "assistant";
    content: string;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Build a system instruction that injects the SME's business context
 * so the AI responds as a knowledgeable agent for that specific business.
 */
function buildSystemInstruction(sme: {
    businessName: string;
    description: string | null;
    email: string | null;
    whatsapp: string | null;
    address: string | null;
    aiTone: string;
}, products: any[], transactions: any[], invoices: any[]): string {
    return [
        `You are the AI agent for "${sme.businessName}".`,
        sme.description ? `Business description: ${sme.description}` : "",
        sme.address ? `Business address: ${sme.address}` : "",
        "You help the business owner manage sales, generate invoices, track payments, and understand their business performance.",
        "Be concise, professional, and helpful. Use plain language without unnecessary jargon.",
        `Respond in "${sme.aiTone}" tone.`,
        "If you do not have enough information to answer a question accurately, say so honestly rather than guessing.",
        "After you return information about a product or service to a user, you MUST ask if you should generate an invoice for them.",
        sme.email ? `Business email: ${sme.email}` : "",
        sme.whatsapp ? `Business WhatsApp: ${sme.whatsapp}` : "",
        "\n--- PRODUCTS ---",
        products.length > 0 ? JSON.stringify(products, null, 2) : "No products available.",
        "\n--- RECENT INVOICES ---",
        invoices.length > 0 ? JSON.stringify(invoices, null, 2) : "No invoices found.",
        "\n--- PAST TRANSACTIONS ---",
        transactions.length > 0 ? JSON.stringify(transactions, null, 2) : "No past transactions found.",
    ]
        .filter(Boolean)
        .join("\n");
}

export async function getChatHistory() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, history: [] as HistoryEntry[] };
    }

    const chatSession = await prisma.chatSession.findUnique({
        where: { customerEmail: session.user.email },
    });

    return { 
        success: true, 
        history: (chatSession?.messages as unknown as HistoryEntry[]) || [] 
    };
}

/**
 * Send a chat message to the Gemini API with SME context.
 * Authenticates the user, fetches their SME profile, and returns the AI response.
 */
export async function sendChatMessage(
    message: string
): Promise<{ success: boolean; message: string }> {
    if (!GEMINI_API_KEY) {
        return { success: false, message: "AI service is not configured" };
    }

    // Authenticate the user
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, message: "Unauthorized" };
    }

    // Fetch SME context
    const sme = await prisma.sme.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    if (!sme) {
        return { success: false, message: "Business profile not found" };
    }

    // Fetch Products and Transactions for context
    const products = await prisma.product.findMany({
        where: { smeId: sme.id }
    });
    const transactions = await prisma.transaction.findMany({
        where: { smeId: sme.id, customerEmail: session.user.email }
    });
    const invoices = await prisma.invoice.findMany({
        where: { smeId: sme.id, customerEmail: session.user.email },
        orderBy: { createdAt: "desc" },
        take: 10
    });

    try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        // Retrieve existing history directly from database to ensure consistency
        let chatSession = await prisma.chatSession.findUnique({
            where: { customerEmail: session.user.email }
        });

        let currentHistory: HistoryEntry[] = chatSession 
            ? (chatSession.messages as unknown as HistoryEntry[]) 
            : [];

        // Build the conversation contents for Gemini
        const contents = currentHistory.map((entry) => ({
            role: entry.role === "assistant" ? "model" as const : "user" as const,
            parts: [{ text: entry.content }],
        }));

        // Add the current user message
        contents.push({
            role: "user" as const,
            parts: [{ text: message }],
        });

        // Append to history state
        currentHistory.push({ role: "user", content: message });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                systemInstruction: buildSystemInstruction(sme, products, transactions, invoices),
                maxOutputTokens: 1024,
                temperature: 0.7,
            },
        });

        const text = response.text ?? "";

        if (!text) {
            return { success: false, message: "The AI returned an empty response. Please try again." };
        }

        currentHistory.push({ role: "assistant", content: text });

        // Limit to last 20 messages to prevent excessive length
        if (currentHistory.length > 20) {
            currentHistory = currentHistory.slice(currentHistory.length - 20);
        }

        // Save back to database
        if (chatSession) {
            await prisma.chatSession.update({
                where: { id: chatSession.id },
                data: { messages: currentHistory as any }
            });
        } else {
            await prisma.chatSession.create({
                data: {
                    smeId: sme.id,
                    customerEmail: session.user.email,
                    messages: currentHistory as any
                }
            });
        }

        return { success: true, message: text };
    } catch (error: any) {
        console.error("[chatActions] Gemini API error:", error);
        return {
            success: false,
            message: error.message || "Failed to get a response from the AI.",
        };
    }
}
