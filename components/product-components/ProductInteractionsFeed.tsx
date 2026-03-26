"use client"

import { Box, FileCheck, MessageSquare, Wallet, Zap } from "lucide-react";

interface InteractionProps {
    type: 'ai' | 'invoice' | 'payment';
    title: string;
    description: string;
    time: string;
    metadata?: string;
    icon: React.ReactNode;
    iconBg: string;
    initials?: string;
}

function InteractionCard({ type, title, description, time, metadata, icon, iconBg, initials }: InteractionProps) {
    return (
        <div className="flex gap-5 relative group">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold shadow-sm z-10 ${iconBg} border border-[#F1F5F9]`}>
                    {initials || icon}
                </div>
                <div className="w-[1.5px] flex-1 bg-[#F1F5F9] my-2 group-last:hidden"></div>
            </div>

            <div className="flex-1 pb-8">
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-[16px] p-5 flex flex-col gap-4 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col items-start justify-between gap-1.5 md:gap-2">
                            <h4 className="text-xs font-bold text-[#0F172A]">{title}</h4>
                            <span className="text-[10px] text-[#94A3B8] font-medium">{time}</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] font-medium leading-[1.4]">
                            {description} <span className="text-[#1E293B] font-bold">{metadata}</span>
                        </p>
                    </div>

                    {type === 'ai' && (
                        <div className="flex items-center gap-2 px-2.5 py-1 w-fit rounded-lg bg-[#E6F9F3] text-[#00A870] text-[9px] font-bold uppercase tracking-widest">
                            <Zap size={12} fill="currentColor" />
                            HIGH INTENT
                        </div>
                    )}

                    {type === 'invoice' && (
                        <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-bold">
                            <div className="w-5 h-5 rounded flex items-center justify-center bg-[#F1F5F9]">
                                <FileCheck size={14} className="text-[#94A3B8]" />
                            </div>
                            INV-2026-082
                        </div>
                    )}

                    {type === 'payment' && (
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                            <div className="w-5 h-5 rounded-full bg-[#E6F9F3] flex items-center justify-center">
                                <FileCheck size={12} color="#00A870" />
                            </div>
                            $1,249.00 processed
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductInteractionsFeed() {
    return (
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0F172A]">Automated Product Interactions</h3>
                <button className="text-[#94A3B8] hover:text-[#1E293B] transition-colors p-1 rounded-lg border border-[#F1F5F9]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                </button>
            </div>

            <div className="flex flex-col pt-2">
                <InteractionCard
                    type="ai"
                    title="Al recommended product in chat"
                    description="Customer:"
                    metadata="Alex Thompson from Global Tech"
                    time="8 mins ago"
                    icon={<MessageSquare size={16} />}
                    iconBg="bg-white text-[#64748B]"
                />
                <InteractionCard
                    type="invoice"
                    title="Invoice generated for customer"
                    description="Customer:"
                    metadata="Acme Systems (Subscription Renewal)"
                    time="2 hours ago"
                    icon={<FileCheck size={16} />}
                    iconBg="bg-[#FFF1F2] text-[#E11D48]"
                    initials="AS"
                />
                <InteractionCard
                    type="payment"
                    title="Payment received"
                    description="Customer:"
                    metadata="Sarah Jenkins from Data Labs"
                    time="5 hours ago"
                    icon={<Wallet size={16} />}
                    iconBg="bg-white text-[#EB5119]"
                    initials="⚡"
                />
            </div>
        </div>
    );
}

// Custom wrapper to add initials bg logic
function InitialsAvatar({ initials, bg }: { initials: string, bg: string }) {
    return (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${bg}`}>
            {initials}
        </div>
    )
}
