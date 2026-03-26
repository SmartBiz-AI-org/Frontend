import { Reasons } from "@/data/reasons";
import AnimatedContent from "./AnimatedContent";




export default function WhySmartBiz() {
    return (
        <section
            id="why-choose-us"
            className="bg-white md:bg-transparent py-12.5 md:py-24 px-5 md:px-25 flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 ">



            <div className="w-full h-fit lg:basis-1/2 flex flex-col items-start gap-6 "  >

                <div className="w-full flex flex-col items-center md:items-start gap-4  " >
                    <h2 className="font-normal text-[28px] md:text-[40px] text-center  md:text-start text-[#6A2A00] " >Why Choose <span className="text-[#EB5119] " > SmartBiz AI</span></h2>
                    <p className="text-[#475569] text-base font-normal text-center md:text-start " >Built for modern SMEs with an elite Web3/AI aesthetic that
                        inspires confidence.</p>
                </div>


                <div className="w-full flex flex-col items-center md:items-start justify-center  gap-4 " >
                    {Reasons.map((reason, i) => {
                        const Icon = reason.icon

                        return (
                            <div key={i} className=" w-full flex flex-col md:flex-row md:items-start items-center gap-4 p-4" >
                                <span className="text-[#EB5119]  " >
                                    <Icon size={25} />
                                </span>

                                <div>
                                    <h4 className="text-[#0F172A] font-bold text-lg text-center md:text-start " > {reason.title} </h4>
                                    <p className="text-[#64748B] font-normal text-base text-center md:text-start " > {reason.content} </p>
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>



            <div className="w-full h-full lg:basis-1/2 flex flex-col items-start gap-6 "  >
                <AnimatedContent />
            </div>



        </section>
    )
}