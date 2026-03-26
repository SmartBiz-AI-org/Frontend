import { CirclePlus } from "lucide-react";
import { Button } from "../ui/CustomButton";

interface RevenueGraphProps {
    data: {
        month: string;
        revenue: number;
    }[]
}

export default function RevenueGraph({ data }: RevenueGraphProps) {
    const maxRevenue = data.length > 0 ? Math.max(...data.map(d => d.revenue)) : 0;

    return (
        <div className="w-full bg-white col-span-2 rounded-[12px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col gap-6 min-h-72">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[#0F172A] font-bold text-base">Revenue Over Time</h3>
                    <p className="text-xs text-[#64748B]">Monthly revenue analysis</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
                        <span className="w-2 h-2 rounded-full bg-[#EB5119]"></span> Revenue
                    </span>
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-3 h-[200px] pt-8">
                {data.length > 0 ? (
                    data.map((item, index) => {
                        const heightPercent = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
                        return (
                            <div key={index} className="flex-1 flex flex-col items-center gap-3 group h-full">
                                <div className="flex-1 w-full flex items-end relative">
                                    {/* Bar Background (faint) */}
                                    <div className="w-full bg-slate-50 rounded-t-md absolute inset-0 -z-10 h-full"></div>
                                    
                                    {/* Actual Bar */}
                                    <div 
                                        className="w-full bg-[#EB5119] rounded-t-md relative transition-all duration-500 ease-out group-hover:bg-[#ff6a35] shadow-[0_-4px_12px_rgba(235,81,25,0.1)]"
                                        style={{ height: `${heightPercent}%` }}
                                    >
                                        {/* Tooltip on hover */}
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0F172A]">
                                            ₦{item.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">{item.month}</span>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex-1 flex items-center justify-center text-[#64748B] text-sm">
                        No revenue data for this period
                    </div>
                )}
            </div>
        </div>
    )
}

export function NoAccountConnected() {
    return (
        <div className="w-full bg-white col-span-2 h-full rounded-[12px] border border-[#E2E8F0]
              shadow-[0px_1px_2px_0px_#0000000D] flex items-center justify-center flex-col gap-4
px-12 py-12.25 text-center
               "  >

            <span className=" size-16 rounded-full shrink-0 flex items-center justify-center bg-[#F8FAFC] border border-[#F1F5F9] " >
                <CirclePlus size={25} color="#CBD5E1" />
            </span>

            <h3 className="text-[#0F172A] font-bold text-base " >No connected accounts yet</h3>

            <p className="text-sm font-normal text-[#64748B] max-w-[262.22px] "  >Connect your bank account or payment
                processor to see automated analytics.</p>

            <Button
                className="bg-[#0F172A]! text-white text-sm! "
                variant="secondary" >  Connect Source</Button>

        </div>
    )
}