import { Grid, Table, Button, Image } from "antd";
import { useCallback, useMemo, useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import UserDetailModal from "./UserDetailModal";
import { useDispatch } from "react-redux";
import {
    useBlockUserMutation,
    useUnblockUserMutation,
    useGetAllUserDataQuery,
    useGetBlockUserDataQuery,
} from "./userApi";
import CustomerSummaryCard from "./CustomerSummaryCard";
import { useDebounce } from "../../../lib/hooks/useDebounce";
import { setMessage } from "../../../app/core/notifications/notiSlice";
import { getImageUrl } from "../../../app/core/functions/getImageUrl";

const { useBreakpoint } = Grid;

const User = () => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [filteredValue, setFilteredValue] = useState("All");

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : 1500;

    const [blockCustomer] = useBlockUserMutation();
    const [unblockCustomer] = useUnblockUserMutation();

    const { data: getBlockUserData, isLoading: isBlockedLoading } =
        useGetBlockUserDataQuery(undefined, {
            skip: filteredValue !== "Blocked",
        });

    const debouncedSearchText = useDebounce(searchText, 300);

    const { data: getAllUser, isLoading: isAllLoading } =
        useGetAllUserDataQuery(
            {
                page: currentPage - 1,
                size: 10,
                search: debouncedSearchText
                    ? debouncedSearchText.trim()
                    : undefined,
            },
            { skip: filteredValue === "Blocked" },
        );

    const isBlockedView = filteredValue === "Blocked";

    const currentTableData = useMemo(() => {
        if (isBlockedView) {
            return (
                getBlockUserData?.content ||
                getBlockUserData?.data?.content ||
                (Array.isArray(getBlockUserData) ? getBlockUserData : [])
            );
        }

        const allUsers =
            getAllUser?.content ||
            getAllUser?.data?.content ||
            (Array.isArray(getAllUser) ? getAllUser : []);

        return allUsers.filter(
            (user) =>
                user.status !== "BLOCKED" &&
                user.status !== "blocked" &&
                !user.isBlocked,
        );
    }, [isBlockedView, getBlockUserData, getAllUser]);

    const isTableLoading = isBlockedView ? isBlockedLoading : isAllLoading;

    const handleViewDetail = useCallback((record) => {
        setSelectedCustomer(record);
        setViewModalOpen(true);
    }, []);

    const handleUserAction = async (userId, actionType) => {
        const isUnblock = actionType === "unblock";
        const actionLabel = isUnblock ? "unblock" : "block";

        if (
            window.confirm(
                `Are you sure you want to ${actionLabel} this customer?`,
            )
        ) {
            try {
                if (isUnblock) {
                    await unblockCustomer(userId).unwrap();
                } else {
                    await blockCustomer(userId).unwrap();
                }

                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: `${isUnblock ? "Unblocked" : "Blocked"} successfully.`,
                    }),
                );
            } catch (error) {
                const errorMessage =
                    error?.data?.message ||
                    error?.error ||
                    `Error while trying to ${actionLabel} customer`;

                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: errorMessage,
                    }),
                );
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                title: "No.",
                render: (_, __, index) => (
                    <p>{(currentPage - 1) * 10 + index + 1}</p>
                ),
            },
            {
                title: "Customer Id",
                dataIndex: "customerId",
                key: "customerId",
            },
            {
                title: "Customer Name",
                dataIndex: "customerName",
                key: "customerName",
            },
            {
                title: "Profile",
                dataIndex: "profilePicture",
                key: "profilePicture",
                render: (profilePicture) => {
                    // console.log(profilePicture);
                    return (
                        <Image
                            src={getImageUrl(profilePicture)}
                            alt="Profile"
                            width={40}
                            className="rounded-md"
                        />
                    );
                },
            },
            {
                title: "Contact",
                key: "contact",
                render: (_, record) => (
                    <div>
                        <p style={{ margin: 0, fontWeight: 500 }}>
                            {record.phoneNumber}
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "12px",
                                color: "#8c8c8c",
                            }}
                        >
                            {record.email}
                        </p>
                    </div>
                ),
            },
            {
                title: "Gender",
                dataIndex: "gender",
                key: "gender",
                render: (gender) => gender || "-",
            },
            {
                title: "Joined Date",
                dataIndex: "joinDate",
                key: "joinDate",
            },
            {
                title: "Booking Count",
                dataIndex: "bookingCount",
                key: "bookingCount",
                render: (count) => count ?? 0,
            },
            {
                title: "Action",
                key: "action",
                render: (_, row) => (
                    <Button
                        onClick={() => handleViewDetail(row)}
                        className="rounded-xl! hover:bg-primary! hover:text-white!"
                    >
                        View
                    </Button>
                ),
            },
        ],
        [currentPage, handleViewDetail],
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <SubHeaderSection
                setSearchText={setSearchText}
                title="Customer"
                subTitle="Manage customer accounts, view user details, and update account status."
                placeholderTitle="Search by name or phone..."
            />

            <CustomerSummaryCard
                setFilteredValue={setFilteredValue}
                filteredValue={filteredValue}
            />

            <div className="table-wrapper">
                <Table
                    loading={isTableLoading}
                    columns={columns}
                    dataSource={currentTableData}
                    rowKey={(record) => record.id || record.customerId}
                    scroll={{ x: scrollX }}
                    pagination={
                        isBlockedView
                            ? false
                            : {
                                  current: currentPage,
                                  onChange: handlePageChange,
                                  size: "large",
                                  pageSize: 10,
                                  total: currentTableData.length,
                              }
                    }
                    bordered
                />
            </div>

            {selectedCustomer && (
                <UserDetailModal
                    viewModalOpen={viewModalOpen}
                    onClose={() => setViewModalOpen(false)}
                    selectedCustomer={selectedCustomer}
                    handleUserAction={handleUserAction}
                    actionType={isBlockedView ? "unblock" : "block"}
                />
            )}
        </>
    );
};

export default User;
