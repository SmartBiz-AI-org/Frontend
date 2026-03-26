import { Banknote, ClipboardClock, Wallet, TrendingDown, TrendingUp } from "lucide-react";

interface StatsBarProps {
    stats: {
        totalRevenue: number;
        paymentsReceived: number;
        pendingInvoices: number;
        revenueChange: string;
        revenueTrend: "up" | "down";
    }
}

export default function StatsBar({ stats }: StatsBarProps) {
    const dashboardStats = [
        {
            id: 1,
            label: "Total Revenue",
            value: stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            currencySymbol: "₦",
            change: stats.revenueChange,
            trend: stats.revenueTrend,
            iconName: Banknote,
        },
        {
            id: 2,
            label: "Payments Received",
            value: stats.paymentsReceived.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            currencySymbol: "₦",
            change: stats.revenueChange, // Using same change for demo/simplicity or can be customized
            trend: stats.revenueTrend,
            iconName: Wallet,
        },
        {
            id: 3,
            label: "Pending Invoices",
            value: stats.pendingInvoices.toString(),
            change: "0%", // Or relevant change
            trend: "up" as const,
            iconName: ClipboardClock,
        },
    ];

    return (
        <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 place-items-center justify-center justify-items-center "  >
            {
                dashboardStats.map((stat) => {
                    const Icon = stat.iconName

                    return (
                        <div
                            key={stat.id}
                            className="w-full h-full rounded-[12px] border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] p-4 flex items-start flex-col gap-6 bg-white  "  >

                            <div className="w-full flex items-start justify-between gap-3  " >
                                <span className="bg-[#EB51191A] rounded-[8px] p-2 text-[#EB5119] flex items-center justify-center h-8 w-9 "  >
                                    <Icon size={18} />
                                </span>

                                <span className={`text-xs font-bold flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}  `}  >
                                    <span>
                                        {stat.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    </span>
                                    {stat.change}
                                </span>

                            </div>


                            <div>
                                <h4 className="text-sm font-medium text-[#64748B] " >{stat.label} </h4>
                                <h3 className=" text-[#0F172A] text-2xl font-bold " >{stat.currencySymbol}{stat.value} </h3>
                            </div>

                        </div>
                    )
                })
            }

        </div>
    )
}