"use client"


import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/CustomButton"
import Link from "next/link"

interface Invoice {
    id: string;
    invoiceNumber: string;
    referenceNumber: string;
    customerName: string;
    customerEmail: string;
    items: any;
    totalAmount: number;
    status: string;
    dueDate: Date;
    createdAt: Date;
}

interface AllInvoicesProps {
    invoices: Invoice[];
}

export default function AllInvoices({ invoices }: AllInvoicesProps) {
    const tabs = ["All Invoices", "Paid", "Pending", "Overdue"]
    const searchParams = useSearchParams()
    const router = useRouter()

    const currentTab = searchParams.get("tab") || "All Invoices"

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const invoicesPerPage = 10

    // Handle tab change
    const handleTabChange = (tab: string) => {
        setCurrentPage(1) // reset page on tab switch
        router.push(`?tab=${tab}`)
    }

    // Filter invoices based on tab
    const filteredInvoices =
        currentTab === "All Invoices"
            ? invoices
            : invoices.filter(
                (inv) => inv.status.toUpperCase() === currentTab.toUpperCase()
            )

    // Pagination logic
    const indexOfLastInvoice = currentPage * invoicesPerPage
    const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage
    const currentInvoices = filteredInvoices.slice(
        indexOfFirstInvoice,
        indexOfLastInvoice
    )
    const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage)

    return (
        <div className="w-full flex flex-col items-start gap-5">
            {/* Tabs */}
            <div className="w-full flex items-center gap-6 border-b border-[#E2E8F0] pb-0.5">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => handleTabChange(tab)}
                        className={`pb-5 border-b-2 ${currentTab === tab ? "border-[#EB5119]" : "border-transparent"
                            } text-[#64748B] text-sm font-medium cursor-pointer`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full bg-white rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8FAFC] border border-[#E2E8F0]">
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                INVOICE ID
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                CUSTOMER
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                PRODUCT
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                AMOUNT
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                STATUS
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                DUE DATE
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                        {currentInvoices.map((tx) => (
                            <tr
                                key={tx.id}
                                className="hover:bg-[#F8FAFC] transition-colors"
                            >
                                {/* INVOICE ID */}
                                <td className="px-6 py-4 text-sm font-semibold text-[#0F172A]">
                                    {tx.invoiceNumber}
                                </td>

                                {/* CUSTOMER */}
                                <td className="px-6 py-4 text-sm font-semibold text-[#334155] flex items-center justify-start gap-1  ">
                                    <span>👤</span>
                                    <span>{tx.customerName}</span>
                                </td>

                                {/* PRODUCT */}
                                <td className="px-6 py-4 text-sm text-[#475569] font-normal truncate max-w-[150px]">
                                    {Array.isArray(tx.items) ? tx.items.map((it: any) => it.name).join(", ") : "Product"}
                                </td>

                                {/* AMOUNT */}
                                <td className="px-6 py-4 text-sm font-bold text-[#0F172A]">
                                    ₦{tx.totalAmount.toLocaleString()}
                                </td>

                                {/* STATUS */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${tx.status === "PAID"
                                            ? "bg-[#DCFCE7] text-[#15803D]"
                                            : tx.status === "PENDING"
                                                ? "bg-amber-50 text-amber-600"
                                                : "bg-red-50 text-red-600"
                                            }`}
                                    >
                                        {tx.status}
                                    </span>
                                </td>

                                {/* DUE DATE */}
                                <td
                                    className={`px-6 py-4 text-sm ${tx.status === "OVERDUE"
                                        ? "text-[#EF4444]"
                                        : "text-[#64748B]"
                                        }`}
                                >
                                    {new Date(tx.dueDate).toLocaleDateString()}
                                </td>

                                {/* ACTIONS */}
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/dashboard/invoices/${tx.id}`}
                                        className="text-[#334155] font-semibold hover:text-[#64748B] text-xs
                       bg-[#FFFFFF] border-[#E2E8F0] border py-2 px-3 rounded-lg cursor-pointer
                       outline-0"
                                    >
                                        Preview
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {currentInvoices.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="p-4 text-center text-gray-400 font-medium"
                                >
                                    No invoices found
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {/* Table Footer for Pagination */}
                    <tfoot>
                        <tr>
                            <td colSpan={7} className="px-6 py-4">
                                <div className="w-full  flex justify-between gap-2 items-center">

                                    <span className="px-2 py-2 text-xs font-medium text-[#64748B] ">
                                        Page {currentPage} to {invoicesPerPage} of {totalPages} invoices
                                    </span>


                                    <div>
                                        <Button
                                            variant="secondary"
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 bg-gray-100 text-xs rounded-lg disabled:opacity-50"
                                        >
                                            Previous
                                        </Button>



                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                            }
                                            disabled={currentPage === totalPages || totalPages === 0}
                                            className="px-3 py-1 bg-gray-100 text-xs rounded-lg disabled:opacity-50"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}