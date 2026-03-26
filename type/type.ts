import { LucideIcon } from "lucide-react";
import React from "react";

export type Plan = {
  name: string;
  pricePerMonthNGN: number;
  billedAnnuallyNote: string;
  saved: number;
  features: string[];
};


export interface SignUpType {
  fullName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}


export interface LoginType {
  emailAddress: string;
  password: string;
}


export interface DashboardStat {
  id: number;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  iconName: LucideIcon;
  currencySymbol?: string;
}


export interface InvoiceDataType {
  id: string;
  customer: {
    name: string;
    email: string;
      icon: React.ReactNode
  };
  product: string;
  amount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
  due_date: string;
}