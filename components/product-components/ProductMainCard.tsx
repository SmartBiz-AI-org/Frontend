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

interface ProductMainCardProps {
    product: Product;
}

export default function ProductMainCard({ product }: ProductMainCardProps) {
    return (
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[300px]">
            {/* Image Section */}
            <div className="md:w-1/3 bg-white flex items-center justify-center p-8 border-r border-[#F1F5F9]">
                <div className="w-full aspect-square bg-[#F8FAFC] rounded-[20px] flex items-center justify-center border border-[#F1F5F9] overflow-hidden">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest text-center px-4">
                            No Product Image
                        </div>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="md:w-2/3 p-8 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[28px] font-bold text-[#0F172A] tracking-tight">{product.name}</h2>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${
                            product.stock > 10 ? 'bg-[#E6F9F3] text-[#00A870]' : 'bg-[#FFF4E5] text-[#FF9500]'
                        }`}>
                            {product.stock > 10 ? 'IN STOCK' : product.stock > 0 ? 'LOW STOCK' : 'OUT OF STOCK'}
                        </span>
                    </div>

                    <p className="text-sm text-[#94A3B8] font-medium leading-[1.6] max-w-[500px] line-clamp-4">
                        {product.description || "No description provided for this product."}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                        <span className="text-xl font-bold text-[#0F172A]">₦{product.price.toLocaleString()}</span>
                        <span className="text-sm text-[#94A3B8] font-medium">/ Per unit</span>
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#F1F5F9]">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">AVAILABLE STOCK</span>
                        <span className="text-xs font-bold text-[#1E293B]">{product.stock} Units</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">SKU</span>
                        <span className="text-xs font-bold text-[#1E293B] uppercase">{product.sku || "--"}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">CATEGORY</span>
                        <span className="text-xs font-bold text-[#1E293B] uppercase">{product.category || "General"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
