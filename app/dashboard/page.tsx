import AskSmartBizAI from "@/components/dashboard-components/AskSmartBizAI";
import MonthlyPayments from "@/components/dashboard-components/MonthlyPayments";
import QuickActions from "@/components/dashboard-components/QuickActions";
import RecentTransactions from "@/components/dashboard-components/RecentTransactions";
import RevenueGraph from "@/components/dashboard-components/RevenueGraph";
import StatsBar from "@/components/dashboard-components/StatsBar";
import DateFilter from "@/components/dashboard-components/DateFilter";
import { Download } from "lucide-react";
import { getDashboardStats, getRevenueGraphData, getRecentTransactions, getMonthlyPayments } from "@/actions/dashboardActions";

interface PageProps {
    searchParams: Promise<{
        from?: string;
        to?: string;
    }>
}

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;
    const fromDate = params.from ? new Date(params.from) : undefined;
    const toDate = params.to ? new Date(params.to) : undefined;

    // Fetch all required data in parallel
    const [statsRes, graphRes, txRes, paymentsRes] = await Promise.all([
        getDashboardStats(fromDate, toDate),
        getRevenueGraphData(fromDate, toDate),
        getRecentTransactions(10),
        getMonthlyPayments(),
    ]);

    const stats = statsRes.success ? statsRes.stats : {
        totalRevenue: 0,
        paymentsReceived: 0,
        pendingInvoices: 0,
        revenueChange: "0%",
        revenueTrend: "up" as const,
    };

    const graphData = graphRes.success && graphRes.chartData ? graphRes.chartData : [];
    const transactions = txRes.success && txRes.transactions ? txRes.transactions : [];
    const monthlyPayments = paymentsRes.success && paymentsRes.monthlyPayments ? paymentsRes.monthlyPayments : [];

    return (
        <div className="p-8 w-full flex flex-col gap-8">
            {/* Page Header */}
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[#0F172A] font-bold text-2xl">Dashboard Overview</h1>
                    <p className="font-normal text-sm text-[#64748B]">Manage your AI-powered business operations.</p>
                </div>

                <div className="flex items-center gap-3">
                    <DateFilter />
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            {/* The stats bar showing the main metrics */}
            <StatsBar stats={stats as any} />

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Large Components */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <RevenueGraph data={graphData} />
                </div>

                {/* Right Column - Sidebar Style Components */}
                <div className="flex flex-col gap-8">
                    <QuickActions />
                </div>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Large Components */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <MonthlyPayments data={monthlyPayments} />
                </div>

                {/* Right Column - Sidebar Style Components */}
                <div className="flex flex-col gap-8">
                    <AskSmartBizAI />
                </div>
            </div>
            <div className="w-full">
                <RecentTransactions transactions={transactions as any} />
            </div>
        </div>
    )
}