"use client"

import { Button } from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";
import { useForm } from "react-hook-form";
import { LoginType } from "@/type/type";
import { useState } from "react";
import Image from "next/image";
import Loader from "../ui/Loader";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>()
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const router = useRouter()

    const onSubmit = async (data: LoginType) => {
        setIsLoading(true)
        setServerError(null)

        try {
            const response = await fetch("/api/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                setServerError(result.error ?? "Sign-in failed. Please check your credentials.")
                return
            }

            router.push("/dashboard")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialSignIn = async (provider: "google" | "github") => {
        await authClient.signIn.social({
            provider,
            callbackURL: "/dashboard",
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

            <div className=" w-full max-w-96 flex flex-col items-center gap-2 ">
                <h2 className="text-center font-extrabold text-[#0F172A] text-lg md:text-[30px] ">Welcome back</h2>
                <p className="font-medium text-sm md:text-base text-[#64748B] text-center ">Enter your details to access your dashboard.</p>
            </div>


            <div className=" w-full flex flex-col items-center gap-5  ">

                {/* The email address input  */}
                <CustomInput
                    label="Work Email"
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
                    })}
                    error={errors.password?.message}
                />

                <Link href={"#"} className="ml-auto text-[#EB5119] text-xs font-semibold "  >Forgot password</Link>

                <Button
                    disabled={isLoading}
                    className=" w-full flex items-center justify-center gap-2 " >
                    {isLoading ? <Loader /> :
                        (<>
                            <span>Sign in to Workspace</span>
                        </>)
                    }
                </Button>

                {serverError && (
                    <p className="text-sm text-red-500 text-center">{serverError}</p>
                )}
            </div>


            <div className="w-full flex items-center justify-between gap-2 "  >
                <hr className="w-full bg-transparent border-t border-[#E2E8F0]  " />
                <p className=" text-xs font-semibold text-[#94A3B8] shrink-0 uppercase tracking-widest ">Or continue with</p>
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


            <div className=" w-full rounded-[8px] bg-[#F8FAFC80] flex items-center justify-center gap-3 px-3 py-2.75 "  >
                <Image src={"/logos/businesses-logo.svg"} alt="business logos" width={56} height={56} className=" object-center w-14 h-auto  " />
                <p className="text-[11px] font-normal text-[#64748B] max-w-[238.6px] ">Join <span className="text-[#334155] font-semibold " > 12,000+</span> businesses using SmartBiz AI to
                    automate their workflows.</p>
            </div>

        </form>
    )
}