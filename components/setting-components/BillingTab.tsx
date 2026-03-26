"use client";

import { Download } from "lucide-react";

interface BillingRecord {
    date: string;
    amount: string;
    status: "Paid" | "Refunded" | "Pending";
}

const BILLING_HISTORY: BillingRecord[] = [
    { date: "Sep 12, 2024", amount: "$299.00", status: "Paid" },
    { date: "Aug 12, 2024", amount: "$299.00", status: "Paid" },
    { date: "Jul 12, 2024", amount: "$299.00", status: "Paid" },
    { date: "Jun 12, 2024", amount: "$299.00", status: "Refunded" },
];

const STATUS_STYLES: Record<BillingRecord["status"], string> = {
    Paid: "bg-green-50 text-green-700 border-green-200",
    Refunded: "bg-gray-50 text-gray-600 border-gray-200",
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

function UsageBar({
    label,
    used,
    total,
    color,
}: {
    label: string;
    used: number;
    total: number;
    color: string;
}) {
    const percentage = Math.round((used / total) * 100);

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
                <span className="text-[#0F172A] font-medium">{label}</span>
                <span className="text-[#64748B]">
                    {used.toLocaleString()} / {total.toLocaleString()}
                </span>
            </div>
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default function BillingTab() {
    return (
        <div className="flex flex-col gap-8">
            {/* Current Plan and Payment Method Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan Card */}
                <div className="lg:col-span-2 p-6 border border-[#E2E8F0] rounded-xl bg-white flex flex-col gap-5">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-[#EB5119] uppercase tracking-wide border border-[#EB5119]/20 bg-[#EB5119]/5 px-2 py-0.5 rounded-full w-fit">
                                Current Plan
                            </span>
                            <h3 className="text-xl font-bold text-[#0F172A] mt-1">SME Elite</h3>
                            <p className="text-sm text-[#64748B]">
                                $299 / Month &bull; Next renewal Oct 12, 2024
                            </p>
                        </div>
                        <svg
                            className="text-[#EB5119]"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 15l-2 5 7-7-5 2z" />
                            <path d="M18 6L6 18" />
                            <path d="M8 6h10v10" />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-4">
                        <UsageBar
                            label="AI Messages"
                            used={12450}
                            total={25000}
                            color="bg-gradient-to-r from-[#EB5119] to-[#FF8A65]"
                        />
                        <UsageBar
                            label="Products Added"
                            used={85}
                            total={100}
                            color="bg-gradient-to-r from-[#EB5119] to-[#FF8A65]"
                        />
                    </div>
                </div>

                {/* Payment Method Card */}
                <div className="p-6 border border-[#E2E8F0] rounded-xl bg-white flex flex-col gap-4">
                    <h4 className="text-base font-bold text-[#0F172A]">Payment Method</h4>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-7 bg-[#1A1F71] rounded flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold tracking-wider">VISA</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#0F172A]">
                                Visa &bull;&bull;&bull;&bull; 1234
                            </span>
                            <span className="text-xs text-[#64748B]">EXP 12/26</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="text-sm font-bold text-[#EB5119] hover:underline text-left mt-auto"
                    >
                        Update Payment Method
                    </button>
                </div>
            </div>

            {/* Billing History */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Billing History</h3>
                <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-right px-6 py-3.5 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                                    Invoice
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {BILLING_HISTORY.map((record, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-[#0F172A]">{record.date}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-[#0F172A]">
                                        {record.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                                                STATUS_STYLES[record.status]
                                            }`}
                                        >
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            className="text-[#EB5119] hover:text-[#D4410F] transition-colors"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upgrade CTA Banner */}
            <div className="p-6 bg-linear-to-r from-[#EB5119] to-[#FF8A65] rounded-xl flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <h4 className="text-lg font-bold text-white">Power up your workflow</h4>
                    <p className="text-sm text-white/80">
                        Switch to Yearly billing and save 20% on your SME Elite subscription. Get two months free!
                    </p>
                </div>
                <button
                    type="button"
                    className="px-6 py-3 bg-white text-[#EB5119] font-bold text-sm rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap shrink-0"
                >
                    Switch to Yearly
                </button>
            </div>
        </div>
    );
}
