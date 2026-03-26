"use client";

import IntegrationIcon from "./IntegrationIcon";

interface IntegrationCardProps {
    name: string;
    description: string;
    connected: boolean;
    iconBg: string;
    iconColor: string;
    icon: "shopify" | "quickbooks" | "whatsapp" | "interswitch" | "openai" | "stripe";
}

export default function IntegrationCard({
    name,
    description,
    connected,
    iconBg,
    iconColor,
    icon,
}: IntegrationCardProps) {
    return (
        <div className="p-5 border border-[#E2E8F0] rounded-xl flex flex-col gap-4 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center ${iconColor}`}>
                    <IntegrationIcon name={icon} />
                </div>
                {connected && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wide">
                        Connected
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
                <h4 className="text-sm font-bold text-[#0F172A]">{name}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{description}</p>
            </div>

            <button
                type="button"
                className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${
                    connected
                        ? "bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9]"
                        : "bg-[#EB5119] text-white hover:bg-[#D4410F]"
                }`}
            >
                {connected ? "Configure" : "Connect"}
            </button>
        </div>
    );
}
