import { company, legal, products } from "@/data/footer_links";
import { Globe, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export default function Footer() {
    return (
        <footer className="w-full bg-white py-12.5 px-5 md:py-12 md:px-14 lg:px-25  flex flex-col items-start gap-8 md:gap-10 lg:gap-12  " >



            <div className=" w-full grid grid-cols-1 md:grid-cols-4 place-items-start justify-items-end justify-between gap-8 lg:gap-12 " >


                {/* The business description  */}
                <div className="w-full flex flex-col items-center md:items-start gap-[22.75px] " >
                    <Link href={"/"} >
                        <Image src={"/logos/smartBiz.png"} alt="logo" width={157} height={36} className=" w-39.5 md:w-39.25 h-auto object-center object-cover " />
                    </Link>

                    <p className="text-[#64748B] text-sm font-normal text-center md:text-start " >The intelligence layer for your
                        commerce business. Designed for
                        the next generation of SMEs.</p>


                </div>



                {/* product links  */}
                <div className="w-full flex flex-col items-center md:items-start gap-6 " >
                    <h4 className=" text-[#0F172A] font-bold text-base " >Product</h4>

                    <ul className=" w-full flex flex-col items-center md:items-start gap-4  "  >
                        {
                            products.map((product, i) => (
                                <li key={i} className="hover:text-[#EB5119] text-[#64748B] hover:duration-200 ease-in-out transition-all  " > <Link href={product.path} >{product.label} </Link> </li>
                            ))
                        }
                    </ul>

                </div>



                {/* company links  */}
                <div className="w-full flex flex-col items-center md:items-start gap-6 " >
                    <h4 className=" text-[#0F172A] font-bold text-base " >Company</h4>

                    <ul className=" w-full flex flex-col items-center md:items-start gap-4  "  >
                        {
                            company.map((c, i) => (
                                <li key={i} className="hover:text-[#EB5119] text-[#64748B] hover:duration-200 ease-in-out transition-all  " > <Link href={c.path} >{c.label} </Link> </li>
                            ))
                        }
                    </ul>

                </div>




                {/* Legal links  */}
                <div className="w-full flex flex-col items-center md:items-start gap-6 " >
                    <h4 className=" text-[#0F172A] font-bold text-base " >Legal</h4>

                    <ul className=" w-full flex flex-col items-center md:items-start gap-4  "  >
                        {
                            legal.map((l, i) => (
                                <li key={i} className="hover:text-[#EB5119] text-[#64748B] hover:duration-200 ease-in-out transition-all  " > <Link href={l.path} >{l.label} </Link> </li>
                            ))
                        }
                    </ul>

                </div>




            </div>




            <div className=" w-full border-t border-[#F1F5F9] py-8 flex flex-col md:flex-row items-center justify-between gap-10 text-[#94A3B8]  " >
                <small className="font-normal text-xs " >© 2026 SmartBiz AI Inc. All rights reserved.</small>


                <div className="flex items-center gap-6  " >
                    <Link href={"#"} className="hover:text-[#EB5119]  hover:duration-200 ease-in-out transition-all" >
                        <Globe size={15} />
                    </Link>

                    <Link href={"#"} className="rotate-45 hover:text-[#EB5119]  hover:duration-200 ease-in-out transition-all" >
                        <Wifi size={15} />
                    </Link>

                </div>

            </div>

        </footer>
    )
}