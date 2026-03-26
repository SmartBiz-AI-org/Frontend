import { DashboardStat } from "@/type/type";
import { Banknote, ClipboardClock, Wallet } from "lucide-react";

export const dashboardStats: DashboardStat[] = [
    {
        id: 1,
        label: "Total Revenue",
        value: "128,430.00",
        currencySymbol: "₦",
        change: "12.5%",
        trend: "up",
        iconName: Banknote,
    },
    {
        id: 2,
        label: "Payments Received",
        value: "94,200.00",
        currencySymbol: "₦",
        change: "8.2%",
        trend: "up",
        iconName: Wallet,
    },
    {
        id: 3,
        label: "Pending Invoices",
        value: "12",
        change: "2.4%",
        trend: "down",
        iconName: ClipboardClock,
    },
];