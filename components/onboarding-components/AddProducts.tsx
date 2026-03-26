import { useState, useRef } from "react";
import CustomInput from "@/components/ui/CustomInput";
import { Upload, Plus, Trash2, X } from "lucide-react";
import { ProductSchema } from "@/lib/validations/onboarding";

interface AddProductsProps {
    data: any[];
    onChange: (data: any[]) => void;
    errors?: Record<string, string>;
}

export default function AddProducts({ data, onChange, errors }: AddProductsProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentProduct, setCurrentProduct] = useState({
        name: "",
        price: "",
        category: "",
        size: "",
        stock: "1",
        image: ""
    });
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentProduct(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setCurrentProduct(prev => ({ ...prev, image: "" }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (localErrors[e.target.name]) {
            setLocalErrors(prev => {
                const updated = { ...prev };
                delete updated[e.target.name];
                return updated;
            });
        }
    };

    const handleAddProduct = () => {
        const result = ProductSchema.safeParse(currentProduct);
        if (result.success) {
            onChange([...data, { ...currentProduct }]);
            setCurrentProduct({ name: "", price: "", category: "", size: "", stock: "1", image: "" });
            if (fileInputRef.current) fileInputRef.current.value = "";
            setLocalErrors({});
        } else {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((err: any) => {
                newErrors[err.path[0]] = err.message;
            });
            setLocalErrors(newErrors);
        }
    };

    const handleRemoveProduct = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        onChange(newData);
    };

    return (
        <div className="w-full">
            <div className="w-full bg-white border border-[#E2E8F0] rounded-[16px] p-6 sm:p-8 flex flex-col gap-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-[#EB5119]">
                            {/* Orange Plus Square Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="20" height="20" rx="4" fill="#EB5119"/>
                                <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#0F172A]">Product Details</h2>
                    </div>
                    <div className="bg-[#F1F5F9] px-3 py-1 rounded-full">
                        <span className="text-xs font-bold text-[#64748B]">{data.length} items</span>
                    </div>
                </div>

                {/* Step Level Error (e.g. "At least one product required") */}
                {errors?.products && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
                        {errors.products}
                    </div>
                )}

                {/* Added Products List */}
                {data.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {data.map((prod, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                                <div className="flex items-center gap-4">
                                    {prod.image && (
                                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E2E8F0] shrink-0">
                                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold text-sm text-[#0F172A]">{prod.name}</p>
                                        <p className="text-xs text-[#64748B]">₦{prod.price} | {prod.category || 'No Category'}</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => handleRemoveProduct(idx)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Form Fields */}
                <div className="flex flex-col gap-6 w-full">
                    {/* Image Upload Area */}
                    <div className="w-full flex flex-col gap-3">
                        <span className="font-bold text-xs text-[#0F172A] uppercase">
                            Product Image
                            <span className="text-red-500 ml-1">*</span>
                        </span>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            accept="image/*" 
                            className="hidden" 
                        />
                        
                        {currentProduct.image ? (
                            <div className="relative w-full h-48 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl overflow-hidden group">
                                <img src={currentProduct.image} alt="Product preview" className="w-full h-full object-contain" />
                                <button 
                                    type="button" 
                                    onClick={removeImage}
                                    className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] rounded-[12px] py-8 px-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#F1F5F9] transition-colors"
                            >
                                <div className="text-[#0F172A]">
                                    <Upload size={20} strokeWidth={1.5} />
                                </div>
                                <p className="text-[#0F172A] text-sm font-bold">Click to upload product image</p>
                                <p className="text-[#64748B] text-xs">PNG, JPG (max 5MB)</p>
                            </div>
                        )}
                        {localErrors.image && <p className="text-xs text-red-500 mt-1">{localErrors.image}</p>}
                    </div>

                    <CustomInput 
                        label="Product Name"
                        name="name"
                        value={currentProduct.name}
                        onChange={handleChange}
                        placeholder="e.g. Wireless Headphones"
                        labelClassName="!text-[#0F172A] !capitalize !font-bold"
                        error={localErrors.name}
                        required
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <CustomInput 
                            label="Price (NGN)"
                            name="price"
                            type="number"
                            value={currentProduct.price}
                            onChange={handleChange}
                            placeholder="₦ 0.00"
                            labelClassName="!text-[#0F172A] !capitalize !font-bold"
                            error={localErrors.price}
                            required
                        />
                        <CustomInput 
                            label="Category"
                            name="category"
                            value={currentProduct.category}
                            onChange={handleChange}
                            placeholder="e.g. Electronics"
                            labelClassName="!text-[#0F172A] !capitalize !font-bold"
                            error={localErrors.category}
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <CustomInput 
                            label="Size"
                            name="size"
                            value={currentProduct.size}
                            onChange={handleChange}
                            placeholder="e.g. Medium"
                            labelClassName="!text-[#0F172A] !capitalize !font-bold"
                            error={localErrors.size}
                            required
                        />
                        <CustomInput 
                            label="Stock"
                            name="stock"
                            type="number"
                            value={currentProduct.stock}
                            onChange={handleChange}
                            placeholder="e.g. 10"
                            labelClassName="!text-[#0F172A] !capitalize !font-bold"
                            error={localErrors.stock}
                            required
                        />
                    </div>

                    <button 
                        type="button" 
                        onClick={handleAddProduct}
                        className="bg-[#0F172A] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-colors"
                    >
                        <Plus size={16} /> Add Product to Catalog
                    </button>
                </div>
            </div>
        </div>
    );
}
