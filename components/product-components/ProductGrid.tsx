"use client"

import { Globe, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

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
    createdAt: Date;
}

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const router = useRouter();

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div 
                    key={product.id} 
                    onClick={() => router.push(`/dashboard/products/${product.id}`)}
                    className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-all"
                >
                    {/* Image Area */}
                    <div className="h-44 relative bg-[#F8FAFC]">
                        {/* Status pill top-left */}
                        <div className="absolute top-3 left-3 z-10">
                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider ${
                                product.stock > 10 ? 'bg-[#E6F9F3] text-[#00A870]' : 
                                product.stock > 0 ? 'bg-[#FFF4E5] text-[#FF9500]' : 
                                product.stock === -1 ? 'bg-[#EEF2FF] text-[#6366F1]' : // Unlimited
                                'bg-[#FEE2E2] text-[#EF4444]'
                            }`}>
                                {product.stock === -1 ? 'UNLIMITED' : 
                                 product.stock === 0 ? 'OUT OF STOCK' :
                                 product.stock < 10 ? 'LOW STOCK' : 'IN STOCK'}
                            </span>
                        </div>
                        
                        {/* More options top-right */}
                        <div className="absolute top-3 right-3 z-10">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle options
                                }}
                                className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-[#64748B] hover:text-[#1E293B] shadow-sm transition-colors"
                            >
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        {/* Image placeholder behavior */}
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                             {product.image ? (
                                 <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                             ) : (
                                 <div className="text-[#94A3B8] text-xs">No Image</div>
                             )}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl font-bold text-[#0F172A]">₦{product.price.toLocaleString()}.00</span>
                            <h3 className="text-xs font-medium text-[#64748B] line-clamp-2 min-h-[32px]">
                                {product.name}
                            </h3>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                            <div className="flex items-center gap-2">
                                <span className={`p-1 rounded-full ${product.stock === 0 ? 'bg-red-100 text-red-500' : 'bg-[#E6F9F3] text-[#00A870]'}`}>
                                    <Globe size={12} />
                                </span>
                                <span className="text-[10px] font-bold text-[#1E293B]">
                                    {product.stock === -1 ? '--' : product.stock} in Stock
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${product.status === 'Active' ? 'bg-[#00A870]' : 'bg-[#94A3B8]'}`}></div>
                                <span className={`text-[10px] font-medium ${product.status === 'Active' ? 'text-[#00A870]' : 'text-[#64748B]'}`}>
                                    {product.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
