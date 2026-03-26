"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";
import { format, startOfMonth, endOfMonth, subDays, startOfYear } from "date-fns";
import { useState } from "react";

export default function DateFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const dateRangeLabel = from && to 
        ? `${format(new Date(from), "MMM d, yyyy")} - ${format(new Date(to), "MMM d, yyyy")}`
        : "All Time";

    const setRange = (days?: number, type?: 'month' | 'year' | 'all') => {
        const params = new URLSearchParams(searchParams);
        if (type === 'all') {
            params.delete("from");
            params.delete("to");
        } else {
            let start = new Date();
            let end = new Date();

            if (days) {
                start = subDays(end, days);
            } else if (type === 'month') {
                start = startOfMonth(end);
                end = endOfMonth(end);
            } else if (type === 'year') {
                start = startOfYear(end);
            }

            params.set("from", format(start, "yyyy-MM-dd"));
            params.set("to", format(end, "yyyy-MM-dd"));
        }
        
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
            >
                <Calendar size={18} />
                {dateRangeLabel}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="flex flex-col">
                        <button onClick={() => setRange(undefined, 'all')} className="px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] text-[#64748B]">All Time</button>
                        <button onClick={() => setRange(7)} className="px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] text-[#64748B]">Last 7 Days</button>
                        <button onClick={() => setRange(30)} className="px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] text-[#64748B]">Last 30 Days</button>
                        <button onClick={() => setRange(undefined, 'month')} className="px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] text-[#64748B]">This Month</button>
                        <button onClick={() => setRange(undefined, 'year')} className="px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] text-[#64748B]">This Year</button>
                    </div>
                </div>
            )}
        </div>
    );
}
