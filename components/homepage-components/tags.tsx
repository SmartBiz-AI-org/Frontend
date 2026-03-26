import React from "react"

interface TagsProps {
  icon: React.ReactNode
  text: string
  className?: string
}

export default function Tags({ icon, text, className = "" }: TagsProps) {
  return (
    <div
      className={`w-fit rounded-[8px] flex items-center justify-center gap-2
      text-[#383838] text-sm font-medium
      shadow-[0px_0px_0px_1px_#EBEBEB,0px_1px_3px_0px_#8F8F8F33]
      py-1.5 px-4 ${className}`}
    >
      {icon}
      {text}
    </div>
  )
}