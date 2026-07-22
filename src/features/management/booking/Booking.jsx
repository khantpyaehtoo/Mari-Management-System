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
import dayjs from "dayjs";
import { useDebounce } from "../../../lib/hooks/useDebounce";
import { setMessage } from "../../../app/core/notifications/notiSlice";

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
    const [currentPage, setCurrentPage] = useState(1);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewConfirmModal, setViewConfirmModal] = useState(false);
    const [viewCancelModal, setViewCancelModal] = useState(false);

    const debouncedSearchText = useDebounce(searchText, 300);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // jump into page 1
    const handleFilterChange = (value) => {
        setFilterValue(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearchText(value);
        setCurrentPage(1);
    };

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
        page: currentPage - 1,
        size: 10,
        search: debouncedSearchText ? debouncedSearchText.trim() : undefined,
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

    const handleBookingStatusChange = async (id, reason, actionType, token) => {
        try {
            await updateBooking({ id, reason, actionType, token }).unwrap();
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

    const sortedData = useMemo(() => {
        const rawData = Array.isArray(bookingsdata) ? bookingsdata : [];

        return [...rawData].sort((a, b) => {
            const timeA = a.bookTime || a.startTime || "";
            const timeB = b.bookTime || b.startTime || "";

            const dateTimeA = dayjs(`${a.date} ${timeA}`);
            const dateTimeB = dayjs(`${b.date} ${timeB}`);

            return dateTimeB.valueOf() - dateTimeA.valueOf();
        });
    }, [bookingsdata]);

    // Local Search Text Filter

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
                render: (_, __, index) => (
                    <p>{(currentPage - 1) * 10 + index + 1}</p>
                ),
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
                render: (date) => {
                    return (
                        date && <p>{dayjs(date).format("DD . MMM . YYYY")}</p>
                    );
                },
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
        [handleActionBtn, currentPage],
    );

    const dateConfig = {
        selectedDates: selectedDates,
        setSelectedDates: setSelectedDates,
    };

    return (
        <>
            <SubHeaderSection
                setSearchText={handleSearchChange}
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
                setFilterValue={handleFilterChange}
                dateConfig={dateConfig}
            />
            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={sortedData}
                    scroll={{ x: scrollX }}
                    loading={isLoading}
                    rowKey="id"
                    bordered
                    pagination={{
                        current: currentPage,
                        onChange: handlePageChange,
                        size: "large",
                        total: statusCounts[filterValue] || 0,
                        pageSize: 10,
                        showSizeChanger: false,
                    }}
                />
            </div>

            {selectedBooking && (
                <>
                    <OverviewModal
                        isViewModalOpen={isViewModalOpen}
                        setIsViewModalOpen={setIsViewModalOpen}
                        selectedBooking={selectedBooking}
                        onConfirmCancel={(id, reason, token) =>
                            handleBookingStatusChange(
                                id,
                                reason,
                                "cancel",
                                token,
                            )
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
