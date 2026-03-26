import { InvoiceDataType } from "@/type/type";

export const mock_invoice_data: InvoiceDataType[] = [
  {
    id: "INV-001",
    customer: {
      name: "Chinedu Okafor",
      email: "chinedu@gmail.com",
      icon: "🐼"
    },
    product: "Cupcake",
    amount: 124500,
    status: "PAID",
    due_date: "2026-03-01",
  },
  {
    id: "INV-002",
    customer: {
      name: "Aisha Bello",
      email: "aisha@gmail.com",
      icon: "🦋"
    },
    product: "Cake",
    amount: 85000,
    status: "PENDING",
    due_date: "2026-03-10",
  },
  {
    id: "INV-003",
    customer: {
      name: "Tunde Lawal",
      email: "tunde@gmail.com",
      icon: "🦁"
    },
    product: "Cookies",
    amount: 45000,
    status: "OVERDUE",
    due_date: "2026-02-20",
  },
  {
    id: "INV-004",
    customer: {
      name: "Ngozi Eze",
      email: "ngozi@gmail.com",
      icon: "🦄"
    },
    product: "Brownies",
    amount: 67000,
    status: "PAID",
    due_date: "2026-03-05",
  },
  {
    id: "INV-005",
    customer: {
      name: "Emeka Obi",
      email: "emeka@gmail.com",
      icon: "🍀"
    },
    product: "Donuts",
    amount: 39000,
    status: "PENDING",
    due_date: "2026-03-12",
  },
];