import { getProducts } from "@/actions/productActions";
import ProductInventory from "@/components/product-components/ProductInventory";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Page() {
    const result = await getProducts();

    if (!result.success) {
        if (result.error === "Unauthorized") {
            redirect("/login");
        }
        console.error("Failed to fetch products:", result.error);
    }

    const products = result.products || [];

    return <ProductInventory initialProducts={products} />;
}
