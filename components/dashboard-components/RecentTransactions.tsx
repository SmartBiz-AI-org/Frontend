import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

interface RecentTransactionsProps {
    transactions: {
        id: string;
        customerName: string;
        customerEmail: string;
        items: any;
        totalAmount: number;
        status: string;
        createdAt: Date;
    }[]
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <div className="w-full bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
                <div>
                    <h3 className="text-[#0F172A] font-bold text-base">Recent Transactions</h3>
                    <p className="text-xs text-[#64748B]">Latest payments and invoices</p>
                </div>
                <button className="text-xs font-medium text-[#EB5119] hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8FAFC]">
                            <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-[#F8FAFC] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-xs font-bold text-[#64748B]">
                                                {tx.customerName.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-[#1E293B]">{tx.customerName}</span>
                                                <span className="text-[10px] text-[#64748B]">{tx.customerEmail}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-[#64748B] font-medium">
                                        {Array.isArray(tx.items) && tx.items.length > 0 
                                            ? tx.items.map((i: any) => i.name).join(", ") 
                                            : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-[#64748B]">
                                        {format(new Date(tx.createdAt), "MMM dd, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-[#1E293B]">₦{tx.totalAmount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            tx.status === 'PAID' ? 'bg-green-50 text-green-600' :tx.status === 'SUCCESS' ? 'bg-green-50 text-green-600' :
                                            tx.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                                            'bg-red-50 text-red-600'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#94A3B8] hover:text-[#64748B]">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-sm text-[#64748B]">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
