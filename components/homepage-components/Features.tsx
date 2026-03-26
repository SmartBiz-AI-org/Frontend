import { features_data } from "@/data/features";
import { ArrowRight, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Tags from "./tags";



export default function Features() {
    return (
        <section
            id="features"
            className=" w-full h-fit py-12.5 px-[2.5%] md:px-[6%] flex flex-col items-center justify-center gap-12 bg-white md:bg-transparent " >
            <Tags
                icon={<Target size={18} />}
                text="Features"
                className="text-sm bg-white"
            />

            <div className="w-full max-w-99 flex items-center justify-center flex-col gap-6 " >
                <h2 className="text-[#6A2A00] font-normal text-[28px] md:text-[40px] text-center  " >Powerful Features for Growing Businesses</h2>

            </div>


            <div className="w-full grid grid-cols-1 md:grid-cols-3 place-items-center justify-items-center justify-center gap-4 " >

                {features_data.map((feature, index) => (
                    <div key={index} className=" w-full flex flex-col items-center md:items-start gap-6 md:bg-white h-full py-4 px-8 " >
                        <span>
                            <Image src={feature.icon} alt="icon" width={24} height={30} className="w-6 h-auto " />
                        </span>

                        <div className="flex flex-col items-center md:items-start justify-center gap-2 " >
                            <h4 className="font-medium text-[#272727] text-base " > {feature.title} </h4>
                            <p className="font-normal text-[#5C5C5C] text-sm text-center md:text-start " > {feature.content} </p>
                        </div>

                        <Link
                            href={feature.url}
                            className="flex items-center gap-1 font-semibold text-sm text-[#EB5119] " >
                            Learn more <ArrowRight size={10} /> </Link>

                    </div>
                ))}

            </div>

        </section>
    )
}