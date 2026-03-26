import { Search } from "lucide-react";
import { Button } from "../ui/CustomButton";

export default function AskSmartBizAI() {
    return (
        <div className="w-full bg-[#EB5119] rounded-[12px] p-6 flex flex-col gap-4 text-white">
            <div className="flex flex-col gap-1">
                <h3 className="font-bold text-base whitespace-nowrap">Ask SmartBiz AI</h3>
                <p className="text-xs text-orange-100 opacity-80">
                    Get instant insights and analysis for your business data.
                </p>
            </div>

            <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-200" size={16} />
                <input
                    type="text"
                    placeholder="E.g How much did I make in July?"
                    className="w-full pl-10 pr-4 py-2 bg-orange-600/30 border border-orange-400/30 rounded-lg text-sm placeholder:text-orange-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
            </div>

            <Button className="w-full bg-white! text-[#EB5119]! py-2 text-xs font-bold hover:bg-orange-50!">
                Analyze Data
            </Button>
        </div>
    );
}
