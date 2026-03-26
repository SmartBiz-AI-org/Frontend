"use client"

import { faqs } from "@/data/faq_data";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";






export default function FAQSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);



    return (
        <section className=" w-full bg-white flex flex-col md:flex-row items-center md:items-start justify-evenly gap-8 md:gap-10 py-12.5 px-5 md:py-15 md:px-16 lg:px-30  " >

            <h2 className=" text-center md:text-start font-semibold text-[#6A2A00] text-[28px] md:text-[32px]  " >Frequently Asked Questions</h2>



            <div className="space-y-4 w-full max-w-198.25 ">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-[#E3E3E3] rounded-[12px] overflow-hidden bg-white  "
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            className="w-full flex items-center justify-between p-5 gap-5 cursor-pointer text-left  transition-colors"
                        >
                            <span className=" font-medium text-base text-[#000000]   ">{faq.question}</span>

                            <span className="bg-[#FD6501] size-8 rounded-full flex items-center justify-center text-white shrink-0 " >
                                {openFaq === index ? <Minus size={16} /> : <Plus size={16} />}
                            </span>

                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300  ${openFaq === index ? 'max-h-52 pb-6' : 'max-h-0'}`}
                        >

                            <hr
                                className="w-[94%] border-t-[0.5px] border-[#9C9C9C] mx-auto my-3 "
                            />

                            <p className="px-6 text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}