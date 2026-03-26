import { useRef } from "react";
import CustomInput from "@/components/ui/CustomInput";

interface BusinessProfileProps {
    data: any;
    onChange: (data: any) => void;
    errors?: Record<string, string>;
}

export default function BusinessProfile({ data, onChange, errors }: BusinessProfileProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange({ [e.target.name]: e.target.value });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onChange({ logoUrl: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-[32px] font-bold text-[#0F172A] tracking-tight">Business Profile</h2>
                <p className="text-[#64748B] text-base leading-relaxed">
                    Tell us about your company to tailor our AI models to your industry and brand voice.
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full">
                {/* Logo Upload - Out of scope for MVP functionality but kept visual */}
                <div className="flex flex-col gap-2 w-full">
                    <span className="font-bold text-xs text-[#0F172A] uppercase">Company Logo</span>
                    <div className="w-full border border-dashed border-[#CBD5E1] rounded-2xl p-6 flex items-center gap-6 bg-white">
                        <div className="w-[72px] h-[72px] rounded-full bg-[#EAAA79] flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm border border-[#E2E8F0]">
                            {data.logoUrl ? (
                                <img src={data.logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white text-xl font-bold">{data?.businessName?.[0]?.toUpperCase() || "B"}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-[#0F172A] font-bold text-base">Upload your logo</h3>
                                <p className="text-[#64748B] text-sm">Recommended: PNG, JPG (max 5MB)</p>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleLogoChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            <button 
                                type="button" 
                                onClick={triggerFileInput}
                                className="w-fit bg-[#0F172A] text-white text-sm font-bold py-2 px-5 rounded-lg hover:bg-[#1E293B] transition-colors"
                            >
                                Choose File
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-5 w-full">
                    <CustomInput
                        label="BUSINESS NAME"
                        name="businessName"
                        value={data.businessName || ""}
                        onChange={handleChange}
                        placeholder="e.g. Acme Corporation"
                        labelClassName="!text-[#0F172A]"
                        error={errors?.businessName}
                        required
                    />

                    <CustomInput
                        label="NATIONAL ID"
                        name="nationalId"
                        value={data.nationalId || ""}
                        onChange={handleChange}
                        placeholder="e.g. XXXXXXXXXX"
                        labelClassName="!text-[#0F172A]"
                        error={errors?.nationalId}
                        required
                    />

                    <CustomInput
                        label="CAC REGISTRATION NUMBER"
                        name="cacRegistration"
                        value={data.cacRegistration || ""}
                        onChange={handleChange}
                        placeholder="e.g. XXXXXXXXXX"
                        labelClassName="!text-[#0F172A]"
                        error={errors?.cacRegistration}
                        required
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                        <span className="font-bold text-xs text-[#0F172A] uppercase">
                            Business Description
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                        <textarea
                            name="description"
                            value={data.description || ""}
                            onChange={handleChange}
                            className={`w-full min-h-[140px] bg-white border ${errors?.description ? 'border-red-500' : 'border-[#E2E8F0]'} rounded-[12px] py-3.5 px-4 text-base focus:ring-1 focus:ring-[#EB5119] outline-none resize-none placeholder:text-[#94A3B8]`}
                            placeholder="Briefly describe what your company does..."
                        />
                        {errors?.description && <span className="text-xs text-red-500 mt-1">{errors.description}</span>}
                        <span className="text-xs text-[#64748B] mt-0.5">
                            This helps our AI understand your unique value proposition.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
