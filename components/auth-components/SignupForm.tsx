"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";
import { useForm } from "react-hook-form";
import { SignUpType } from "@/type/type";
import { useState } from "react";
import Image from "next/image";
import Loader from "../ui/Loader";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



export default function SignupForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpType>()
    const password = watch("password")
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const router = useRouter()

    const onSubmit = async (data: SignUpType) => {
        setIsLoading(true)
        setServerError(null)

        try {
            const response = await fetch("/api/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                setServerError(result.error ?? "Sign-up failed. Please try again.")
                return
            }

            router.push("/onboarding")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialSignIn = async (provider: "google" | "github") => {
        await authClient.signIn.social({
            provider,
            callbackURL: "/onboarding",
        })
    }



    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="
        bg-[linear-gradient(0deg,rgba(255,255,255,0.7),rgba(255,255,255,0.002))]
     w-full max-w-125 border border-[#D0D5DD] rounded-[24px] px-6 py-9 md:p-10.25
        flex flex-col items-center justify-center gap-5.25 z-20
        " >

            <div className=" w-full max-w-96 flex flex-col items-center gap-2 " >
                <h2 className="text-center font-extrabold text-[#0F172A] text-lg md:text-[30px] " >Create your account</h2>
                <p className="font-medium text-sm md:text-base text-[#64748B] text-center " >Start your 14-day free trial. No credit card required.</p>
            </div>


            <div className=" w-full flex flex-col items-center gap-5  " >


                {/* The full name input  */}
                <CustomInput
                    label="FULL NAME"
                    placeholder="Chinedu Okeke"
                    {...register("fullName", {
                        required: "Please enter your full name",
                        
                    })}
                    error={errors.fullName?.message}
                />


                {/* The email address input  */}
                <CustomInput
                    label="EMAIL ADDRESS"
                    placeholder="chiscookeke11@gmail.com"
                    {...register("emailAddress", {
                        required: "Please enter your Email address"
                    })}
                    error={errors.emailAddress?.message}
                />


                {/* The password input  */}
                <CustomInput
                    label="PASSWORD"
                    placeholder="*******"
                    type="password"
                    {...register("password", {
                        required: "Please enter a password",
                        validate: (value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Must include a lowercase letter";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Must include an uppercase letter";
                            }
                            if (!/\d/.test(value)) {
                                return "Must include a number";
                            }
                            if (!/[\W_]/.test(value)) {
                                return "Must include a special character";
                            }
                            return true;
                        },
                    })}
                    error={errors.password?.message}
                />


                {/* confirm  password field */}
                <CustomInput
                    label="CONFIRM PASSWORD"
                    placeholder="*******"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please re-enter your password",
                        validate: (value) =>
                            value === password || "Passwords do not match",
                    })}
                    error={errors.confirmPassword?.message}
                />



                <Button
                    disabled={isLoading}
                    className=" w-full flex items-center justify-center gap-2 " >
                    {isLoading ? <Loader /> :
                        (<>
                            <span>Get Started for Free</span>
                            <ArrowRight size={12} />
                        </>)
                    }
                </Button>

                {serverError && (
                    <p className="text-sm text-red-500 text-center">{serverError}</p>
                )}
            </div>


            <div className="w-full flex items-center justify-between gap-2 "  >
                <hr className="w-full bg-transparent border-t border-[#E2E8F0]  " />
                <p className=" text-xs font-semibold text-[#94A3B8] shrink-0 uppercase tracking-widest " >Or continue with</p>
                <hr className="w-full bg-transparent border-t border-[#E2E8F0]  " />
            </div>



            {/* social auth buttons  */}
            <div className="w-full flex items-center justify-between gap-4  " >

                <Button
                    type="button"
                    onClick={() => handleSocialSignIn("google")}
                    variant="secondary" className="w-full flex items-center justify-center gap-2  font-semibold text-sm   transition-transform duration-150 active:scale-95 " >
                    <Image src={"/logos/google-icon.svg"} alt="Google Icon" height={20} width={20} className="rounded-full object-center " />
                    <span className="text-[#334155]!">Google</span>
                </Button>

                <Button
                    type="button"
                    onClick={() => handleSocialSignIn("github")}
                    variant="secondary" className="w-full flex items-center justify-center gap-2  font-semibold text-sm   transition-transform duration-150 active:scale-95" >
                    <Image src={"/logos/github-icon.svg"} alt="GitHub Icon" height={20} width={20} className="rounded-full object-center " />
                    <span className="text-[#334155]!">Github</span>
                </Button>

            </div>


            <p className="text-center text-xs font-medium text-[#94A3B8] max-w-60.75 "  >By clicking "Get Started", you agree to our
                <span className="text-[#EB5119] " > Terms of Service</span> and Privacy Policy.</p>

        </form>
    )
}