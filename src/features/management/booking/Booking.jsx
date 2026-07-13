import { Table, Button, Space, Grid } from "antd";
import { useCallback, useMemo, useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { cn } from "../../../lib/utils";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import {
    useCancelBookingMutation,
    useUpdateBookingMutation,
} from "./bookingApi";
import TableHeaderSection from "../../../components/tableHeaderSection/TableHeaderSection";
import ConfirmModal from "./ConfirmModal";
import OverviewModal from "./OverviewModal";
import CancelModal from "./CancelModal";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../app/core/notiSlice";
import dayjs from "dayjs";

const randomNumber = Math.floor(Math.random() * 1000);
const STATIC_DATA = [
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

const filterOptions = renderlists.map((status) => ({
    label: (
        <span className={statusClasses[status] || "text-gray-500"}>
            {status}
        </span>
    ),
    value: status,
}));

const Booking = () => {
    const [dataList, setDataList] = useState(STATIC_DATA);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewConfirmModal, setViewConfirmModal] = useState(false);
    const [viewCancelModal, setViewCancelModal] = useState(false);

    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [filterValue, setFilterValue] = useState(null);
    const [calendarFilterType, setCalendarFilterType] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const [updateBooking] = useUpdateBookingMutation();
    const [cancelBooking] = useCancelBookingMutation();

    const handleActionBtn = useCallback((action, record) => {
        setSelectedBooking(record);
        if (action === "view") {
            setIsViewModalOpen(true);
        } else if (action === "confirm") {
            setViewConfirmModal(true);
        } else {
            setViewCancelModal(true);
        }
    }, []);

    const handleConfirmBtn = async (bookingId) => {
        try {
            await updateBooking({ id: bookingId }).unwrap();
            setDataList((prev) =>
                prev.map((item) =>
                    item.key === bookingId
                        ? { ...item, status: "Confirm" }
                        : item,
                ),
            );
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Booking assigned successfully.",
                }),
            );
        } catch (error) {
            const errorMessage =
                error?.data?.message ||
                error?.error ||
                "Error while confirming";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
        }
    };

    const handleBookingStatusChange = async (bookingId, reason, actionType) => {
        try {
            await cancelBooking({ id: bookingId, reason, actionType }).unwrap();

            setDataList((prev) =>
                prev.map((item) =>
                    item.key === bookingId
                        ? { ...item, status: "Reject" }
                        : item,
                ),
            );

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Booking successfully cancelled!",
                }),
            );
        } catch (error) {
            const errorMessage =
                error?.data?.message ||
                error?.error ||
                "Failed to cancel booking";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
            console.error("Failed to cancel booking:", error);
        }
    };

    // FILTER FUNC
    const filteredData = useMemo(() => {
        return dataList.filter((item) => {
            const matchesStatus =
                !filterValue ||
                filterValue === "All" ||
                item.status === filterValue;
            if (!matchesStatus) return false;

            if (!selectedDates) return true;

            const itemDate = dayjs(item.date);

            if (calendarFilterType === "date") {
                return itemDate.isSame(selectedDates, "day");
            } else if (calendarFilterType === "range") {
                const [start, end] = selectedDates;
                if (!start) return true;
                if (!end)
                    return (
                        itemDate.isSame(start, "day") ||
                        itemDate.isAfter(start, "day")
                    );

                return (
                    (itemDate.isSame(start, "day") ||
                        itemDate.isAfter(start, "day")) &&
                    (itemDate.isSame(end, "day") ||
                        itemDate.isBefore(end, "day"))
                );
            }
            return true;
        });
    }, [dataList, filterValue, calendarFilterType, selectedDates]);

    const columns = useMemo(
        () => [
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
                    return record?.status === "Pending" ? (
                        <Space size="medium">
                            <Button
                                onClick={() =>
                                    handleActionBtn("cancel", record)
                                }
                                className="editBtn! bg-red-500! text-white! hover:bg-red-700!"
                            >
                                <CloseOutlined />
                            </Button>
                            <Button
                                onClick={() =>
                                    handleActionBtn("confirm", record)
                                }
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
        ],
        [searchText, handleActionBtn],
    );

    const statusCounts = useMemo(() => {
        return {
            All: dataList?.length,
            Pending:
                dataList?.filter((item) => item.status === "Pending").length ||
                0,
            "In Progress":
                dataList?.filter((item) => item.status === "In Progress")
                    .length || 0,
            Completed:
                dataList?.filter((item) => item.status === "Completed")
                    .length || 0,
            Confirm:
                dataList?.filter((item) => item.status === "Confirm").length ||
                0,
            Reject:
                dataList?.filter((item) => item.status === "Reject").length ||
                0,
        };
    }, [dataList]);

    const dateOptions = [
        { label: "Select Date", value: "date" },
        { label: "Date Range", value: "range" },
    ];

    const dateConfig = {
        dateOptions: dateOptions,
        calendarFilterType: calendarFilterType,
        setCalendarFilterType: (type) => {
            setCalendarFilterType(type);
            setSelectedDates(null);
        },
        selectedDates: selectedDates,
        setSelectedDates: setSelectedDates,
    };

    return (
        <>
            <SubHeaderSection
                setSearchText={setSearchText}
                title={"Customer Bookings"}
                subTitle={
                    "Manage, track, and update all salon customer appointments."
                }
                placeholderTitle="Search the all customer’s booking ..."
            />
            <TableHeaderSection
                renderlists={renderlists}
                options={filterOptions}
                statusCounts={statusCounts}
                setFilterValue={setFilterValue}
                dateOptions={dateOptions}
                dateConfig={dateConfig}
            />
            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    scroll={{ x: scrollX }}
                    bordered
                />
            </div>

            {selectedBooking && (
                <>
                    <OverviewModal
                        isViewModalOpen={isViewModalOpen}
                        setIsViewModalOpen={setIsViewModalOpen}
                        selectedBooking={selectedBooking}
                        onConfirmCancel={(id) =>
                            handleBookingStatusChange(id, "CANCEL")
                        }
                    />
                    <ConfirmModal
                        viewConfirmModal={viewConfirmModal}
                        setViewConfirmModal={setViewConfirmModal}
                        handleConfirmBtn={handleConfirmBtn}
                        selectedBooking={selectedBooking}
                    />
                    <CancelModal
                        selectedBooking={selectedBooking}
                        viewCancelModal={viewCancelModal}
                        setViewCancelModal={setViewCancelModal}
                        onConfirmReject={(id, reason) =>
                            handleBookingStatusChange(id, reason, "REJECT")
                        }
                    />
                </>
            )}
        </>
    );
};

export default Booking;
