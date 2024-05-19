import { useRef, useState } from "react";
import AppTable from "../components/ui/AppTable";
import { User } from "../types/common";
import { useGetUserSalesHistoryQuery } from "../redux/features/sales/saleApi";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formateDate";
import InvoicePdf from "../components/orders/InvoicePdf";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ManageUserSales = () => {
    const [_page, setPage] = useState(1);

    const { id } = useParams();

    const infoQuery = useGetUserSalesHistoryQuery(id);

    const componentRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const input = componentRef.current;
        if (input) {
            html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                });

                const imgWidth = 210;
                const pageHeight = 295;
                const margin = 10;
                const imgHeight = (canvas.height * imgWidth) / canvas.width - 2 * margin;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', margin, position + margin, imgWidth - 2 * margin, imgHeight);
                heightLeft -= pageHeight - 2 * margin;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', margin, position + margin, imgWidth - 2 * margin, imgHeight);
                    heightLeft -= pageHeight - 2 * margin;
                }

                pdf.save(`invoice-download.pdf`);
            });
        }
    };

    const columns = [
        {
            title: 'Buyer Name',
            dataIndex: 'buyerName',
            className: "min-w-[150px]",
            render: (name: string) => {
                return (
                    <div className='flex items-center gap-1'>
                        <p className="cursor-pointer">{name}</p>
                    </div>
                )
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            className: "min-w-[150px]",
        },
        {
            title: 'Product Name',
            dataIndex: 'userId?.name',
            className: "min-w-[150px]",
            render: (_name: string, record: any) => {
                return (
                    <div>{record?.productId?.name}</div>
                )
            }
        },
        {
            title: 'Branch Name',
            dataIndex: 'userId?.name',
            className: "min-w-[150px]",
            render: (_name: string, record: any) => {
                return (
                    <div>{record?.productId?.branch}</div>
                )
            }
        },
        {
            title: 'Seller Name',
            dataIndex: 'userId?.name',
            className: "min-w-[150px]",
            render: (_name: string, record: any) => {
                return (
                    <div>{record?.userId?.name}</div>
                )
            }
        },
        {
            title: 'Sale Date',
            dataIndex: 'saleDate',
            className: "min-w-[145px]",
            render: (date: string) => {
                return (
                    <div className=''>
                        {formatDate(date)}
                    </div>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            className: "min-w-[145px]",
            render: (_text: string, record: User) => {
                return (
                    <div className=''>
                        <button onClick={downloadPDF} className="text-xs text-gray-700 px-4 py-1 rounded-full bg-gray-200">Download Invoice</button>
                        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                            <div ref={componentRef}>
                                <InvoicePdf record={record} />
                            </div>
                        </div>
                    </div>
                )
            }
        },
    ];




    return (
        <AppTable
            columns={columns}
            infoQuery={infoQuery}
            setPage={setPage}
            headerText="Orders List"
        />
    );
};

export default ManageUserSales;