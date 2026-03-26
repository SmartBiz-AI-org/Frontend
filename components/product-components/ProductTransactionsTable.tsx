"use client"

import { MoreVertical } from "lucide-react";

const transactions = [
    { id: "#TRX-8291", customer: "Julian Sanchez", amount: "$1,249.00", status: "Completed", initials: "JS", bg: "bg-[#F1F5F9]" },
    { id: "#TRX-8288", customer: "Apex Kinematics", amount: "$3,747.00", status: "Pending", initials: "AK", bg: "bg-[#E0E7FF]" },
    { id: "#TRX-8285", customer: "Data Labs Inc.", amount: "$1,249.00", status: "Completed", initials: "DL", bg: "bg-[#F8FAFC]" },
    { id: "#TRX-8288", customer: "Apex Kinematics", amount: "$3,747.00", status: "Pending", initials: "AK", bg: "bg-[#E0E7FF]" },
];

export default function ProductTransactionsTable() {
    return (
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 flex items-center justify-between border-b border-[#F1F5F9]">
                <h3 className="text-sm font-bold text-[#0F172A]">Recent Transactions</h3>
                <button className="text-xs font-bold text-[#EB5119] hover:text-[#D44616] transition-colors tracking-tight">
                    View All
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]/50">
                            <th className="px-8 py-3.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest bg-white">ID</th>
                            <th className="px-8 py-3.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest bg-white">CUSTOMER</th>
                            <th className="px-8 py-3.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest bg-white">AMOUNT</th>
                            <th className="px-8 py-3.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest bg-white">STATUS</th>
                            <th className="px-8 py-3.5 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest bg-white text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {transactions.map((trx, i) => (
                            <tr key={i} className="hover:bg-[#F8FAFC] transition-colors group">
                                <td className="px-8 py-3 text-xs text-[#0F172A]">{trx.id}</td>
                                <td className="px-8 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px]  text-[#64748B] ${trx.bg} border border-[#F1F5F9]`}>
                                            {trx.initials}
                                        </div>
                                        <span className="text-[13px] text-[#1E293B]">{trx.customer}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-3 text-xs font-bold text-[#0F172A]">{trx.amount}</td>
                                <td className="px-8 py-3">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-tight ${
                                        trx.status === 'Completed' ? 'bg-[#E6F9F3] text-[#00A870]' : 'bg-[#FFF4E5] text-[#FF9500]'
                                    }`}>
                                        {trx.status}
                                    </span>
                                </td>
                                <td className="px-8 py-3 text-right">
                                    <button className="p-1.5 text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-all rounded-lg">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
