import SignupForm from "@/components/auth-components/SignupForm";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
    return (
        <div className="font-inter w-full min-h-screen pt-28 pb-5 px-4 md:pt-25 md:pb-5 md:px-25 flex items-center justify-between overflow-x-hidden gap-10 flex-col relative  "  >

            {/* bottom blur  */}
            <div className=" absolute top-[50%] translate-y-[-50%] left-[-3%] w-[384px] h-[467.97px]  rounded-[9999px] " >
                <Image src={"/auth-images/left-blur.svg"} alt="center blur" height={500} width={500} className=" h-full w-full " />
            </div>


            {/* Right blur  */}
            <div className=" absolute top-[60%] translate-y-[-50%] right-[-3%] w-[384px] h-[467.97px]  rounded-[9999px] " >
                <Image src={"/auth-images/right-blur.svg"} alt="center blur" height={500} width={500} className=" h-full w-full " />
            </div>




            <div className="w-full flex flex-col items-center gap-8 "  >
                <SignupForm />




                <p className=" text-sm font-normal text-[#64748B] "  >Already have an account? <Link href={"/login"} className="text-[#EB5119] " >Login </Link></p>




                <div className="w-full flex flex-col items-center justify-center gap-4 " >
                    <h5 className="text-[#94A3B8] text-[10px] font-bold " >Trusted by modern teams</h5>

                    <div className="w-full flex items-center justify-evenly"  >
                        teams here
                    </div>
                </div>

            </div>



            <small className="text-sm font-normal text-[#94A3B8] " >© 2026 SmartBiz AI Inc. All rights reserved.</small>

        </div>
    )
}