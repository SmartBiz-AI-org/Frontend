"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ProductSchema, ProductInput } from "@/lib/validations/product";
import { revalidatePath } from "next/cache";

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
        omit: { updatedAt: true }
    });

    if (!sme) {
        throw new Error("SME not found. Please complete onboarding.");
    }

    return sme;
}

/**
 * Fetch all products for the current SME.
 */
export async function getProducts() {
    try {
        const sme = await getSme();
        const products = await prisma.product.findMany({
            where: { smeId: sme.id },
            orderBy: { createdAt: "desc" },
            omit: { updatedAt: true }
        });
        return { success: true, products };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Create a new product.
 */
export async function createProduct(data: ProductInput) {
    try {
        const validatedData = ProductSchema.parse(data);
        const sme = await getSme();

        const product = await prisma.product.create({
            data: {
                ...validatedData,
                smeId: sme.id,
            }
        });

        revalidatePath("/dashboard/products");
        return { success: true, message: "Product created successfully" };
    } catch (error: any) {
        if (error.name === "ZodError") {
            return { success: false, error: "Invalid data submitted" };
        }
        return { success: false, error: error.message || "Failed to create product" };
    }
}

/**
 * Update an existing product.
 */
export async function updateProduct(id: string, data: Partial<ProductInput>) {
    try {
        const sme = await getSme();

        // Ensure product belongs to this SME
        const existingProduct = await prisma.product.findFirst({
            where: { id, smeId: sme.id }
        });

        if (!existingProduct) {
            return { success: false, error: "Product not found" };
        }

        const product = await prisma.product.update({
            where: { id },
            data: data
        });

        revalidatePath("/dashboard/products");
        return { success: true, message: "Product updated successfully" };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to update product" };
    }
}

/**
 * Delete a product.
 */
export async function deleteProduct(id: string) {
    try {
        const sme = await getSme();

        // Ensure product belongs to this SME
        const existingProduct = await prisma.product.findFirst({
            where: { id, smeId: sme.id }
        });

        if (!existingProduct) {
            return { success: false, error: "Product not found" };
        }

        await prisma.product.delete({
            where: { id }
        });

        revalidatePath("/dashboard/products");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to delete product" };
    }
}
/**
 * Fetch a single product by ID.
 */
export async function getProductById(id: string) {
    try {
        const sme = await getSme();
        const product = await prisma.product.findFirst({
            where: { id, smeId: sme.id },
            omit: { updatedAt: true }
        });
        
        if (!product) {
            return { success: false, error: "Product not found" };
        }

        return { success: true, product };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
