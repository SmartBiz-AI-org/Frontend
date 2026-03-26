"use client"

import { side_nav_links } from "@/data/side_nav_links"
import Link from "next/link"
import { usePathname } from "next/navigation"




export default function Sidebar() {
    const pathname = usePathname()


    return (

        <ul className="flex flex-col gap-1 w-full ">
            {side_nav_links.map((link, i) => {
                const Icon = link.icon
                const isActive = pathname === link.path
                return (
                    <li key={i}>
                        <Link
                            href={link.path}
                            className={`flex items-center gap-4 w-full py-2 px-4 rounded-[8px] text-sm font-medium
                                    hover:bg-[#EB511914] hover:text-[#EB5119] duration-200 transition-all
                                    ${isActive ? "bg-[#EB511914] text-[#EB5119] " : "bg-transparent text-[#64748B] "}`
                            }
                        >
                            <Icon size={15} />
                            {link.label}

                            {link.isBeta && (

                                <span className="bg-[#EB5119] py-1 px-2 rounded-[100px] text-center text-white font-medium text-[8px] " >
                                    Beta
                                </span>
                            )}
                        </Link>
                    </li>
                )
            })}
        </ul>

    )
}