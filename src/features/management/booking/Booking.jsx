import { Table, Button, Space } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { cn } from "../../../lib/utils";
import { X } from "lucide-react";
import { CheckOutlined } from "@ant-design/icons";

const randomNumber = Math.floor(Math.random() * 1000);
const data = [
    {
        key: 1,
        bookingId: `BK-${String(randomNumber * 5).padStart(4, "0")}`,
        serviceName: "Manicure Cleansing",
        customerName: "Thiri Shwe Sin",
        price: "35,000 MMK",
        bookedTime: "10:30 AM",
        date: "20/06/2026",
        duringTime: "1 hr 30 mins",
        staffName: "Phyu Phyu",
        status: "In Progress",
    },
    {
        key: 2,
        bookingId: `BK-${String(randomNumber * 2).padStart(4, "0")}`,
        serviceName: "Pedicure Cleansing",
        customerName: "May Phoo Ngone",
        price: "18,000 MMK",
        bookedTime: "01:00 PM",
        date: "20/06/2026",
        duringTime: "45 mins",
        staffName: "Su Su",
        status: "Completed",
    },
    {
        key: 3,
        bookingId: `BK-${String(randomNumber * 4).padStart(4, "0")}`,
        serviceName: "SNS Extension",
        customerName: "Hnin Thazin",
        price: "12,000 MMK",
        bookedTime: "03:15 PM",
        date: "21/06/2026",
        duringTime: "1 hr",
        staffName: "Aung Aung",
        status: "Reject",
    },
    {
        key: 4,
        bookingId: `BK-${String(randomNumber * 3).padStart(4, "0")}`,
        serviceName: "Cat Eye",
        customerName: "Ingyin Phyu",
        price: "25,000 MMK",
        bookedTime: "05:00 PM",
        date: "22/06/2026",
        duringTime: "1 hr 15 mins",
        staffName: "Kyaw Kyaw",
        status: "Pending",
    },
];

const Booking = () => {
    const [searchText, setSearchText] = useState("");

    const handleRejectBtn = (row) => {
        console.log("clicked reject", row.bookingId);
    };
    const handleConfirmBtn = (row) => {
        console.log("clicked confirm", row.bookingId, row.serviceName);
    };

    const columns = [
        {
            title: "No.",
            render: (_, __, index) => <p>{index + 1}</p>,
        },
        {
            title: "Booking Id",
            dataIndex: "bookingId",
            key: "bookingId",
        },
        {
            title: "Service Name",
            dataIndex: "serviceName",
            key: "serviceName",
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.customerName)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Booked Time",
            dataIndex: "bookedTime",
            key: "bookedTime",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "During Time",
            dataIndex: "duringTime",
            key: "duringTime",
        },
        {
            title: "Staff Name",
            dataIndex: "staffName",
            key: "staffName",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusClasses = {
                    Pending: "text-progress",
                    "In Progress": "text-available",
                    Completed: "text-green-600",
                    Reject: "text-unavailable",
                };
                return (
                    <p
                        className={cn(
                            "font-medium",
                            statusClasses[status] || "text-gray-500",
                        )}
                    >
                        {status}
                    </p>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space>
                    <Button
                        onClick={() => handleRejectBtn(record)}
                        className="editBtn!"
                    >
                        <X size={18} />
                    </Button>
                    <Button
                        onClick={() => handleConfirmBtn(record)}
                        className="editBtn!"
                        disabled={record.status === "In Progress"}
                    >
                        <CheckOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <SubHeaderSection setSearchText={setSearchText} title={"Booking"} />
            <div className="table-wrapper">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Booking;
