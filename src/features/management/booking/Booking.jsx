import { Table, Button, Space, Grid } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { cn } from "../../../lib/utils";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import {
    useCreateBookingMutation,
    useUpdateBookingMutation,
} from "./bookingApi";
import TableHeaderSection from "../../../components/tableHeaderSection/TableHeaderSection";

const randomNumber = Math.floor(Math.random() * 1000);
const data = [
    {
        key: 1,
        bookingId: `BK-${String(randomNumber * 5).padStart(4, "0")}`,
        serviceName: "Manicure Cleansing",
        customerName: "Thiri Shwe Sin",
        price: "35,000 MMK",
        bookedTime: "10:30 AM",
        date: "2026/06/20",
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
        date: "2026/06/20",
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
        date: "2026/06/22",
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
        date: "2026/06/28",
        duringTime: "1 hr 15 mins",
        staffName: "Kyaw Kyaw",
        status: "Pending",
    },
    {
        key: 5,
        bookingId: `BK-${String(randomNumber * 3).padStart(4, "0")}`,
        serviceName: "Cat Eye",
        customerName: "Ingyin Phyu",
        price: "25,000 MMK",
        bookedTime: "05:00 PM",
        date: "2026/06/28",
        duringTime: "1 hr 15 mins",
        staffName: "Kyaw Kyaw",
        status: "Pending",
    },
    {
        key: 6,
        bookingId: `BK-${String(randomNumber * 2).padStart(4, "0")}`,
        serviceName: "Pedicure Cleansing",
        customerName: "May Phoo Ngone",
        price: "18,000 MMK",
        bookedTime: "01:00 PM",
        date: "2026/06/20",
        duringTime: "45 mins",
        staffName: "Su Su",
        status: "Confirm",
    },
    {
        key: 7,
        bookingId: `BK-${String(randomNumber * 4).padStart(4, "0")}`,
        serviceName: "SNS Extension",
        customerName: "Hnin Thazin",
        price: "12,000 MMK",
        bookedTime: "03:15 PM",
        date: "2026/06/22",
        duringTime: "1 hr",
        staffName: "Aung Aung",
        status: "Confirm",
    },
];

const { useBreakpoint } = Grid;

const Booking = () => {
    const [searchText, setSearchText] = useState("");
    const [filterValue, setFilterValue] = useState(null); // => Status
    const [calendarFilterType, setCalendarFilterType] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);

    const screens = useBreakpoint();

    const [createBooking] = useCreateBookingMutation();
    const [updateBooking] = useUpdateBookingMutation();

    const scrollX = screens.xs ? undefined : "1500";

    const handleRejectBtn = (row) => {
        console.log("clicked reject", row.bookingId);
    };
    const handleConfirmBtn = (row) => {
        console.log("clicked confirm", row.bookingId, row.serviceName);
    };

    const handleViewBtn = (row) => {
        console.log("clicked view", row.bookingId, row.serviceName);
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
                return (
                    String(record.customerName)
                        .toLowerCase()
                        .includes(value.toLowerCase()),
                    String(record.serviceName)
                        .toLowerCase()
                        .includes(value.toLowerCase),
                    String(record.bookingId)
                        .toLowerCase()
                        .includes(value.toLowerCase)
                );
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
            filteredValue: filterValue ? [filterValue] : null,
            onFilter: (value, record) => record.status === value,
            render: (status) => {
                const statusClasses = {
                    Pending: "text-pending",
                    "In Progress": "text-progress",
                    Confirm: "text-confirm",
                    Completed: "text-completed",
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
            render: (record) => {
                // console.log(record?.status);
                return record?.status === "Pending" ? (
                    <Space size="medium">
                        <Button
                            onClick={() => handleRejectBtn(record)}
                            className="editBtn! bg-red-500! text-white! hover:bg-red-700!"
                        >
                            <CloseOutlined />
                        </Button>
                        <Button
                            onClick={() => handleConfirmBtn(record)}
                            className="editBtn! bg-green-500! text-white! hover:bg-green-700!"
                        >
                            <CheckOutlined />
                        </Button>
                    </Space>
                ) : (
                    <Button
                        className="border-primary! rounded-2xl! hover:bg-primary! hover:text-white!"
                        onClick={() => handleViewBtn(record)}
                    >
                        <EyeOutlined /> View
                    </Button>
                );
            },
        },
    ];

    // => show header list section
    const renderlists = [
        "Pending",
        "In Progress",
        "Confirm",
        "Completed",
        "Reject",
    ];

    // => show header list item length section
    const statusCounts = {
        Pending: data?.filter((item) => item.status === "Pending").length || 0,
        "In Progress":
            data?.filter((item) => item.status === "In Progress").length || 0,
        Completed:
            data?.filter((item) => item.status === "Completed").length || 0,
        Confirm: data?.filter((item) => item.status === "Confirm").length || 0,
        Reject: data?.filter((item) => item.status === "Reject").length || 0,
    };

    // select dropdown filter section
    const options = [
        { label: "Pending", value: "Pending" },
        { label: "In Progress", value: "In Progress" },
        { label: "Completed", value: "Completed" },
        { label: "Confirm", value: "Confirm" },
        { label: "Reject", value: "Reject" },
    ];

    const dateOptions = [
        { label: "Date Selector", value: "date" },
        { label: "Range Selector", value: "range" },
        { label: "Month Selector", value: "month" },
    ];

    const dateConfig = {
        calendarFilterType: calendarFilterType,
        setCalendarFilterType: (type) => {
            setCalendarFilterType(type);
            setSelectedDates(null);
        },
        selectedDates: selectedDates,
        setSelectedDates: setSelectedDates,
    };

    return (
        <div>
            <SubHeaderSection
                setSearchText={setSearchText}
                title={"Customer Bookings"}
                subTitle={
                    "Manage, track, and update all salon customer appointments."
                }
                triggerCreate={createBooking}
                triggerEdit={updateBooking}
            />
            <TableHeaderSection
                renderlists={renderlists}
                options={options}
                statusCounts={statusCounts}
                setFilterValue={setFilterValue}
                dateOptions={dateOptions}
                dateConfig={dateConfig}
            />
            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: scrollX }}
                    bordered
                />
            </div>
        </div>
    );
};

export default Booking;
