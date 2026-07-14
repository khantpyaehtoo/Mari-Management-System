import { Table, Button, Space, Grid } from "antd";
import { useCallback, useMemo, useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { cn } from "../../../lib/utils";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { useGetAllBookingQuery, useUpdateBookingMutation } from "./bookingApi";
import TableHeaderSection from "../../../components/tableHeaderSection/TableHeaderSection";
import ConfirmModal from "./ConfirmModal";
import OverviewModal from "./OverviewModal";
import CancelModal from "./CancelModal";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../app/core/notiSlice";
import dayjs from "dayjs";

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
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    // State Handlers
    const [searchText, setSearchText] = useState("");
    const [filterValue, setFilterValue] = useState("All");
    const [selectedDates, setSelectedDates] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewConfirmModal, setViewConfirmModal] = useState(false);
    const [viewCancelModal, setViewCancelModal] = useState(false);

    // Dynamic Parameters for RTK Query
    const startDate = selectedDates?.[0]
        ? dayjs(selectedDates[0]).format("YYYY-MM-DD")
        : undefined;
    const endDate = selectedDates?.[1]
        ? dayjs(selectedDates[1]).format("YYYY-MM-DD")
        : undefined;
    const statusParam =
        !filterValue || filterValue === "All"
            ? undefined
            : String(filterValue).toLowerCase();

    // Fetch Data
    const { data: apiResponse, isLoading } = useGetAllBookingQuery({
        status: statusParam,
        startDate,
        endDate,
    });
    const bookingsdata = apiResponse?.bookings;
    const [updateBooking] = useUpdateBookingMutation();

    // Action Handlers
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

    const handleBookingStatusChange = async (id, reason, actionType) => {
        console.log(id);
        try {
            await updateBooking({ id, reason, actionType }).unwrap();
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Booking updated successfully!",
                }),
            );
        } catch (error) {
            const errorMessage =
                error?.data?.message ||
                error?.error ||
                "Failed to update booking";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
            console.error("Failed to update booking:", error);
        }
    };

    // Local Search Text Filter
    const finalTableData = useMemo(() => {
        // Guard clause: Always ensure bookings is an array before filtering
        const safeBookings = Array.isArray(bookingsdata) ? bookingsdata : [];

        if (!searchText) return safeBookings;

        return safeBookings.filter((item) => {
            return (
                String(item?.customerName || "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                String(item?.serviceName || "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                String(item?.bookingId || "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
        });
    }, [bookingsdata, searchText]);

    // Status Counting Pills
    const statusCounts = useMemo(() => {
        const AllTotal =
            (apiResponse?.pendingCount || 0) +
            (apiResponse?.inProgressCount || 0) +
            (apiResponse?.confirmCount || 0) +
            (apiResponse?.completedCount || 0) +
            (apiResponse?.rejectedCount || 0);

        return {
            All: AllTotal,
            Pending: apiResponse?.pendingCount || 0,
            "In Progress": apiResponse?.inProgressCount || 0,
            Completed: apiResponse?.completedCount || 0,
            Confirm: apiResponse?.confirmCount || 0,
            Reject: apiResponse?.rejectedCount || 0,
        };
    }, [apiResponse]);

    // Table Column Configuration
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
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
            },
            {
                title: "Booked Time",
                dataIndex: "bookTime",
                key: "bookTime",
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
        [handleActionBtn],
    );

    const dateConfig = {
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
                placeholderTitle="Search all customer bookings..."
            />
            <TableHeaderSection
                renderlists={renderlists}
                options={filterOptions}
                statusCounts={statusCounts}
                setFilterValue={setFilterValue}
                dateConfig={dateConfig}
            />
            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={finalTableData}
                    scroll={{ x: scrollX }}
                    loading={isLoading}
                    rowKey="bookingId"
                    bordered
                />
            </div>

            {selectedBooking && (
                <>
                    <OverviewModal
                        isViewModalOpen={isViewModalOpen}
                        setIsViewModalOpen={setIsViewModalOpen}
                        selectedBooking={selectedBooking}
                        onConfirmCancel={(id, reason) =>
                            handleBookingStatusChange(id, reason, "cancel")
                        }
                    />
                    <ConfirmModal
                        viewConfirmModal={viewConfirmModal}
                        setViewConfirmModal={setViewConfirmModal}
                        handleConfirmBtn={(id) =>
                            handleBookingStatusChange(id, "", "confirm")
                        }
                        selectedBooking={selectedBooking}
                    />
                    <CancelModal
                        selectedBooking={selectedBooking}
                        viewCancelModal={viewCancelModal}
                        setViewCancelModal={setViewCancelModal}
                        onConfirmReject={(id, reason) =>
                            handleBookingStatusChange(id, reason, "reject")
                        }
                    />
                </>
            )}
        </>
    );
};

export default Booking;
