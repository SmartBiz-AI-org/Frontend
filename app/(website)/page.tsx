import CTA from "@/components/homepage-components/CTA";
import FAQSection from "@/components/homepage-components/FAQSection";
import Features from "@/components/homepage-components/Features";
import Hero from "@/components/homepage-components/Hero";
import Pricing from "@/components/homepage-components/Pricing";
import WhySmartBiz from "@/components/homepage-components/WhySmartBiz";
import Footer from "@/components/ui/Footer";


export default function Page() {
    return (
        <>
            <Hero />
            <Features />
            <WhySmartBiz />
            <Pricing />
            <FAQSection />
            <CTA />
            <Footer />
        </>
    )
}