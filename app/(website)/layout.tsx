import Navbar from "@/components/ui/Navbar";



export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full h-fit font-dm-sans relative bg-[#F8F6F6] " >
            <div className="w-full fixed top-0 left-0 h-fit z-50" >
                <Navbar />
            </div>
            {children}
        </main>
    )
}