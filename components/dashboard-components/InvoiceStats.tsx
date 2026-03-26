interface InvoiceStatsProps {
    stats: {
        totalInvoiced: number;
        paidAmount: number;
        pendingAmount: number;
        overdueAmount: number;
    }
}

export default function InvoiceStats({ stats }: InvoiceStatsProps) {
    const outstanding = stats.pendingAmount + stats.overdueAmount;
    
    return (
        <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 place-items-center justify-center justify-items-center ">

            <div className="w-full h-full rounded-[12px] border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] p-5 flex items-start flex-col gap-1 bg-white  "  >
                <h5 className=" text-[#64748B] text-xs font-bold " >OUTSTANDING</h5>
                <h3 className=" text-[#0F172A] text-2xl font-bold " >₦{outstanding.toLocaleString()}</h3>
            </div>

           <div className="w-full h-full rounded-[12px] border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] p-5 flex items-start flex-col gap-1 bg-white  "  >
                <h5 className=" text-[#64748B] text-xs font-bold " >Received (Total)</h5>
                <h3 className=" text-[#0F172A] text-2xl font-bold " >₦{stats.paidAmount.toLocaleString()}</h3>
            </div>

            <div className="w-full h-full rounded-[12px] border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] p-5 flex items-start flex-col gap-1 bg-white  "  >
                <h5 className=" text-[#64748B] text-xs font-bold " >Current Month Revenue</h5>
                <h3 className=" text-[#0F172A] text-2xl font-bold " >₦{stats.paidAmount.toLocaleString()}</h3>
            </div>

        </div>
    )
}