"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    labelClassName?: string;
}

export default function CustomInput({
    label,
    error,
    type,
    className,
    labelClassName,
    ...props
}: CustomInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <label htmlFor={props.id} className="w-full flex flex-col gap-1">
            <span className={`font-bold text-xs text-[#64748B] ${labelClassName || ''}`}>
                {label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
            </span>

            <div className="relative w-full">
                <input
                    className={`w-full bg-white border border-[#E2E8F0] rounded-[12px]
          py-2.5 px-4 pr-10 text-base focus:ring-1 focus:ring-[#EB5119] outline-none ${className || ''}`}

                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    {...props}
                />

                {/* Toggle button */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 cursor-pointer "
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </label>
    );
}