"use client"

import { useState } from "react";
import { Search, BellDot, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/CustomButton";
import ProductModal from "../product-components/ProductModal";

interface DashboardHeaderProps {
    // userName removed to avoid dynamic server usage in layout
}

export default function DashboardHeader({ }: DashboardHeaderProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <header className="w-full py-4 px-4 md:p-8 flex justify-between items-center gap-6 bg-white border border-[#E2E8F0] ">
            <div className="w-fit flex items-center gap-2 shrink-0 "  >
                <Link href={"/dashboard"} className="text-[#94A3B8] font-normal text-sm " >Dashboard</Link>
                <ChevronRight size={12} color="#94A3B8" />
                <span className=" font-normal text-sm " >Overview</span>
            </div>


            <label htmlFor="search" className="hidden md:flex flex-1 min-w-0 max-w-98.250 bg-[#F8FAFC] items-center rounded-[8px] gap-3  pr-4  pl-9 shrink  "  >
                <Search size={20} color="#94A3B8" />

                <input type="text"
                    className="w-full h-full pt-2.25 pb-2.5 border-0 outline-0 text-sm text-[#94A3B8] font-normal  "
                    id="search"
                    name="search"
                    placeholder="Search operations..."
                />
            </label>

            <div className=" w-fit flex items-center gap-4 shrink-0"  >

                <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg relative">
                    <BellDot size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EB5119] rounded-full border-2 border-white"></span>
                </button>

                <Button 
                    variant="secondary" 
                    className="flex items-center justify-center gap-1"
                    onClick={() => setIsAddModalOpen(true)}
                > 
                    <Plus size={10} color="#0F172A" />  Add a  product
                </Button>
            </div>

            <ProductModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                mode="add"
            />
        </header>
    );
}
