"use client"

import { Edit2, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProduct } from "@/actions/productActions";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";

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

interface ProductTableProps {
    products: Product[];
    hideToolbar?: boolean;
    onEdit?: (product: Product) => void;
    onAdd?: () => void;
}

export default function ProductTable({ products, hideToolbar, onEdit, onAdd }: ProductTableProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const handleDelete = async () => {
        if (!productToDelete) return;

        startTransition(async () => {
            const result = await deleteProduct(productToDelete.id);
            if (result.success) {
                setProductToDelete(null); // this forces the page to revalidate
            } else {
                alert(result.error || "Failed to delete product");
            }
        });
    };

    return (
        <div className="w-full flex flex-col">
            {/* Table Toolbar */}
            {!hideToolbar && (
                <div className="p-4 flex items-center justify-between border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-4 flex-1">
                        <span className="text-sm font-bold text-[#1E293B]">Products: {products.length}</span>
                        <div className="relative w-full max-w-[240px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="pl-9 pr-4 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-[#EB511933] transition-all"
                            />
                        </div>
                        
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] font-bold hover:bg-[#F8FAFC] transition-colors">
                            <Filter size={14} />
                            <span>Filter</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onAdd}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#0F172A] rounded-lg text-[10px] text-[#0F172A] font-bold hover:bg-[#F8FAFC] transition-colors"
                        >
                            <Plus size={16} />
                            Add product
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#F1F5F9]">
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">PRODUCT NAME</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">PRICE</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">STOCK STATUS</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">TOTAL STOCK</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">STATUS</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {products.map((product) => (
                            <tr 
                                key={product.id} 
                                onClick={() => router.push(`/dashboard/products/${product.id}`)}
                                className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                            >
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-[#F1F5F9] relative overflow-hidden shrink-0">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#94A3B8] text-[10px]">No Image</div>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-[#1E293B] max-w-[280px] line-clamp-2">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm font-bold text-[#1E293B]">₦{product.price.toLocaleString()}.00</td>
                                <td className="px-6 py-5">
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                                        product.status === 'Active' || product.status === 'Low Stock' ? 'bg-[#E6F9F3] text-[#00A870]' : 'bg-[#FFF4E5] text-[#FF9500]'
                                    }`}>
                                        {product.stock > 10 ? 'IN STOCK' : product.stock > 0 ? 'LOW STOCK' : 'OUT OF STOCK'}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3 w-32">
                                        <div className="flex-1 bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-700 ${
                                                    product.stock < 10 ? 'bg-[#FF9500]' : 'bg-[#00A870]'
                                                }`}
                                                style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold text-[#1E293B]">{product.stock}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${product.status === 'Active' ? 'bg-[#00A870]' : 'bg-[#94A3B8]'}`}></div>
                                        <span className={`text-xs font-medium ${product.status === 'Active' ? 'text-[#00A870]' : 'text-[#64748B]'}`}>
                                            {product.status === 'Active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit?.(product);
                                            }}
                                            className="p-2 text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-lg transition-all cursor-pointer"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setProductToDelete(product);
                                            }}
                                            className="p-2 text-[#FCA5A5] hover:text-[#EF4444] hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={!!productToDelete}
                onClose={() => setProductToDelete(null)}
                onConfirm={handleDelete}
                isPending={isPending}
                title="Delete Product?"
                description={`Are you sure you want to delete ${productToDelete?.name}? This action cannot be undone and all associated data will be lost.`}
                confirmText="Delete Product"
            />
        </div>
    );
}
