import { Bot, Notebook } from "lucide-react";
import { Button } from "../ui/CustomButton";
import Link from "next/link";



export default function QuickActions() {
    return (
        <div className="w-full bg-white h-full col-span-1  p-6 flex flex-col items-start
         gap-6 rounded-[12px] border border-[#E2E8F0]
              shadow-[0px_1px_2px_0px_#0000000D] "  >

            <h3 className="text-[#0F172A] font-bold text-base " >Quick Actions</h3>


            <div className="w-full flex flex-col gap-3 "  >

                <Button
                    className="text-start flex items-center gap-3 text-[#334155] p-3! "
                    variant="secondary"  >
                    <Notebook color="#64748B" size={13.48} />
                    Add Product</Button>


                <Link href="/dashboard/chat"
                    className="text-start flex items-center gap-3 text-[#334155] p-3! bg-white border border-[#E2E8F0] rounded-md font-bold"  >
                    <Bot color="#64748B" size={13.48} />
                    Test AI Chat</Link>



                <Link href="/dashboard/invoices"
                    className="text-start flex items-center gap-3 text-[#334155] p-3! bg-white border border-[#E2E8F0] rounded-md font-bold"  >
                    <Bot color="#64748B" size={13.48} />
                    Generate Invoice</Link>

            </div>

        </div>
    )
}