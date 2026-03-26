import Sidebar from "@/components/ui/Sidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DashboardHeader from "@/components/dashboard-components/DashboardHeader";
import UserProfile from "@/components/dashboard-components/UserProfile";


export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row items-stretch h-screen min-h-0 bg-[#F8F6F6] font-inter">


            {/* The left side  */}
            <aside className="hidden lg:flex flex-col min-h-0 overflow-y-auto w-full max-w-46 md:max-w-72 bg-white border-r border-[#E2E8F0] py-6 px-5 ">
                <Link href={"/"} className="w-fit">
                    <Image
                        src={"/logos/smartBiz.png"}
                        width={180}
                        height={180}
                        alt="TheGreyIT-logo"
                        className="object-center w-37.5 h-auto "
                    />
                </Link>

                <div className="w-full bg-white flex-1 overflow-y-auto thin-scrollbar py-10 ">
                    <Sidebar />
                </div>


                <UserProfile />

            </aside>




            {/* The right side  */}
            <main className="w-full flex-1 h-full min-h-0 flex flex-col">
                <DashboardHeader />

                <div className="w-full flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}