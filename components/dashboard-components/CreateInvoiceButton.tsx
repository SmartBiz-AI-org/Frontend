"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/CustomButton";
import CreateInvoiceModal from "@/components/dashboard-components/CreateInvoiceModal";

export default function CreateInvoiceButton() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpenModal(true)}
                variant="primary"
                className=" flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold "
            >
                <Plus size={18} />
                Create New Invoice
            </Button>

            {openModal && (
                <CreateInvoiceModal
                    setOpenModal={setOpenModal}
                />
            )}
        </>
    );
}
