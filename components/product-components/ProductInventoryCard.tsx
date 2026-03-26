"use client"

interface Product {
    id: string;
    name: string;
    sku: string | null;
    price: number;
    stock: number;
    status: string;
    category: string | null;
    image: string | null;
    description: string | null;
}

interface ProductInventoryCardProps {
    product: Product;
}

export default function ProductInventoryCard({ product }: ProductInventoryCardProps) {
    const capacity = 550; // Total capacity for this product
    const percentage = Math.min(Math.round((product.stock / capacity) * 100), 100);

    return (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0F172A]">Inventory Status</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#64748B] font-medium">Available Units</span>
                    <span className="text-sm font-bold text-[#0F172A]">{product.stock} / {capacity}</span>
                </div>

                <div className="w-full bg-[#F1F5F9] h-3 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#EB5119] rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8] font-bold">{percentage}% Capacity reached</span>
                    <span className="text-xs text-[#EB5119] font-bold">
                        {percentage > 80 ? "Critical" : percentage < 20 ? "Restock soon" : "Optimal"}
                    </span>
                </div>
            </div>

            <button className="w-full py-3 bg-[#0F172A] text-white rounded-xl text-xs font-bold hover:bg-[#1E293B] transition-all shadow-md">
                Update Inventory
            </button>
        </div>
    );
}
