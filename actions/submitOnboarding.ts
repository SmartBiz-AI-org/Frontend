"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

import { OnboardingSchema } from "@/lib/validations/onboarding";

/**
 * Server action to submit onboarding data.
 * @param data - The onboarding data.
 * @returns An object with success status and slug if successful, or error message if failed.
 */
export async function submitOnboarding(data: any) {
    try {
        const validatedData = OnboardingSchema.parse(data);

        const session = await auth.api.getSession({
            headers: await headers(),
        });
        
        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;
        const userEmail = session.user.email;

        let slug = validatedData.businessProfile.businessName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        const existingSme = await prisma.sme.findUnique({ where: { slug } });
        if (existingSme) {
            slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
        }

        const sme = await prisma.sme.create({
            data: {
                userId,
                businessName: validatedData.businessProfile.businessName,
                slug,
                description: validatedData.businessProfile.description,
                nationalId: validatedData.businessProfile.nationalId,
                cacRegistration: validatedData.businessProfile.cacRegistration,
                logoUrl: validatedData.businessProfile.logoUrl || null,
                email: userEmail,
                whatsapp: "", 
                aiTone: validatedData.preferences.aiTone,
                language: validatedData.preferences.language,
                autoInvoicing: validatedData.preferences.autoInvoicing,
                products: {
                    create: validatedData.products.map((p: any) => ({
                        name: p.name,
                        price: p.price,
                        category: p.category || null,
                        size: p.size || null,
                        stock: p.stock,
                        image: p.image || null,
                    }))
                }
            }
        });

        await prisma.user.update({
            where: { id: userId },
            data: { onboardingCompleted: true }
        });

        return { success: true, slug: sme.slug };
    } catch (error: any) {
        if (error.name === "ZodError") {
            return { success: false, error: "Invalid data submitted" };
        }
        return { success: false, error: error.message || "Failed to submit onboarding data" };
    }
}
