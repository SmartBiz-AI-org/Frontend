import { getInvoiceById } from "@/actions/invoiceActions";
import InvoiceClient from "./InvoiceClient";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const result = await getInvoiceById(id);

    if (!result.success || !result.invoice) {
        notFound();
    }

    return <InvoiceClient invoice={result.invoice as any} />;
}