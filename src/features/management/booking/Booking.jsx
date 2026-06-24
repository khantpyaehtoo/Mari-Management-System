import {
    Table,
    Button,
    Space,
    Grid,
    Modal,
    Typography,
    Flex,
    Input,
} from "antd";
import { useMemo, useState } from "react";
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

const renderlists = [
    "All",
    "Pending",
    "In Progress",
    "Confirm",
    "Completed",
    "Reject",
];
const statusClasses = {
    "In Progress": "text-progress",
    Pending: "text-pending",
    Confirm: "text-confirm",
    Completed: "text-completed",
    Available: "text-available",
    Unavailable: "text-unavailable",
    Reject: "text-unavailable",
};
// select dropdown filter section
const options = renderlists.map((status) => ({
    label: (
        <span className={statusClasses[status] || "text-gray-500"}>
            {status}
        </span>
    ),
    value: status,
}));

const Booking = () => {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewConfirmModal, setViewConfirmModal] = useState(false);
    const [viewCancelModal, setViewCancelModal] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [filterValue, setFilterValue] = useState(null); // => Status
    const [calendarFilterType, setCalendarFilterType] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);

    const screens = useBreakpoint();

    const [createBooking] = useCreateBookingMutation();
    const [updateBooking] = useUpdateBookingMutation();

    const scrollX = screens.xs ? undefined : "1500";

    const handleActionBtn = (action, record) => {
        setSelectedBooking(record);
        console.log("clicked view", record.bookingId, record.serviceName);
        if (action === "view") {
            setIsViewModalOpen(true);
        } else if (action === "confirm") {
            setViewConfirmModal(true);
        } else {
            setViewCancelModal(true);
        }
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
                        .includes(value.toLowerCase()) ||
                    String(record.serviceName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.bookingId)
                        .toLowerCase()
                        .includes(value.toLowerCase())
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
                            onClick={() => handleActionBtn("cancel", record)}
                            className="editBtn! bg-red-500! text-white! hover:bg-red-700!"
                        >
                            <CloseOutlined />
                        </Button>
                        <Button
                            onClick={() => handleActionBtn("confirm", record)}
                            className="editBtn! bg-green-500! text-white! hover:bg-green-700!"
                        >
                            <CheckOutlined />
                        </Button>
                    </Space>
                ) : (
                    <Button
                        className="border-primary! rounded-2xl! hover:bg-primary! hover:text-white!"
                        onClick={() => handleActionBtn("view", record)}
                    >
                        <EyeOutlined /> View
                    </Button>
                );
            },
        },
    ];

    // => show header list item length section
    const statusCounts = useMemo(() => {
        return {
            All: data?.length,
            Pending:
                data?.filter((item) => item.status === "Pending").length || 0,
            "In Progress":
                data?.filter((item) => item.status === "In Progress").length ||
                0,
            Completed:
                data?.filter((item) => item.status === "Completed").length || 0,
            Confirm:
                data?.filter((item) => item.status === "Confirm").length || 0,
            Reject:
                data?.filter((item) => item.status === "Reject").length || 0,
        };
    }, []);

    const dateOptions = [
        { label: "Select Date", value: "date" },
        { label: "Date Range", value: "range" },
        { label: "Select Month", value: "month" },
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

            {selectedBooking && (
                <>
                    {/* view modal */}
                    <Modal
                        title={
                            <h1>Booking Overview {selectedBooking.status}</h1>
                        }
                        open={isViewModalOpen}
                        onCancel={() => setIsViewModalOpen(false)}
                        footer={null}
                    >
                        <div className="w-full">
                            <Space vertical className="w-full py-4">
                                <p>
                                    <span className="font-semibold">
                                        Booking ID :
                                    </span>{" "}
                                    {selectedBooking.bookingId}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Customer Name :
                                    </span>{" "}
                                    {selectedBooking.customerName}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Phone :
                                    </span>{" "}
                                    {selectedBooking.phone}
                                </p>
                            </Space>
                            <div className="w-full border-gray-400! border p-4 rounded-xl">
                                <Typography.Title
                                    level={3}
                                    className="font-montserrat! font-medium! text-primary!"
                                >
                                    Appointment Details
                                </Typography.Title>
                                <ul className="border-b border-b-gray-400 px-7 pb-4 flex flex-col list-disc marker:text-primary marker:text-2xl">
                                    <li>
                                        {selectedBooking.date}.{" "}
                                        {selectedBooking.bookedTime}
                                    </li>
                                    <li>{selectedBooking.staffName}</li>
                                    <li>
                                        {selectedBooking.serviceName} (
                                        {selectedBooking.duringTime})
                                    </li>
                                </ul>
                                <Flex
                                    justify="space-between"
                                    className="p-3! font-semibold!"
                                >
                                    <h3>Total Charges</h3>
                                    <h3>{selectedBooking.price}</h3>
                                </Flex>
                            </div>
                            {selectedBooking.status === "In Progress" && (
                                <h2 className="text-xl font-medium text-red-600 text-center p-7">
                                    You can’t cancel this booking.
                                </h2>
                            )}
                            {selectedBooking.status === "Completed" && (
                                <h2 className="text-xl font-medium text-green-600 text-center p-7">
                                    Booking completed successfully.
                                </h2>
                            )}
                            {selectedBooking.status === "Reject" && (
                                <h2 className="text-xl font-medium text-red-600 text-center p-7">
                                    Booking Rejected.
                                </h2>
                            )}
                            {selectedBooking.status === "Confirm" && (
                                <div className="flex justify-center my-6">
                                    <Button className="w-full! h-10! bg-red-600! text-gray-200! rounded-lg! hover:shadow-md! hover:bg-red-800!">
                                        Cancel Booking
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Modal>

                    {/* confirm modal */}
                    <Modal
                        title={
                            <h1 className="text-xl text-primary">
                                Confirm Booking?
                            </h1>
                        }
                        open={viewConfirmModal}
                        onCancel={() => setViewConfirmModal(false)}
                        footer={null}
                    >
                        <Typography.Title
                            level={5}
                            className="font-medium! font-montserrat! my-10!"
                        >
                            Are you sure you want to confirm this booking?
                        </Typography.Title>
                        <Space size={13}>
                            <Button
                                className="bg-red-500! h-10! px-10! rounded-xl! text-white! hover:bg-red-800!"
                                onClick={() => setViewConfirmModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button className="bg-green-500! h-10! px-10! rounded-xl! text-white! hover:bg-green-800!">
                                Confirm
                            </Button>
                        </Space>
                    </Modal>

                    {/* cancel modal */}
                    <Modal
                        title={
                            <h1 className="text-xl text-primary">
                                Cancel Booking?
                            </h1>
                        }
                        open={viewCancelModal}
                        onCancel={() => setViewCancelModal(false)}
                        footer={null}
                    >
                        <Typography.Title
                            level={5}
                            className="font-medium! font-montserrat!"
                        >
                            Are you sure you want to reject this booking?
                        </Typography.Title>
                        <Input.TextArea
                            rows={4}
                            className=" border! border-gray-300! rounded-xl! my-8! p-3!"
                            placeholder="Enter reason for rejection…"
                        />
                        <Space size={13}>
                            <Button
                                className="bg-red-500! h-10! px-10! rounded-xl! text-white! hover:bg-red-800!"
                                onClick={() => setViewCancelModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button className="bg-green-500! h-10! px-10! rounded-xl! text-white! hover:bg-green-800!">
                                Confirm
                            </Button>
                        </Space>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Booking;
