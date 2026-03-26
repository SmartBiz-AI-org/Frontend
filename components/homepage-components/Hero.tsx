import Image from "next/image";
import { Button } from "../ui/CustomButton";
import Link from "next/link";



export default function Hero() {
    return (
        <section className=" w-full min-h-screen bg-transparent pt-28 pb-12.5 px-5 md:pt-25 md:pb-12.5 md:px-25 flex items-center justify-center relative  overflow-x-hidden " >


            <div className="w-full max-w-310 flex flex-col md:flex-row items-center justify-between gap-12 z-10  " >

                {/* left side  */}
                <div className="w-full md:basis-1/2 flex flex-col items-center md:items-start  gap-8  "  >
                    <span className="w-fit flex items-center gap-2 bg-[#EB51190D] border border-[#EB511933] px-3 py-1 rounded-[9999px] font-semibold text-[#EB5119] text-xs " >
                        <span />
                        Trusted by 2,000+ SMEs
                    </span>

                    <h1 className="text-[#0F172A] font-bold text-[40px] md:text-[69px] text-center md:text-start md:leading-18 leading-[100%] " >Scale Your Business <span className="text-[#EB5119] " >with AI</span></h1>

                    <p className="text-[#475569] font-normal text-lg  text-center md:text-start  " >  The all-in-one AI assistant for SME commerce.
                        Automate workflows, manage payments, and grow
                        smarter without the complexity.</p>


                    <div className="w-full md:w-fit flex flex-col md:flex-row items-center justify-center md:justify-start gap-4  " >
                        <Link href={"/sign-up"} className="md:w-fit w-full " >
                            <Button
                                variant="primary"
                                className=" w-full md:w-fit px-8 py-3 text-base
                            shadow-[0px_8px_10px_-6px_#EB511933,0px_20px_25px_-5px_#EB511933]
                            "
                            > Get Started for Free </Button>
                        </Link>


                        <Button
                            variant="secondary"
                            className=" w-full md:w-fit px-8 py-3 text-base " > Book a Demo </Button>

                    </div>

                    <div className="w-fit flex items-center justify-start gap-2 " >
                        <Image src={"/icons/people.png"} alt="icon" width={500} height={500} className=" h-auto w-33 object-center object-cover " />
                        <div className="w-fit flex flex-col items-start " >
                            <h4 className=" text-[#000000] font-medium text-xl " >200+</h4>
                            <p className="text-xs font-normal text-[#959595] " >on Waitlist </p>
                        </div>
                    </div>

                </div>




                {/* right side  */}
                <div className="w-full md:basis-1/2 max-w-126.5 flex items-end justify-center h-107 md:h-150  relative  " >


                    <div className="bg-[#FFC7B3] w-full h-[75%] rounded-[40px] " />

                    <div>
                        <Image src={"/homepage-images/hero-image.png"} alt="hero-image" width={1000} height={1000} className=" absolute bottom-0 left-0 h-full w-full object-center md:object-right object-cover md:object-contain " />
                    </div>



                    {/* first message  */}
                    <div className="hidden w-70 absolute top-[61%] left-[-20%] rotate-2 bg-[#FFFFFFB2] py-3 px-4 rounded-[11.67px]
                    shadow-[0px_5.83px_7.29px_-4.38px_#0000001A,0px_14.58px_18.23px_-3.65px_#0000001A]
md:flex flex-col gap-2 items-start
                    "  >

                        <div className="w-full flex items-center justify-start gap-[11.67px]  " >
                            <span>
                                <Image src={"/logos/business-log.svg"} alt="Icon" width={50} height={50} className="size-7.25  rounded-full flex items-center justify-center " />
                            </span>

                            <h5 className="text-xs font-bold text-[#000000] " >SmartBiz AI</h5>
                        </div>

                        <p className=" text-[11px] font-medium text-[#475569] " >
                            Hello! I'm your SmartBiz AI assistant.
                        </p>

                    </div>



                    {/* second message  */}
                    <div className="hidden w-70 absolute left-[-13%] top-[78%] rotate-[-4deg] bg-[#FFFFFFB2] py-3 px-4 rounded-[11.67px] z-10
                    shadow-[0px_5.83px_7.29px_-4.38px_#0000001A,0px_14.58px_18.23px_-3.65px_#0000001A]
md:flex flex-col gap-2 items-start
                    "  >

                        <div className="w-full flex items-center justify-start gap-[11.67px]  " >
                            <span>
                                <Image src={"/homepage-images/image.png"} alt="Icon" width={50} height={50} className="size-7.25  rounded-full flex items-center justify-center " />
                            </span>

                            <h5 className="text-xs font-bold text-[#000000] " >Oluwatobilola</h5>
                        </div>

                        <p className=" text-[11px] font-medium text-[#475569] " >
                            I need to generate an invoice for the Acme Corp project. Can you help me pull the hours from
                            last week and draft it?
                        </p>

                    </div>

                </div>

            </div>



            {/* blurs  */}
            {/* bottom blur  */}
            <div className=" absolute bottom-0 right-0 w-lg h-79  rounded-[9999px] " >
                <Image src={"/homepage-images/bottom-blur.svg"} alt="center blur" height={500} width={500} className=" h-full w-full " />
            </div>



            <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-lg h-79 rounded-[9999px] " >
                <Image src={"/homepage-images/center-blur.svg"} alt="center blur" height={500} width={500} className=" h-full w-full " />
            </div>

            {/* Top blur */}
            <div className=" absolute top-[-10%] left-[-60%]  w-lg h-79 overflow-hidden rounded-[9999px] ">
                <Image src={"/homepage-images/top-blur.svg"} alt="top blur" height={500} width={500} className=" h-full w-full " />
            </div>

        </section>
    )
}