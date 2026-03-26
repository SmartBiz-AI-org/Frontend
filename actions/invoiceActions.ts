"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Get the current SME for the logged-in user.
 */
async function getSme() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const sme = await prisma.sme.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    if (!sme) {
        throw new Error("SME not found. Please complete onboarding.");
    }

    return sme;
}

/**
 * Fetch all invoices for the current SME.
 */
export async function getInvoices() {
    try {
        const sme = await getSme();
        const invoices = await prisma.invoice.findMany({
            where: { smeId: sme.id },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, invoices };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Fetch invoice statistics for the current SME.
 */
export async function getInvoiceStats() {
    try {
        const sme = await getSme();
        
        const allInvoices = await prisma.invoice.findMany({
            where: { smeId: sme.id },
        });

        const totalInvoiced = allInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
        const paidAmount = allInvoices
            .filter(inv => inv.status === "PAID")
            .reduce((acc, inv) => acc + inv.totalAmount, 0);
        const pendingAmount = allInvoices
            .filter(inv => inv.status === "PENDING")
            .reduce((acc, inv) => acc + inv.totalAmount, 0);
        const overdueAmount = allInvoices
            .filter(inv => inv.status === "OVERDUE")
            .reduce((acc, inv) => acc + inv.totalAmount, 0);

        return {
            success: true,
            stats: {
                totalInvoiced,
                paidAmount,
                pendingAmount,
                overdueAmount,
                count: allInvoices.length,
                paidCount: allInvoices.filter(inv => inv.status === "PAID").length,
                pendingCount: allInvoices.filter(inv => inv.status === "PENDING").length,
                overdueCount: allInvoices.filter(inv => inv.status === "OVERDUE").length,
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Create a new invoice.
 */
export async function createInvoice(data: {
    customerName: string;
    customerEmail: string;
    invoiceNumber: string;
    referenceNumber: string;
    items: any[];
    subtotal: number;
    tax: number;
    taxRate: number;
    discount: number;
    discountRate: number;
    totalAmount: number;
    dueDate: Date;
    internalNotes?: string;
}) {
    try {
        const sme = await getSme();

        const invoice = await prisma.invoice.create({
            data: {
                ...data,
                smeId: sme.id,
            }
        });

        return { success: true, invoice };
    } catch (error: any) {
        console.error("[createInvoice] Error:", error);
        return { success: false, error: error.message };
    }
}
/**
 * Fetch a single invoice by ID with SME details.
 */
export async function getInvoiceById(id: string) {
    try {
        const sme = await getSme();

        const invoice = await prisma.invoice.findFirst({
            where: {
                id,
                smeId: sme.id
            },
            include: {
                sme: true
            }
        });

        if (!invoice) {
            return { success: false, error: "Invoice not found" };
        }

        return { success: true, invoice };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
