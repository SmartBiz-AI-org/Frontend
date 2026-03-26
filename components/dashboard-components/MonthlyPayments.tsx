interface MonthlyPaymentsProps {
    data: {
        month: string;
        amount: number;
        color: string;
    }[]
}

export default function MonthlyPayments({ data }: MonthlyPaymentsProps) {
    const maxAmount = data.length > 0 ? Math.max(...data.map(d => d.amount)) : 0;

    return (
        <div className="w-full bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col gap-6">
            <div>
                <h3 className="text-[#0F172A] font-bold text-base">Monthly Payments</h3>
                <p className="text-xs text-[#64748B]">Transaction volume per month</p>
            </div>

            <div className="flex flex-col gap-5">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-[#1E293B]">{item.month}</span>
                                <span className="text-[#64748B]">₦{item.amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ 
                                        width: `${maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0}%`,
                                        backgroundColor: item.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-[#64748B] text-center py-4">
                        No monthly payment data available
                    </div>
                )}
            </div>
        </div>
    );
}
