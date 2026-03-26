"use client";

import { useState } from "react";
import IntegrationCard from "./IntegrationCard";

const CATEGORIES = [
    "All Categories",
    "E-commerce",
    "Finance & Accounting",
    "Messaging",
    "Payments",
    "AI Tools",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Integration {
    id: string;
    name: string;
    description: string;
    category: Category[];
    connected: boolean;
    iconBg: string;
    iconColor: string;
    icon: "shopify" | "quickbooks" | "whatsapp" | "interswitch" | "openai" | "stripe";
}

const INTEGRATIONS: Integration[] = [
    {
        id: "shopify",
        name: "Shopify",
        description: "Sync your inventory, orders, and customer data directly with your Web3 storefront.",
        category: ["E-commerce"],
        connected: true,
        iconBg: "bg-[#96BF48]/10",
        iconColor: "text-[#96BF48]",
        icon: "shopify",
    },
    {
        id: "quickbooks",
        name: "QuickBooks",
        description: "Automate your accounting by syncing on-chain transactions with your financial records.",
        category: ["Finance & Accounting"],
        connected: false,
        iconBg: "bg-[#2CA01C]/10",
        iconColor: "text-[#2CA01C]",
        icon: "quickbooks",
    },
    {
        id: "whatsapp",
        name: "WhatsApp Business",
        description: "Enable automated customer support and AI-driven notifications via WhatsApp.",
        category: ["Messaging"],
        connected: false,
        iconBg: "bg-[#25D366]/10",
        iconColor: "text-[#25D366]",
        icon: "whatsapp",
    },
    {
        id: "interswitch",
        name: "Interswitch",
        description: "Process fiat-to-crypto payments seamlessly for your African user base.",
        category: ["Payments"],
        connected: false,
        iconBg: "bg-[#003B71]/10",
        iconColor: "text-[#003B71]",
        icon: "interswitch",
    },
    {
        id: "openai",
        name: "OpenAI",
        description: "Leverage GPT-4 to power your custom AI agents and customer interaction workflows.",
        category: ["AI Tools"],
        connected: false,
        iconBg: "bg-[#10A37F]/10",
        iconColor: "text-[#10A37F]",
        icon: "openai",
    },
    {
        id: "stripe",
        name: "Stripe",
        description: "Integrated payment processing for global subscription and product billing.",
        category: ["Payments"],
        connected: false,
        iconBg: "bg-[#635BFF]/10",
        iconColor: "text-[#635BFF]",
        icon: "stripe",
    },
];

export default function IntegrationsTab() {
    const [activeCategory, setActiveCategory] = useState<Category>("All Categories");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredIntegrations = INTEGRATIONS.filter((integration) => {
        const matchesCategory =
            activeCategory === "All Categories" || integration.category.includes(activeCategory);
        const matchesSearch =
            searchQuery === "" ||
            integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            integration.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for app by name, category, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg bg-white text-sm outline-none focus:border-[#EB5119] transition-colors"
                />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            activeCategory === category
                                ? "bg-[#EB5119] text-white"
                                : "bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1] hover:text-[#0F172A]"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Integration Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations.map((integration) => (
                    <IntegrationCard
                        key={integration.id}
                        name={integration.name}
                        description={integration.description}
                        connected={integration.connected}
                        iconBg={integration.iconBg}
                        iconColor={integration.iconColor}
                        icon={integration.icon}
                    />
                ))}
            </div>

            {filteredIntegrations.length === 0 && (
                <div className="text-center py-12 text-[#94A3B8]">
                    <p className="text-sm">No integrations found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
