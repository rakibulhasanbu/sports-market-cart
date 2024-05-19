import React from "react";
import { PageBottom, Tailwind } from "@onedoc/react-print";
import { formatDate } from "../../utils/formateDate";

const InvoicePdf = React.forwardRef<HTMLDivElement, { record?: any }>(({ record }, ref) => {
    const invoiceId = record?._id ? record._id.slice(0, 5) : '';
    return (
        <Tailwind>
            <div ref={ref} className="min-w-[30vw]">
                <div className="flex justify-between items-end pb-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Invoice #{invoiceId}</h1>
                        <p className="text-xs">{formatDate(record?.saleDate)}</p>
                    </div>
                    <h2 className="text-2xl font-bold">Sports Market</h2>
                </div>

                <div className="h-px bg-gray-300 my-4" />

                <div>
                    <p className="p-0 mb-1">
                        <b>Bayer Info:</b>
                    </p>
                    <p className="p-0 mb-1">Name: {record?.buyerName}</p>
                    <p className="p-0 mb-1">Branch: {record?.productId?.branch}</p>
                </div>

                <div className="h-px bg-gray-300 my-4" />


                <table className="w-full my-12">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="text-left font-bold py-2">Item</th>
                            <th className="text-left font-bold py-2">Product Name</th>
                            <th className="text-left font-bold py-2">Unit Price</th>
                            <th className="text-left font-bold py-2">Quantity</th>
                            <th className="text-left font-bold py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-300">
                            <td className="py-2">1</td>
                            <td className="py-2">{record?.productId?.name}</td>
                            <td className="py-2">${record?.productId?.price}</td>
                            <td className="py-2">{record?.quantity}</td>
                            <td className="py-2">${record?.productId?.price * record?.quantity}</td>
                        </tr>
                    </tbody>
                </table>

                <PageBottom>
                    <div className="h-px bg-gray-300 my-4" />
                    <div className="text-gray-400 text-sm">Invoice #{record?._id}</div>
                </PageBottom>
            </div>
        </Tailwind>
    );
});

export default InvoicePdf;
