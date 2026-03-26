import { Suspense } from "react";
import AllInvoices from "@/components/dashboard-components/AllInvoices";
import InvoiceStats from "@/components/dashboard-components/InvoiceStats";
import { Button } from "@/components/ui/CustomButton";
import { Download } from "lucide-react";
import CreateInvoiceButton from "@/components/dashboard-components/CreateInvoiceButton";
import { getInvoices, getInvoiceStats } from "@/actions/invoiceActions";

export default async function Page() {
    const invoicesResult = await getInvoices();
    const statsResult = await getInvoiceStats();

    const invoices = invoicesResult.success ? invoicesResult.invoices : [];
    const stats = (statsResult.success && statsResult.stats) ? statsResult.stats : {
        totalInvoiced: 0,
        paidAmount: 0,
        pendingAmount: 0,
        overdueAmount: 0,
        count: 0,
        paidCount: 0,
        pendingCount: 0,
        overdueCount: 0,
    };

    return (
        <div className="p-8 w-full flex flex-col gap-8 relative">
            {/* Page Header */}
            <div className="w-full flex items-center justify-between">

                <div className="flex flex-col gap-1">
                    <h1 className="text-[#0F172A] font-bold text-2xl">Invoices & Payments</h1>
                    <p className="font-normal text-sm text-[#64748B]">Manage your automated billing, subscription renewals, and transaction history.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        className=" flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold "
                    >
                        <Download size={18} />
                        Export CSV
                    </Button>

                    <CreateInvoiceButton />
                </div>
            </div>

            {/* stats overview  */}
            <InvoiceStats stats={stats} />

            {/* Invoice table  */}
            <Suspense fallback={<div className="w-full h-32 flex items-center justify-center">Loading invoices...</div>}>
                <AllInvoices invoices={invoices as any} />
            </Suspense>

        </div>
    )
}