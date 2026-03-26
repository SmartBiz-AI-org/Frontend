"use client"

import { CircleCheck, ShieldCheck } from "lucide-react";
import Tags from "./tags";
import { pricingPlans } from "@/data/pricing";
import { Button } from "../ui/CustomButton";
import { useState } from "react";


export default function Pricing() {
    const [currentPlan, setCurrentPlan] = useState<"monthly" | "yearly">("monthly")


    return (
        <section
            id="pricing"
            className="w-full flex flex-col items-center justify-center bg-white  py-12.5 md:py-24 px-5 md:px-25 gap-5 " >
            <Tags
                text="PRICING"
                icon={<ShieldCheck size={18} />}
                className="bg-[#F9FAFB] rounded-[32px] text-xs "
            />


            <div className="w-full flex-col flex items-center justify-center gap-4 " >
                <h2 className=" text-[28px] md:text-[32px] font-medium text-center text-[#6A2A00] " >Flexible Pricing to Fit Your Needs</h2>
                <p className="text-sm text-[#000000] font-normal text-center w-full max-w-98 " >Choose from our Free, Basic, or Pro plan to access the tools and services that best suit your business.</p>
            </div>


            <div className=" w-full flex flex-col items-center justify-center gap-4 " >

                <div className=" w-fit  p-1 flex items-stretch justify-center gap-1 border border-[#CCCCCCCC] rounded-[8px] " >

                    <button
                        onClick={() => setCurrentPlan("monthly")}
                        className={`
                            ${currentPlan === "monthly" ? "bg-[#EB5119] text-white" : "bg-white text-[#000000]"}
                        font-medium text-sm  hover:text-white py-3 px-6
                          hover:bg-[#EB5119] flex items-center justify-center rounded-[8px]
                         cursor-pointer duration-200 ease-in-out transition-all
                         `} >
                        Monthly</button>


                    <button
                        onClick={() => setCurrentPlan("yearly")}
                        className={`
                            ${currentPlan === "yearly" ? "bg-[#EB5119] text-white" : "bg-white text-[#000000]"}
                        font-medium text-sm  hover:text-white py-3 px-6
                          hover:bg-[#EB5119] flex items-center justify-center rounded-[8px]
                         cursor-pointer duration-200 ease-in-out transition-all
                         `}
                    >Yearly</button>

                </div>


                <div className="w-full max-w-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center justify-center gap-[34.64px] " >
                    {
                        pricingPlans.map((plan, i) => (
                            <div
                                key={i}
                                className="w-full max-w-90.5 md:max-w-[376.9px] h-full flex flex-col items-start gap-10
                        border border-[#CCCCCCCC] rounded-[16px] p-4 md:p-8 cursor-pointer text-[#00000] hover:text-white hover:bg-[#EB5119] duration-200 ease-in-out transition-all group
                        " >

                                <div className="w-full h-full flex flex-col items-start gap-5  " >
                                    <h3 className="font-medium text-2xl uppercase  "  > {plan.name} </h3>

                                    <div className="w-full flex flex-col gap-2.25 " >
                                        <h4 className="font-medium text-5xl  " >₦{currentPlan === "monthly" ? plan.pricePerMonthNGN.toLocaleString() : (plan.pricePerMonthNGN * 12).toLocaleString()} <span className="text-[30.45px] " > {currentPlan === "monthly" ? "/mo" : "/yr"}</span></h4>

                                        <p className="font-normal text-sm  " >{plan.billedAnnuallyNote} <span className="bg-[#EB5119] group-hover:bg-white py-1 px-3 rounded-[27px] text-white group-hover:text-[#000000] text-xs font-normal ml-1.5 duration-200 ease-in-out transition-all " > Save {plan.saved}% </span> </p>
                                    </div>

                                    <div className="w-full border-t border-[#E1E4E5] py-3 flex flex-col gap-4 " >
                                        <p className="text-base font-medium " > Free Plan Includes</p>

                                        <ul className="w-full flex flex-col gap-2.25 " >
                                            {
                                                plan.features.map((feature, i) => (
                                                    <li
                                                        className="font-normal text-sm flex items-center gap-2.25 "
                                                        key={i} >
                                                        <CircleCheck size={13} className="shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </div>


                                <Button
                                    variant="secondary"
                                    className="w-full "
                                >
                                    Get Started</Button>

                            </div>
                        ))
                    }
                </div>

            </div>

        </section>
    )
}