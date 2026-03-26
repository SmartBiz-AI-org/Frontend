"use client";

import { MonitorSmartphone, FileText, BarChart3, TrendingUp } from "lucide-react";

interface QuickAction {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    prompt: string;
}

const QUICK_ACTIONS: QuickAction[] = [
    {
        icon: <MonitorSmartphone size={22} className="text-[#EB5119]" />,
        title: "Show my pending payments",
        subtitle: "Review all outstanding invoices",
        prompt: "Show me my pending invoices",
    },
    {
        icon: <FileText size={22} className="text-[#EB5119]" />,
        title: "Generate invoice for a customer",
        subtitle: "Create new billing documents",
        prompt: "Generate invoice for a customer",
    },
    {
        icon: <BarChart3 size={22} className="text-[#EB5119]" />,
        title: "What is my best-selling product?",
        subtitle: "Analyze product performance",
        prompt: "What is my best-selling product?",
    },
    {
        icon: <TrendingUp size={22} className="text-[#EB5119]" />,
        title: "How much revenue did I make this week?",
        subtitle: "Get weekly financial summary",
        prompt: "How much revenue did I make this week?",
    },
];

interface ChatWelcomeProps {
    onQuickAction: (prompt: string) => void;
}

export default function ChatWelcome({ onQuickAction }: ChatWelcomeProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-6">
            {/* AI Icon */}
            <div className="w-16 h-16 bg-[#EB5119] rounded-2xl flex items-center justify-center shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                </svg>
            </div>

            {/* Title */}
            <div className="text-center flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-[#0F172A]">AI Assistant</h2>
                <p className="text-sm text-[#64748B] max-w-md">
                    Ask anything about your business. Generate invoices, track payments, and get insights instantly.
                </p>
            </div>

            {/* Greeting Message */}
            <div className="w-full max-w-2xl bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EB5119] rounded-full flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                    </svg>
                </div>
                <p className="text-[#0F172A] text-sm leading-relaxed pt-2">
                    Hi, I am your SmartBiz AI assistant. I can help you manage sales, generate invoices, and understand your business better.
                </p>
            </div>

            {/* Quick Action Cards */}
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3">
                {QUICK_ACTIONS.map((action) => (
                    <button
                        key={action.title}
                        type="button"
                        onClick={() => onQuickAction(action.prompt)}
                        className="flex items-start gap-3 p-4 bg-white border border-[#E2E8F0] rounded-xl text-left hover:border-[#EB5119]/30 hover:shadow-sm transition-all"
                    >
                        <div className="w-10 h-10 bg-[#FFF7ED] rounded-lg flex items-center justify-center shrink-0">
                            {action.icon}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-[#0F172A]">{action.title}</span>
                            <span className="text-xs text-[#64748B]">{action.subtitle}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
