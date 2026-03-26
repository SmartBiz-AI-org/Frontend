"use client"

import { FileText, MousePointer2, Wallet } from "lucide-react";

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    iconBg: string;
}

function StatItem({ icon, title, value, change, trend, iconBg }: StatCardProps) {
    return (
        <div className="flex-1 bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm p-6 flex flex-col gap-5">
             <div className="flex items-center justify-between">
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${iconBg}`}>
                    {icon}
                </div>
                {change !== "--" && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        trend === "up" ? "bg-[#E6F9F3] text-[#00A870]" : "bg-[#FEE2E2] text-[#EF4444]"
                    }`}>
                        {trend === "up" ? "+" : "-"}{change}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#64748B] tracking-wider uppercase">{title}</span>
                <span className="text-[22px] font-bold text-[#0F172A] tracking-tight">{value}</span>
            </div>
        </div>
    );
}

export default function ProductStatsBar() {
    return (
        <div className="flex flex-col md:flex-row gap-5 w-full">
            <StatItem 
                icon={<Wallet className="text-[#FF9500]" size={24} />} 
                title="Revenue (MTD)" 
                value="₦42,850.00" 
                change="12.5%" 
                trend="up"
                iconBg="bg-[#FFF4E5]"
            />
            <StatItem 
                icon={<FileText className="text-[#2563EB]" size={24} />} 
                title="Active Invoices" 
                value="24" 
                change="--" 
                trend="up"
                iconBg="bg-[#E0E7FF]"
            />
            <StatItem 
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9333EA]"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>} 
                title="AI Conv. Rate" 
                value="8.42%" 
                change="4.2%" 
                trend="up"
                iconBg="bg-[#F3E8FF]"
            />
        </div>
    );
}
