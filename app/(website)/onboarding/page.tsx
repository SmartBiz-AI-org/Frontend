"use client"

import { Button } from "@/components/ui/CustomButton"
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { useState } from "react"
import BusinessProfile from "@/components/onboarding-components/BusinessProfile"
import AddProducts from "@/components/onboarding-components/AddProducts"
import Preferences from "@/components/onboarding-components/Preferences"
import Confirmation from "@/components/onboarding-components/Confirmation"
import { BusinessProfileSchema, ProductSchema, PreferencesSchema } from "@/lib/validations/onboarding"
import { submitOnboarding } from "@/actions/submitOnboarding"
import { useRouter } from "next/navigation"

const STEP_DETAILS: Record<number, { title: string; subtitle: string }> = {
    1: {
        title: "BUSINESS PROFILE",
        subtitle: "Almost there! Just a few more details to personalize your experience.",
    },
    2: {
        title: "ADD YOUR FIRST PRODUCT",
        subtitle: "List your inventory to start selling with AI-powered insights.",
    },
    3: {
        title: "CUSTOMIZE YOUR ASSISTANT",
        subtitle: "Almost there! Your workspace is being prepared.",
    },
    4: {
        title: "ONBOARDING COMPLETE",
        subtitle: "Final Step: Confirmation",
    }
}

export default function Page() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter()

    const [formData, setFormData] = useState({
        businessProfile: {
            businessName: "",
            nationalId: "",
            cacRegistration: "",
            description: "",
            logoUrl: ""
        },
        products: [] as any[],
        preferences: {
            aiTone: "professional",
            language: "en-US",
            autoInvoicing: true
        }
    });

    const [finalSlug, setFinalSlug] = useState("");

    const totalStep = 4
    const percentageCompleted = (currentStep / totalStep) * 100

    const stepInfo = STEP_DETAILS[currentStep] || STEP_DETAILS[1];

    const validateStep = (step: number) => {
        setErrors({}); 
        
        try {
            if (step === 1) {
                BusinessProfileSchema.parse(formData.businessProfile);
            } else if (step === 2) {
                if (formData.products.length === 0) {
                    setErrors({ products: "Please add at least one product to continue." });
                    return false;
                }
                for (const p of formData.products) {
                    const result = ProductSchema.safeParse(p);
                    if (!result.success) {
                        const firstMsg = result.error.issues[0]?.message || "Invalid product details";
                        setErrors({ products: `Product "${p.name || 'item'}": ${firstMsg}` });
                        return false;
                    }
                }
            } else if (step === 3) {
                PreferencesSchema.parse(formData.preferences);
            }
            
            return true;
        } catch (error: any) {
            const zodIssues = error.issues || (error.name === "ZodError" ? error.issues : null);
            
            if (zodIssues && Array.isArray(zodIssues)) {
                const newErrors: Record<string, string> = {};
                zodIssues.forEach((err: any) => {
                    const path = err.path.join(".");
                    newErrors[path || "form"] = err.message;
                });
                setErrors(newErrors);
            } else {
                setErrors({ form: error.message || "An unexpected error occurred" });
            }
            return false;
        }
    };

    const updateFormData = (section: keyof typeof formData, data: any) => {
        setErrors({}); 
        setFormData(prev => ({
            ...prev,
            [section]: Array.isArray(data) ? data : { ...prev[section], ...data }
        }));
    };

    const handleNext = async () => {
        if (!validateStep(currentStep)) return;

        if (currentStep === 3) {
            setIsSubmitting(true);
            setErrors({});
            
            try {
                const res = await submitOnboarding(formData);
                if (res.success && res.slug) {
                    setFinalSlug(res.slug);
                    setCurrentStep(4);
                } else {
                    setErrors({ form: res.error || "Failed to submit. Please try again." });
                }
            } catch (error: any) {
                setErrors({ form: "An unexpected error occurred during submission. The file size might still be too large or there's a connection issue." });
            } finally {
                setIsSubmitting(false);
            }
        } else if (currentStep < totalStep) {
            setCurrentStep(prev => prev + 1);
        }
    };

    return (
        <div className="font-inter w-full min-h-screen flex flex-col relative">
            <div className="w-full flex-1 flex flex-col items-center justify-start pt-28 pb-10 px-4 md:pt-25 md:px-25">
                <div className="w-full max-w-200 flex flex-col items-start gap-14 shrink-0">

                {/* The step progress tracker */}
                <div className="w-full flex flex-col gap-4 items-start">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-[#EB5119] font-semibold text-sm uppercase">STEP {currentStep}: {stepInfo.title}</h1>
                        <p className="text-[#64748B] font-medium text-sm">{percentageCompleted}% Complete</p>
                    </div>

                    <div className="w-full h-2 rounded-[9999px] bg-[#E2E8F0] relative overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-[#EB5119] transition-all duration-500 ease-in-out"
                            style={{ width: `${percentageCompleted}%` }}
                        ></div>
                    </div>

                    <p className="text-sm font-normal text-[#64748B]">{stepInfo.subtitle}</p>
                </div>

                {errors.form && (
                    <div className="w-full p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-sm flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        {errors.form}
                    </div>
                )}

                {/* The current step component */}
                {currentStep === 1 && <BusinessProfile data={formData.businessProfile} onChange={(data: any) => updateFormData("businessProfile", data)} errors={errors} />}
                {currentStep === 2 && <AddProducts data={formData.products} onChange={(data: any) => updateFormData("products", data)} errors={errors} />}
                {currentStep === 3 && <Preferences data={formData.preferences} onChange={(data: any) => updateFormData("preferences", data)} errors={errors} />}
                {currentStep === 4 && <Confirmation slug={finalSlug} onFinish={() => router.push("/dashboard")} />}

                {/* Navigation Buttons */}
                {currentStep !== 4 && (
                    <div className="w-full flex items-center justify-between gap-10 border-t border-[#E2E8F0] pt-6">
                        {currentStep === 1 ? (
                            <button className="text-[#64748B] font-bold text-base">Save for later</button>
                        ) : (
                            <button 
                                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                                disabled={isSubmitting}
                                className="text-[#334155] font-bold text-base flex items-center gap-2 hover:text-black transition-colors disabled:opacity-50" 
                            >
                                <ArrowLeft size={16} />
                                <span>Previous</span>
                            </button>
                        )}

                        <Button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className="w-fit flex items-center justify-center gap-2 disabled:opacity-75" 
                        >
                            {isSubmitting ? (
                                <><Loader2 size={16} className="animate-spin" /><span>Saving...</span></>
                            ) : currentStep === 1 ? (
                                <><span>Continue</span><ArrowRight size={16} /></>
                            ) : currentStep === 3 ? (
                                <span>Complete Setup</span>
                            ) : (
                                <span>Continue to Step {currentStep + 1}</span>
                            )}
                        </Button>
                    </div>
                )}
                </div>
            </div>

            {/* Footer */}
            <div className="w-full bg-[#F8FAFC] border-t border-[#E2E8F0] py-6 px-4 md:px-12 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[#94A3B8] text-sm">© 2026 SmartBiz AI Inc. All rights reserved.</p>
                <div className="flex items-center gap-6 text-[#94A3B8] text-sm">
                    <button className="hover:text-[#64748B] transition-colors">Privacy Policy</button>
                    <button className="hover:text-[#64748B] transition-colors">Terms of Service</button>
                    <button className="hover:text-[#64748B] transition-colors">Help Center</button>
                </div>
            </div>
        </div>
    )
}