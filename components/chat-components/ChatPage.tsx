"use client";

import { useState, useCallback, useEffect } from "react";
import ChatWelcome from "./ChatWelcome";
import ChatMessageList, { type ChatMessage } from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { sendChatMessage, getChatHistory } from "@/actions/chatActions";

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            const result = await getChatHistory();
            if (result.success && result.history) {
                const formattedHistory: ChatMessage[] = result.history.map((h: any, idx: number) => ({
                    id: `history-${Date.now()}-${idx}`,
                    role: h.role,
                    content: h.content,
                    timestamp: new Date(), // using current time for loaded history
                }));
                setMessages(formattedHistory);
            }
            setIsInitialized(true);
        };
        fetchHistory();
    }, []);

    const hasMessages = messages.length > 0;

    const handleSend = useCallback(async (content: string) => {
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: "user",
            content,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const result = await sendChatMessage(content);

            const assistantMessage: ChatMessage = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: result.success
                    ? result.message
                    : "Sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                role: "assistant",
                content: "Something went wrong. Please check your connection and try again.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full min-h-0">
            {!isInitialized ? (
                <div className="flex items-center justify-center flex-1">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : hasMessages ? (
                <ChatMessageList messages={messages} isLoading={isLoading} />
            ) : (
                <ChatWelcome onQuickAction={handleSend} />
            )}
            <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
    );
}
