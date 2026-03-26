import { Briefcase, Smile, Headset, ChevronDown, Receipt } from "lucide-react";

interface PreferencesProps {
    data: any;
    onChange: (data: any) => void;
    errors?: Record<string, string>;
}

export default function Preferences({ data, onChange, errors }: PreferencesProps) {
    const tones = [
        {
            id: 'professional',
            icon: <Briefcase size={20} className="text-[#EB5119]" />,
            title: 'Professional',
            description: 'Concise, formal, and goal-oriented communication.'
        },
        {
            id: 'friendly',
            icon: <Smile size={20} className="text-[#EB5119]" />,
            title: 'Friendly',
            description: 'Warm, casual, and approachable conversational style.'
        },
        {
            id: 'helpful',
            icon: <Headset size={20} className="text-[#EB5119]" />,
            title: 'Helpful',
            description: 'Proactive, detailed, and supportive assistance.'
        }
    ];

    return (
        <div className="w-full">
            <div className="w-full bg-white border border-[#E2E8F0] rounded-[16px] flex flex-col">
                {/* AI Voice & Tone Section */}
                <div className="p-6 sm:p-8 flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-[#0F172A] mb-1">
                            AI Voice & Tone
                            <span className="text-red-500 ml-1">*</span>
                        </h2>
                        <p className="text-[#64748B] text-sm">Select how your AI assistant should interact with your users.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tones.map((tone) => (
                            <div 
                                key={tone.id}
                                onClick={() => onChange({ aiTone: tone.id })}
                                className={`relative p-5 rounded-[12px] border cursor-pointer transition-all duration-200 flex flex-col gap-4 ${
                                    data.aiTone === tone.id 
                                        ? 'border-[#EB5119] bg-[#FFF8F5]' 
                                        : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        {tone.icon}
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                        data.aiTone === tone.id ? 'border-[#EB5119]' : 'border-[#CBD5E1]'
                                    }`}>
                                        {data.aiTone === tone.id && (
                                            <div className="w-2 h-2 rounded-full bg-[#EB5119]"></div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0F172A] text-sm mb-1">{tone.title}</h3>
                                    <p className="text-[#64748B] text-xs leading-relaxed">{tone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {errors?.aiTone && <p className="text-xs text-red-500 mt-2">{errors.aiTone}</p>}
                </div>

                <div className="w-full h-px bg-[#E2E8F0]"></div>

                {/* Language Support Section */}
                <div className="p-6 sm:p-8 flex flex-col gap-5">
                    <div>
                        <h2 className="text-xl font-bold text-[#0F172A] mb-1">
                            Language Support
                            <span className="text-red-500 ml-1">*</span>
                        </h2>
                        <p className="text-[#64748B] text-sm">Choose the primary language for your AI's outputs.</p>
                    </div>

                    <div className="relative w-full max-w-md">
                        <select 
                            value={data.language || "en-US"}
                            onChange={(e) => onChange({ language: e.target.value })}
                            className="w-full appearance-none bg-white border border-[#E2E8F0] text-[#0F172A] font-medium text-sm rounded-[10px] px-4 py-3 outline-none focus:border-[#EB5119] focus:ring-1 focus:ring-[#EB5119] transition-all cursor-pointer shadow-sm"
                        >
                            <option value="en-US">English (US) - Default</option>
                            <option value="en-UK">English (UK)</option>
                            <option value="fr">French</option>
                            <option value="es">Spanish</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[#64748B]">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                    {errors?.language && <p className="text-xs text-red-500 mt-2">{errors.language}</p>}
                </div>

                <div className="w-full h-px bg-[#E2E8F0]"></div>

                {/* Automated Invoicing Toggle Section */}
                <div className="p-6 sm:p-8">
                    <div className="w-full bg-[#FFF8F5] border border-[#FFEDDF] rounded-[16px] p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#FFE6DB] flex items-center justify-center shrink-0">
                                <Receipt size={24} className="text-[#EB5119]" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-[#0F172A] text-[15px]">Enable Automated Invoicing</h3>
                                <p className="text-[#64748B] text-sm hidden sm:block">Automatically generate and send invoices to your clients via AI.</p>
                                <p className="text-[#64748B] text-sm sm:hidden leading-snug">Auto-generate and send invoices.</p>
                            </div>
                        </div>
                        
                        {/* Toggle */}
                        <div 
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out flex items-center ${
                                data.autoInvoicing ? 'bg-[#EB5119]' : 'bg-[#E2E8F0]'
                            }`}
                            onClick={() => onChange({ autoInvoicing: !data.autoInvoicing })}
                        >
                            <div 
                                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${
                                    data.autoInvoicing ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            ></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
