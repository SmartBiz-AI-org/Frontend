"use client"

import { Download, Filter, Grid, List, Plus, Search } from "lucide-react";
import { useState } from "react";
import ProductTable from "./ProductTable";
import ProductGrid from "./ProductGrid";
import ProductModal from "./ProductModal";

interface Product {
    id: string;
    name: string;
    sku: string | null;
    price: number;
    stock: number;
    status: string;
    category: string | null;
    size?: string | null;
    image: string | null;
    description: string | null;
    smeId?: string;
    createdAt: Date;
}

interface ProductInventoryProps {
    initialProducts: Product[];
}

export default function ProductInventory({ initialProducts }: ProductInventoryProps) {
    const [view, setView] = useState<"list" | "grid" | any>("list");
    const [activeTab, setActiveTab] = useState("All Products");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    const handleAddProduct = () => {
        setSelectedProduct(undefined);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Filter products based on active tab and search term
    const filteredProducts = initialProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        
        if (!matchesSearch) return false;

        if (activeTab === "All Products") return true;
        if (activeTab === "Active") return product.status === "Active" || product.status === "Low Stock";
        if (activeTab === "Draft") return product.status === "Draft";
        if (activeTab === "Archived") return product.status === "Archived";
        return true;
    });

    const tabs = ["All Products", "Active", "Draft", "Archived"];

    return (
        <div className="p-8 w-full flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[#0F172A] font-bold text-2xl">Product Inventory</h1>
                    <p className="font-normal text-sm text-[#64748B]">Manage and monitor your assets.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg shadow-sm text-sm text-[#0F172A] font-bold hover:bg-[#F8FAFC] transition-colors">
                        <Download size={18} />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-white border border-[#E2E8F0] rounded-lg shadow-sm text-sm text-[#0F172A] font-bold hover:bg-[#F8FAFC] transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col border border-[#E2E8F0] rounded-xl bg-white shadow-sm overflow-hidden">
                {/* Tabs */}
                {/* ... (tabs rendering same) ... */}
                <div className="flex items-center border-b border-[#F1F5F9] px-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-4 text-xs font-bold transition-all border-b-2 ${
                                activeTab === tab 
                                ? "border-[#EB5119] text-[#EB5119]" 
                                : "border-transparent text-[#64748B] hover:text-[#1E293B]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-4 flex items-center justify-between border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-4 flex-1">
                        <span className="text-sm font-bold text-[#1E293B]">Products: {filteredProducts.length}</span>
                        <div className="relative w-full max-w-[240px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-[#EB511933] transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <div className="flex items-center bg-[#F1F5F9] p-1 rounded-lg border border-[#E2E8F0]">
                            <button
                                onClick={() => setView("grid")}
                                className={`p-1 rounded-md transition-all ${ view === "grid" ? "bg-white shadow-sm text-[#EB5119]" : "text-[#64748B] hover:text-[#1E293B]" }`}
                            >
                                <Grid size={16} />
                            </button>
                            <button
                                onClick={() => setView("list")}
                                className={`p-1 rounded-md transition-all ${ view === "list" ? "bg-white shadow-sm text-[#EB5119]" : "text-[#64748B] hover:text-[#1E293B]" }`}
                            >
                                <List size={16} />
                            </button>
                        </div>

                        <button 
                            onClick={handleAddProduct}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0F172A] rounded-lg text-[10px] text-white font-bold hover:bg-[#1E293B] transition-colors"
                        >
                            <Plus size={16} />
                            Add product
                        </button>
                    </div>
                </div>

                {view === "list" ? (
                    <ProductTable 
                        products={filteredProducts as any} 
                        hideToolbar={true}
                        onEdit={handleEditProduct}
                        onAdd={handleAddProduct}
                    />
                ) : (
                    <div className="p-4 bg-[#F8FAFC]">
                        <ProductGrid products={filteredProducts as any} />
                    </div>
                )}

                {/* Shared Pagination Placeholder (same) */}
                <div className="p-4 flex items-center justify-between border-t border-[#F1F5F9] text-[#64748B] bg-white">
                    <span className="text-sm">Page 1 of 1</span>
                </div>
            </div>

            <ProductModal 
                key={selectedProduct?.id || "add"}
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialData={selectedProduct}
                mode={selectedProduct ? "edit" : "add"}
            />
        </div>
    );
}
