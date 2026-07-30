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

const RENDER_LISTS = [
    "All",
    "Pending",
    "In Progress",
    "Confirm",
    "Completed",
    "Reject",
];

const STATUS_CLASSES = {
    "In Progress": "text-progress",
    Pending: "text-pending",
    Confirm: "text-confirm",
    Completed: "text-completed",
    Available: "text-available",
    Unavailable: "text-unavailable",
    Reject: "text-unavailable",
};

const Booking = () => {
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : 1500;

    const [searchText, setSearchText] = useState("");
    const [filterValue, setFilterValue] = useState("All");
    const [selectedDates, setSelectedDates] = useState([
        dayjs().subtract(6, "day"),
        dayjs(),
    ]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewConfirmModal, setViewConfirmModal] = useState(false);
    const [viewCancelModal, setViewCancelModal] = useState(false);

    const debouncedSearchText = useDebounce(searchText, 300);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Reset to page 1 on filter/search change
    const handleFilterChange = (value) => {
        setFilterValue(value || "All");
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    const handleDateChange = (dates) => {
        setSelectedDates(dates);
        setCurrentPage(1);
    };

    // Dynamic Options with Active Styling
    const filterOptions = useMemo(() => {
        return RENDER_LISTS.map((status) => {
            const isActive = filterValue === status;

            return {
                label: (
                    <span
                        className={cn(
                            STATUS_CLASSES[status] || "text-gray-500",
                            "transition-all duration-200 cursor-pointer inline-block",
                            isActive && "font-bold",
                        )}
                    >
                        {status}
                    </span>
                ),
                value: status,
            };
        });
    }, [filterValue]);

    // Dynamic Parameters for RTK Query
    const startDate = selectedDates?.[0]
        ? dayjs(selectedDates[0]).format("YYYY-MM-DD")
        : undefined;

    // Fallback to today if end date isn't explicitly defined
    const endDate = selectedDates?.[1]
        ? dayjs(selectedDates[1]).format("YYYY-MM-DD")
        : undefined;

    // Map status filter parameter for API request
    const statusParam =
        !filterValue || filterValue === "All" ? undefined : filterValue;

    // Fetch Data
    const { data: apiResponse, isLoading } = useGetAllBookingQuery({
        status: statusParam,
        startDate,
        endDate,
        page: currentPage - 1,
        size: 10,
        search: debouncedSearchText ? debouncedSearchText.trim() : undefined,
    });

    const bookingsData = apiResponse?.bookings;
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

    // Sorted Data
    const sortedData = useMemo(() => {
        const list = Array.isArray(bookingsData) ? bookingsData : [];
        return list;
    }, [bookingsData]);

    // Status Counting Pills
    const statusCounts = useMemo(() => {
        const calculatedTotal =
            (apiResponse?.pendingCount || 0) +
            (apiResponse?.inProgressCount || 0) +
            (apiResponse?.confirmCount || 0) +
            (apiResponse?.completedCount || 0) +
            (apiResponse?.rejectedCount || 0);

        const AllTotal =
            apiResponse?.totalCount ?? apiResponse?.total ?? calculatedTotal;

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
                render: (val, record) => val || record.id || "-",
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
                render: (price) =>
                    price !== undefined && price !== null ? (
                        <p>
                            {Number(price).toLocaleString()}{" "}
                            <small className="text-gray-500">MMK</small>
                        </p>
                    ) : (
                        <p>-</p>
                    ),
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
                render: (date) =>
                    date ? (
                        <p>{dayjs(date).format("DD . MMM . YYYY")}</p>
                    ) : (
                        <p>-</p>
                    ),
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
                render: (name) => name || "-",
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status) => (
                    <p
                        className={cn(
                            "font-medium",
                            STATUS_CLASSES[status] || "text-gray-500",
                        )}
                    >
                        {status}
                    </p>
                ),
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => {
                    return record?.status === "Pending" ? (
                        <Space size="middle">
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
        setSelectedDates: handleDateChange,
    };

    return (
        <>
            <SubHeaderSection
                setSearchText={handleSearchChange}
                title={"Customer Bookings"}
                subTitle={
                    "Manage, track, and update all salon customer appointments."
                }
                placeholderTitle="Search by ID, name, or service..."
            />
            <TableHeaderSection
                renderlists={RENDER_LISTS}
                options={filterOptions}
                filterValue={filterValue}
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
                    rowKey={(record) => record.id || record.bookingId}
                    bordered
                    pagination={{
                        current: currentPage,
                        onChange: handlePageChange,
                        size: "large",
                        total:
                            apiResponse?.totalElements ??
                            apiResponse?.totalCount ??
                            apiResponse?.total ??
                            0,
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
                        onConfirmCancel={(id, reason) =>
                            handleBookingStatusChange(id, reason, "reject")
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
