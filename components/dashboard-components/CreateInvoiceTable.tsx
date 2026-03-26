import { PlusCircle, Trash2 } from "lucide-react";

export type InvoiceItem = {
    productId?: string;
    description: string;
    details: string;
    quantity: number;
    rate: number;
};

interface CreateInvoiceTableProps {
    items: InvoiceItem[];
    setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
    products?: any[];
}

export default function CreateInvoiceTable({ items, setItems, products = [] }: CreateInvoiceTableProps) {
    const handleChange = <K extends keyof InvoiceItem>(
        index: number,
        field: K,
        value: InvoiceItem[K]
    ) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([
            ...items,
            { description: "", details: "", quantity: 1, rate: 0 },
        ]);
    };

    const removeItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const calculateAmount = (item: InvoiceItem) =>
        item.quantity * item.rate;

    return (
        <div className="overflow-x-auto w-full bg-white rounded-2xl overflow-hidden">
            <table className="w-full text-left border">
                <thead>
                    <tr className="bg-[#F8FAFC] border border-[#E2E8F0]">
                        <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">
                            DESCRIPTION
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">
                            QUANTITY
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">
                            RATE
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">
                            AMOUNT
                        </th>
                        <th />
                    </tr>
                </thead>

                <tbody className="divide-y divide-[#E2E8F0]">
                    {items.map((item, index) => (
                        <tr key={index} className="hover:bg-[#F8FAFC]">
                            {/* Description */}
                            <td className="px-6 py-4">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Item title"
                                        value={item.description}
                                        onChange={(e) =>
                                            handleChange(index, "description", e.target.value)
                                        }
                                        className="w-full text-[#0F172A] text-sm font-medium outline-none"
                                    />
                                    {/* Product Suggestion Dropdown */}
                                    {item.description && !item.productId && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E2E8F0] rounded-md shadow-lg hidden group-focus-within:block max-h-48 overflow-y-auto">
                                            {products
                                                .filter(p => 
                                                    p.name.toLowerCase().includes(item.description.toLowerCase()) && 
                                                    !items.some(existingItem => existingItem.productId === p.id)
                                                )
                                                .map(p => (
                                                    <button
                                                        key={p.id}
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedItems = [...items];
                                                            updatedItems[index] = {
                                                                ...updatedItems[index],
                                                                productId: p.id,
                                                                description: p.name,
                                                                details: p.description || "",
                                                                rate: p.price
                                                            };
                                                            setItems(updatedItems);
                                                        }}
                                                        className="w-full px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] flex flex-col gap-0.5"
                                                    >
                                                        <span className="font-medium text-[#0F172A]">{p.name}</span>
                                                        <span className="text-xs text-[#64748B]">₦{p.price.toLocaleString()} • Stock: {p.stock}</span>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Details"
                                    value={item.details}
                                    onChange={(e) =>
                                        handleChange(index, "details", e.target.value)
                                    }
                                    className="w-full text-xs text-[#94A3B8] font-normal outline-none"
                                />
                                {item.productId && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-[#EB5119] font-medium uppercase">Linked to Product</span>
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                const updatedItems = [...items];
                                                updatedItems[index] = { ...updatedItems[index], productId: undefined, description: "" };
                                                setItems(updatedItems);
                                            }}
                                            className="text-[10px] text-gray-400 hover:text-red-500 underline cursor-pointer"
                                        >
                                            Change
                                        </button>
                                    </div>
                                )}
                            </td>

                            {/* Quantity */}
                            <td className="px-6 py-4">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleChange(index, "quantity", Number(e.target.value))
                                    }
                                    className="w-20 border rounded px-2 py-1 text-sm font-normal text-[#0F172A] "
                                />
                            </td>

                            {/* Rate */}
                            <td className="px-6 py-4">
                                <input
                                    readOnly
                                    type="number"
                                    value={item.rate}
                                    className="w-28 border rounded px-2 py-1 text-sm font-normal text-[#0F172A] bg-[#F8FAFC] cursor-not-allowed"
                                />
                            </td>

                            {/* Amount */}
                            <td className="px-6 py-4 text-sm font-semibold text-[#0F172A]">
                                ₦{calculateAmount(item).toLocaleString()}
                            </td>

                            {/* Delete */}
                            <td className="px-6 py-4">
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}>
                                    <Trash2 size={16} className="text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan={5} className="px-6 py-4">
                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center gap-2 text-[#EB5119] font-semibold text-sm"
                            >
                                <PlusCircle size={15} />
                                Add item
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
