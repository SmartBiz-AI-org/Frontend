import { z } from "zod";

export const ProductStatusSchema = z.enum(["Active", "Draft", "Archived", "Low Stock", "Out of Stock"]);

export const ProductSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    sku: z.string().optional(),
    price: z.number().min(1, "Price must be at least 1"),
    stock: z.number().int().min(1, "Stock must be 1 and above"),
    category: z.string().optional().nullable(),
    size: z.string().optional().nullable(),
    status: ProductStatusSchema.default("Active"),
    description: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
});

export type ProductInput = z.infer<typeof ProductSchema>;
