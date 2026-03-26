import { z } from "zod";
import { BusinessProfileSchema, PreferencesSchema } from "./sme";

export { BusinessProfileSchema, PreferencesSchema };

export const ProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  category: z.string().min(1, "Category is required"),
  size: z.string().min(1, "Size is required"),
  stock: z.coerce.number().min(1, "Stock must be at least 1").int(),
  image: z.string().min(1, "Product image is required"),
});

export const OnboardingSchema = z.object({
  businessProfile: BusinessProfileSchema,
  products: z.array(ProductSchema).min(1, "At least one product is required"),
  preferences: PreferencesSchema,
});
