export type ProductStatus = "Active" | "Draft" | "Archived" | "Low Stock" | "Out of Stock";

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    status: ProductStatus;
    category: string;
    image: string;
    dateAdded: string;
    description: string;
}

export const productCategories = ["Electronics", "Software", "Cloud Services", "Hardware", "Consulting"];

export const mockProducts: Product[] = [
    {
        id: "prod-1",
        name: "Web Hosting Premium",
        sku: "WH-PREM-001",
        price: 25000,
        stock: 500,
        status: "Active",
        category: "Cloud Services",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&h=200&fit=crop",
        dateAdded: "Oct 12, 2023",
        description: "High-performance web hosting with 99.9% uptime guarantee and 24/7 support."
    },
    {
        id: "prod-2",
        name: "Enterprise ERP System",
        sku: "SOFT-ERP-052",
        price: 150000,
        stock: 12,
        status: "Low Stock",
        category: "Software",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&h=200&fit=crop",
        dateAdded: "Sep 28, 2023",
        description: "Complete ERP solution for small to medium enterprises with modules for finance, HR, and inventory."
    },
    {
        id: "prod-3",
        name: "SSL Certificate (Wildcard)",
        sku: "SEC-SSL-W-01",
        price: 45000,
        stock: 0,
        status: "Out of Stock",
        category: "Software",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&h=200&fit=crop",
        dateAdded: "Oct 05, 2023",
        description: "Secure your entire domain and all subdomains with our industry-leading wildcard SSL certificate."
    },
    {
        id: "prod-4",
        name: "AI Business Consultant",
        sku: "CONS-AI-B-99",
        price: 75000,
        stock: 100,
        status: "Draft",
        category: "Consulting",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=200&h=200&fit=crop",
        dateAdded: "Oct 20, 2023",
        description: "Leverage AI to get instant business consulting and data-driven strategy recommendations."
    },
    {
        id: "prod-5",
        name: "Cloud Storage 1TB",
        sku: "WH-STOR-1TB",
        price: 12000,
        stock: 1000,
        status: "Active",
        category: "Cloud Services",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=200&h=200&fit=crop",
        dateAdded: "Aug 15, 2023",
        description: "Reliable and secure cloud storage for your growing business needs."
    },
    {
        id: "prod-6",
        name: "Graphic Design Suite",
        sku: "SOFT-DSGN-G",
        price: 85000,
        stock: 45,
        status: "Archived",
        category: "Software",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=200&h=200&fit=crop",
        dateAdded: "Jul 10, 2023",
        description: "Professional grade graphic design tools for creative teams."
    }
];

export const productStats = {
    totalSales: {
        value: 1240,
        change: 12.5,
        trend: "up"
    },
    totalRevenue: {
        value: 15420000,
        change: 8.2,
        trend: "up"
    },
    unitsSold: {
        value: 850,
        change: -3.4,
        trend: "down"
    }
};

export const productSalesData = [
    { month: "Jan", revenue: 1200000, orders: 45 },
    { month: "Feb", revenue: 1500000, orders: 52 },
    { month: "Mar", revenue: 1300000, orders: 48 },
    { month: "Apr", revenue: 1800000, orders: 65 },
    { month: "May", revenue: 2100000, orders: 72 },
    { month: "Jun", revenue: 1900000, orders: 68 },
    { month: "Jul", revenue: 2400000, orders: 85 },
];

export interface ProductOrder {
    id: string;
    customer: string;
    date: string;
    amount: number;
    status: "Completed" | "Pending" | "Cancelled";
}

export const productOrders: ProductOrder[] = [
    { id: "ORD-001", customer: "Alice Johnson", date: "2024-03-20", amount: 25000, status: "Completed" },
    { id: "ORD-002", customer: "Bob Smith", date: "2024-03-18", amount: 45000, status: "Pending" },
    { id: "ORD-003", customer: "Charlie Brown", date: "2024-03-15", amount: 15000, status: "Completed" },
    { id: "ORD-004", customer: "David Wilson", date: "2024-03-12", amount: 30000, status: "Cancelled" },
    { id: "ORD-005", customer: "Eva Green", date: "2024-03-10", amount: 55000, status: "Completed" },
];
