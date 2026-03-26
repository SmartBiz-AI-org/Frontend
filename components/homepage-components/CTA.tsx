import Image from "next/image";
import { Button } from "../ui/CustomButton";



export default function CTA() {
    return (
        <section className="w-full bg-[#0F172A] pt-12.5 md:pt-15 relative px-5 md:px-10 lg:px-25 flex flex-col md:flex-row items-end justify-between gap-10 "  >
            <div className="[background:linear-gradient(135deg,rgba(235,81,25,0.4)_0%,rgba(235,81,25,0)_100%)]  absolute inset-0 h-full w-full z-0 " />

            <div className="w-full max-w-xl flex flex-col items-start gap-8 z-10 pb-10 " >
                <h2 className=" font-bold text-[28px] md:text-5xl text-white text-center md:text-start " >Ready to transform your business?</h2>
                <p className="text-[#CBD5E1] font-normal  md:text-lg  text-center md:text-start " >Join thousands of SME owners scaling their commerce with SmartBiz AI.</p>


                <div className="w-full md:w-fit flex flex-col md:flex-row items-center justify-center gap-4 mx-auto md:mx-0 "  >
                    <Button
                        variant="primary"
                        className=" px-10 text-base w-full md:w-fit "
                    >
                        Start Your Free Trial</Button>


                    <Button
                        variant="secondary"
                        className="w-full md:w-fit  px-10 text-base bg-[#FFFFFF1A]! text-white border-[#FFFFFF33] hover:rounded-[100px]   "
                    >Talk to Sales</Button>
                </div>

            </div>


            <div className="w-full max-w-xs md:max-w-sm overflow-hidden h-full relative mx-auto md:mx-0 " >

                <Image src={"/homepage-images/cheerful-young-nigerian-man-texting-with-his-phone.png"} alt="Young cheerful Nigerian" width={500} height={500} className="object-center object-cover" />
            </div>


        </section>
    )
}