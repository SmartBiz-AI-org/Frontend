import { getProductById } from "@/actions/productActions";
import ProductDetailHeader from "@/components/product-components/ProductDetailHeader";
import ProductMainCard from "@/components/product-components/ProductMainCard";
import ProductStatsBar from "@/components/product-components/ProductStatsBar";
import ProductInventoryCard from "@/components/product-components/ProductInventoryCard";
import ProductInteractionsFeed from "@/components/product-components/ProductInteractionsFeed";
import ProductTransactionsTable from "@/components/product-components/ProductTransactionsTable";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;

    const result = await getProductById(id);
    const product = result.success ? (result.product as any) : null;

    if (!product) {
        return (
            <div className="p-8 text-center bg-[#F8FAFC] min-h-screen">
                <div className="max-w-md mx-auto bg-white p-12 rounded-2xl border border-[#E2E8F0] shadow-sm">
                    <p className="text-[#64748B] text-lg mb-6">Product not found.</p>
                    <Link href="/dashboard/products">
                        <button className="px-6 py-2.5 bg-[#EB5119] text-white rounded-lg font-bold hover:bg-[#D44616] transition-all">
                            Back to products
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 w-full flex flex-col gap-8 bg-[#F8FAFC] min-h-screen">
            {/* Page Header (Breadcrumbs + Actions) */}
            <ProductDetailHeader product={product} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <ProductMainCard product={product} />
                    <ProductStatsBar />
                    <ProductTransactionsTable />
                </div>

                {/* Right Column (1/3) */}
                <div className="flex flex-col gap-8">
                    <ProductInventoryCard product={product} />
                    <ProductInteractionsFeed />
                </div>
            </div>
        </div>
    );
}
