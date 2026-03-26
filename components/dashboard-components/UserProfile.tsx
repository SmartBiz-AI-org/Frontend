"use client"

import { User, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/CustomButton";

export default function UserProfile() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-10 gap-4">
                <Loader2 className="animate-spin text-[#EB5119]" size={24} />
                <p className="text-xs text-[#94A3B8]">Loading account...</p>
            </div>
        );
    }

    const user = session?.user;

    return (
        <div className="w-full flex flex-col items-center justify-start gap-6">
            {/* Pro Plan Box */}
            <div className="w-full bg-[#EB51190D] border border-[#EB51191A] rounded-[12px] flex flex-col items-start gap-3 py-6 px-5">
                <h4 className="text-[#EB5119] text-xs font-semibold">PRO PLAN</h4>

                {/* The progress tracker for subscription */}
                <div className="w-full bg-[#E2E8F0] relative h-1 rounded-[9999px] overflow-hidden">
                    <span className="absolute inset-0 h-full w-[65%] bg-[#EB5119] block rounded-[9999px]" />
                </div>

                <Button
                    variant="primary"
                    className="w-full text-xs py-2!"
                >
                    Upgrade Now
                </Button>
            </div>

            {/* User Profile Info */}
            <div className="w-full flex items-center gap-2">
                <span className="size-8 rounded-full flex items-center justify-center bg-[#F1F5F9] border border-[#E2E8F0]">
                    <User size={20} />
                </span>

                <div className="flex flex-col items-start gap-0.5 overflow-hidden">
                    <h5 className="text-xs font-bold text-[#0F172A] truncate w-full">
                        {user?.name || "User"}
                    </h5>
                    <p className="text-[10px] text-[#94A3B8] font-normal truncate w-full">
                        {user?.email || "No email provided"}
                    </p>
                </div>
            </div>
        </div>
    );
}
