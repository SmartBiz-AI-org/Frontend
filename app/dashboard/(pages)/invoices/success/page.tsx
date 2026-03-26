import { Button } from "@/components/ui/CustomButton";
import CheckSuccessIcon from "@/public/icons/CheckIcon";
import CustomIcon from "@/public/icons/CutomIcon";
import { Download, LayoutDashboard, ShieldCheck } from "lucide-react";
import Image from "next/image";




export default function Page() {
    return (
        <div className="p-8 w-full  flex-col gap-8 relative flex items-center justify-center ">


            <div className="w-full max-w-xl flex flex-col items-center gap-8  " >

                <Image src={"/icons/check-icon.svg"} alt="icon" height={200} width={200} className="w-24 h-auto  "  />

                <div className=" w-full flex flex-col text-center items-center justify-center gap-2 " >
                    <h2 className="text-[#0F172A] text-3xl font-extrabold " >Invoice Cleared Succesfully</h2>
                    <p className="text-lg text-[#64748B] font-normal " >The payment for Invoice #INV-2024-082 has been processed and added to your balance.</p>
                </div>

                {/* Transaction summary */}
                <div className="w-full bg-[#FFFFFF] rounded-[12px] border border-[p#E2E8F0] flex flex-col items-start overflow-hidden " >
                    <div className="w-full p-6 bg-[#F8FAFC80] border border-[#F1F5F9] flex items-center justify-between  " >
                        <h3 className="text-base font-semibold text-[#0F172A] " >Transaction Summary</h3>
                        <span className="text-[#059669] block font-bold text-xs tracking-[1.2px] uppercase " >Settled</span>
                    </div>

                    <div className="p-6  w-full grid grid-cols-2 gap-3 " >

                        <div className="w-full flex flex-col items-start gap-1 " >
                            <h4 className="text-[#94A3B8] text-xs font-bold " >INVOICE ID</h4>
                            <h5 className="text-[#334155] font-medium text-base " >#INV-94021-SB</h5>
                        </div>

                        <div className="w-full flex flex-col items-start gap-1 " >
                            <h4 className="text-[#94A3B8] text-xs font-bold " >AMOUNT</h4>
                            <h5 className="text-[#0F172A] font-medium text-[30px] " >$1,249.00</h5>
                        </div>

                        <div className="w-full flex flex-col items-start gap-1 " >
                            <h4 className="text-[#94A3B8] text-xs font-bold " >PAYMENT METHOD</h4>
                            <h5 className="text-[#334155] font-medium text-base " >Visa **** 4242</h5>
                        </div>

                        <div className="w-full flex flex-col items-start gap-1 " >
                            <h4 className="text-[#94A3B8] text-xs font-bold " >DATE</h4>
                            <h5 className="text-[#334155] font-medium text-base " >Oct 24, 2023 • 14:32 UTC</h5>
                        </div>

                    </div>

                </div>



                {/* AI summary  */}
                <div className="w-full bg-[#EB51190D] border border-[#EB51191A] flex items-start justify-start gap-4 p-5 rounded-[12px] "  >

                    <span className="flex items-center justify-center w-[35.01px] h-9 rounedd-[8px] bg-[#EB51191A] rounded-[8px] " >
                        <CustomIcon />
                    </span>

                    <div className="w-full flex flex-col items-start gap-[2.75px] " >
                        <h3 className="text-sm text-[#EB5119] font-bold "  >AI Summary</h3>
                        <p className="text-sm font-normal text-[#334155] " >This payment completes the Q3 cycle for Acme Systems. Your revenue targets for October have been exceeded by <span className="text-green-700" >12%.</span></p>
                    </div>

                </div>


                {/* Metadata */}
                <div className="w-full p-6 bg-white border border-[#F1F5F9] rounded-[12px] gap-4 flex flex-col items-start  " >
                    <h4 className="text-[#94A3B8] text-xs font-thin " >METADATA</h4>

                    <div className="w-full flex items-center justify-between gap-5 " >
                        <h5 className="text-[#64748B] font-normal text-[13px]  " >Reference ID</h5>
                        <h6 className="text-[#0F172A] font-normal text-[13px]" >TX_90234812_B</h6>
                    </div>

                    <div className="w-full flex items-center justify-between gap-5 " >
                        <h5 className="text-[#64748B] font-normal text-[13px]  " >Processing Time</h5>
                        <h6 className="text-[#0F172A] font-normal text-[13px]" >0.42s</h6>
                    </div>

                    <div className="w-full flex items-center justify-between gap-5 " >
                        <h5 className="text-[#64748B] font-normal text-[13px]  " >Settlement Account</h5>
                        <h6 className="text-[#0F172A] font-normal text-[13px]" >Main Operating (..9901)</h6>
                    </div>

                </div>


                {/* Action buttons */}
                <div className="w-full flex items-center gap-3">
                    <Button
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold "
                    >
                        <LayoutDashboard size={18} />
                        Back to Dashboard
                    </Button>

                    <Button
                        variant="secondary"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold "
                    >
                        <Download size={18} />
                        Download Receipt
                    </Button>
                </div>



                {/*  */}
                <small className="text-[#94A3B8] text-sm font-normal flex items-center gap-2 " >
                    <ShieldCheck size={9.33} />
                    Secured by SmartBiz Smart Contracts
                </small>

            </div>


        </div>
    )
}