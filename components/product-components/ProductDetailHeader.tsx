"use client"
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ProductModal from "./ProductModal";
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
}

interface ProductDetailHeaderProps {
    product: Product;
}

export default function ProductDetailHeader({ product }: ProductDetailHeaderProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteProduct(product.id);
            if (result.success) {
                setIsDeleteModalOpen(false);
                router.push("/dashboard/products");
            } else {
                alert(result.error || "Failed to delete product");
            }
        });
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex items-center justify-between">
                {/* Title Group */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.back()}
                            className="w-10 h-10 flex items-center justify-center bg-white border border-[#E2E8F0] rounded-full text-[#0F172A] hover:bg-[#F8FAFC] shadow-sm transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Product Details</h1>
                    </div>
                </div>

                {/* Actions Group */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-2 px-7 py-3 bg-[#EB5119] text-white rounded-[12px] text-sm font-bold hover:bg-[#D44616] transition-all shadow-md shadow-[#EB511933]"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        Edit Product
                    </button>
                    <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        disabled={isPending}
                        className="flex items-center gap-2 px-7 py-3 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-[12px] text-sm font-bold hover:bg-[#F1F5F9] transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E11D48]"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        {isPending ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>

            <ProductModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                initialData={product}
                mode="edit"
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                isPending={isPending}
                title="Delete Product?"
                description={`Are you sure you want to delete ${product.name}? This action cannot be undone and all associated data will be lost.`}
                confirmText="Delete Product"
            />
        </div>
    );
}
