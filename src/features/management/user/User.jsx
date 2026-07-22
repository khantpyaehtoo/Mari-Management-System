import { Grid, Table, Button, Avatar } from "antd";
import { useCallback, useMemo, useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import UserDetailModal from "./UserDetailModal";
import { useDispatch } from "react-redux";
import {
    useBlockUserMutation,
    useGetAllUserDataQuery,
    useGetBlockUserDataQuery,
} from "./userApi";
import CustomerSummaryCard from "./CustomerSummaryCard";
import { useDebounce } from "../../../lib/hooks/useDebounce";
import { setMessage } from "../../../app/core/notifications/notiSlice";

const { useBreakpoint } = Grid;

const User = () => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [filteredValue, setFilteredValue] = useState("All");

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const [blockCustomer] = useBlockUserMutation();

    // Fetch blocked users data
    const { data: getBlockUserData, isLoading: isBlockedLoading } =
        useGetBlockUserDataQuery(undefined, {
            skip: filteredValue !== "Blocked",
        });

    const statusParam =
        !filteredValue || filteredValue === "All" || filteredValue === "Blocked"
            ? undefined
            : String(filteredValue).toLowerCase();

    const debouncedSearchText = useDebounce(searchText, 300);

    // Fetch all/paginated customer data
    const { data: getAllUser, isLoading: isAllLoading } =
        useGetAllUserDataQuery(
            {
                page: currentPage - 1,
                size: 10,
                status: statusParam,
                search: debouncedSearchText
                    ? debouncedSearchText.trim()
                    : undefined,
            },
            { skip: filteredValue === "Blocked" },
        );

    // Dynamically switch DataSource and Loading states based on Card selection
    const isBlockedView = filteredValue === "Blocked";

    const currentTableData = isBlockedView
        ? getBlockUserData?.content || getBlockUserData || []
        : getAllUser?.content || [];

    const isTableLoading = isBlockedView ? isBlockedLoading : isAllLoading;

    const handleViewDetail = useCallback((record) => {
        console.log(record);
        setSelectedCustomer(record);
        setViewModalOpen(true);
    }, []);

    const handleBlockCustomer = async (customerId) => {
        console.log("Block", customerId);
        if (
            window.confirm(
                `Are you sure you want to block this customer ${customerId} `,
            )
        ) {
            try {
                await blockCustomer(customerId).unwrap();
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Blocked successfully.",
                    }),
                );
            } catch (error) {
                const errorMessage =
                    error?.data?.message ||
                    error?.error ||
                    "Error while Terminate";

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
                render: (profilePicture) => <Avatar src={profilePicture} />,
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
                getAllUserData={getAllUser}
                getBlockUserData={getBlockUserData}
                setFilteredValue={setFilteredValue}
                filteredValue={filteredValue}
            />

            <div className="table-wrapper">
                <Table
                    loading={isTableLoading}
                    columns={columns}
                    dataSource={currentTableData}
                    rowKey="id"
                    scroll={{ x: scrollX }}
                    pagination={
                        isBlockedView
                            ? false
                            : {
                                  current: currentPage,
                                  onChange: handlePageChange,
                                  size: "large",
                                  pageSize: 10,
                                  total:
                                      getAllUser?.totalElements ||
                                      currentTableData.length,
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
                    handleBlockBtn={(customerId) =>
                        handleBlockCustomer(customerId)
                    }
                />
            )}
        </>
    );
};

export default User;
