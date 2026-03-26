"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { SmeInput } from "@/lib/validations/sme";
import ProfileTab from "../setting-components/ProfileTab";
import IntegrationsTab from "../setting-components/IntegrationsTab";
import BillingTab from "../setting-components/BillingTab";

type TabId = "profile" | "integrations" | "billing";

interface SettingsFormProps {
    initialData: SmeInput;
}

const TABS: { id: TabId; label: string }[] = [
    { id: "profile", label: "Business Profile" },
    { id: "integrations", label: "Integrations" },
    { id: "billing", label: "Billing & Plans" },
];

const TAB_HEADERS: Record<TabId, { title: string; subtitle: string }> = {
    profile: {
        title: "Organization Settings",
        subtitle: "Configure your brand identity and AI interaction model.",
    },
    integrations: {
        title: "Integrations",
        subtitle: "Connect your favorite tools and services to SmartBiz.",
    },
    billing: {
        title: "Billing & Plans",
        subtitle: "Manage your subscription and payment details.",
    },
};

export default function SettingsForm({ initialData }: SettingsFormProps) {
    const [activeTab, setActiveTab] = useState<TabId>("profile");

    const currentHeader = TAB_HEADERS[activeTab];

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Dynamic Page Header */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[#0F172A] font-bold text-2xl">
                        {currentHeader.title}
                    </h1>
                    <p className="font-normal text-sm text-[#64748B]">
                        {currentHeader.subtitle}
                    </p>
                </div>
                {activeTab === "billing" && (
                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#EB5119] text-white text-sm font-bold rounded-lg hover:bg-[#D4410F] transition-colors"
                    >
                        <Zap size={16} />
                        Upgrade <span className="hidden md:block">Plan</span>
                    </button>
                )}
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center border-b border-[#E2E8F0]">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        type="button"
                        className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id
                                ? "border-[#EB5119] text-[#EB5119]"
                                : "border-transparent text-[#64748B] hover:text-[#1E293B]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "profile" && <ProfileTab initialData={initialData} />}
            {activeTab === "integrations" && <IntegrationsTab />}
            {activeTab === "billing" && <BillingTab />}
        </div>
    );
}

