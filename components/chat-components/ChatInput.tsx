"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, Zap } from "lucide-react";

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function handleSubmit() {
        const trimmed = value.trim();
        if (!trimmed || isLoading) return;
        onSend(trimmed);
        setValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }, [value]);

    return (
        <div className="shrink-0 w-full bg-linear-to-t from-[#FFF5F0] to-white pt-4 pb-3 px-4 md:px-8">
            {/* Input Row */}
            <div className="w-full max-w-3xl mx-auto flex items-end gap-3 bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 shadow-sm">
                <button
                    type="button"
                    className="text-[#94A3B8] hover:text-[#64748B] transition-colors shrink-0 pb-0.5"
                    aria-label="Voice input"
                >
                    <Mic size={20} />
                </button>

                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask SmartBiz AI anything..."
                    rows={1}
                    className="flex-1 resize-none border-0 outline-0 text-sm text-[#0F172A] placeholder:text-[#94A3B8] bg-transparent leading-relaxed"
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!value.trim() || isLoading}
                    className="w-9 h-9 bg-[#EB5119] rounded-full flex items-center justify-center shrink-0 hover:bg-[#D4410F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <Send size={16} className="text-white" />
                </button>
            </div>

            {/* Status Footer */}
            <div className="flex items-center justify-center gap-6 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] uppercase tracking-wider font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    AI Models Ready
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] uppercase tracking-wider font-medium">
                    <Zap size={12} className="text-[#F59E0B]" />
                    Ultra Fast Response
                </div>
            </div>
        </div>
    );
}
