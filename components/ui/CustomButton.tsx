import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  const base =
    "px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 ease-in-out cursor-pointer ";

  const variants = {
    primary:
      "bg-[#EB5119] text-white shadow-[0px_2px_4px_-2px_#EB511933,0px_4px_6px_-1px_#EB511933] hover:bg-orange-600 hover:rounded-[100px] active:scale-95",
    secondary:
      "bg-white text-[#334155] border border-[#E2E8F0]  ",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
