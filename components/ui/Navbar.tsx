"use client"

import Image from "next/image";
import Link from "next/link";
import { navlinks_data } from "../../data/navlinks_data"
import { Button } from "../ui/CustomButton"
import { ChevronRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";




export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false)



    // This function toggles the mobile menu
    const toggleMenu = () => {
        setShowMenu((prev) => !prev)
    }

    // This function prevents the page from scrolling when the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = showMenu ? "hidden" : "auto";
    }, [showMenu]);



    return (
        <header className="w-full flex items-center justify-center py-4 px-5 md:px-25 bg-[#FFFFFF14] backdrop-blur-md border-b border-[#E3E3E3] relative  " >

            <nav className="w-full flex items-center justify-between gap-5 z-20 " >

                <Link href={"/"} >
                    <Image src={"/logos/smartBiz.png"} alt="logo" width={157} height={36} className=" w-39.5 md:w-39.25 h-auto object-center object-cover " />
                </Link>


                <ul className="hidden w-fit lg:flex items-center gap-10 " >
                    {
                        navlinks_data.map((link, i) => (

                            <li key={i} className="text-sm font-medium text-[#475569] hover:text-[#EB5119] transition-all duration-150 ease-in-out " >
                                <Link href={link.path} > {link.label}</Link></li>
                        ))
                    }
                </ul>



                <div className="hidden w-fit lg:flex items-center gap-4 " >

                    <Link href={"/login"} className="w-fit"  >
                        <Button
                            variant="secondary"
                            type="button"
                            className="border-transparent hover:border-[#E2E8F0] "
                        > Login </Button>
                    </Link>

                    <Link href={"/sign-up"} className="w-fit"  >
                        <Button variant="primary" type="button" >Get started</Button>
                    </Link>
                </div>


                <button
                    onClick={toggleMenu}
                    className=" w-fit block lg:hidden cursor-pointer " >
                    <Menu size={32} />
                </button>

            </nav>





            {/* mobile menu */}
            <div
                className={`absolute left-0 top-full w-full bg-white
  h-[calc(100vh-72px)] border-t border-[#E3E3E3]
  transition-transform duration-300 ease-in-out
  ${showMenu ? "translate-y-0" : "-translate-y-[150%] "}`}
            >
                <div className="flex flex-col gap-6 p-6">

                    {navlinks_data.map((link, i) => (
                        <Link
                            key={i}
                            href={link.path}
                            className="text-[28px] font-normal text-[#6A2A00]"
                            onClick={() => setShowMenu(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex flex-col gap-4 mt-6">

                        <Link href={"/sign-up"} >
                            <Button
                                variant="primary"
                                type="button"
                                className="w-full flex items-center justify-center gap-2 py-3"
                            >
                                Get Started for Free
                                <ChevronRight size={18} />
                            </Button>
                        </Link>


                        <Button
                            variant="secondary"
                            type="button"
                            className="w-full flex items-center justify-center gap-2 py-3"
                        >
                            <span>Sign In</span>
                            <ChevronRight size={18} />
                        </Button>

                    </div>

                </div>
            </div>



        </header>
    )
}