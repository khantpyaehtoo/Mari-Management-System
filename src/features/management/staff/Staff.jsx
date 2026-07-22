import { Table, Image, Dropdown, Space, Grid, Button } from "antd";
import { useState, useMemo, useCallback } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { cn } from "../../../lib/utils";
import {
    useCreateStaffMutation,
    useDeleteStaffMutation,
    useGetStaffDataQuery,
    useRehiredStaffMutation,
    useTerminateStaffMutation,
    useUpdateStaffMutation,
} from "./staffApi";
import TableHeaderSection from "../../../components/tableHeaderSection/TableHeaderSection";
import {
    DisconnectOutlined,
    MoreOutlined,
    UserOutlined,
} from "@ant-design/icons";
import StaffDetailModal from "./StaffDetailsModal";
import TerminateStaffModal from "./TerminateStaffModal";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../../lib/hooks/useDebounce";
import dayjs from "dayjs";
import { setMessage } from "../../../app/core/notifications/notiSlice";

const IMAGE_BASE_URL = import.meta.env.VITE_BASE_API;

const renderlists = [
    "All",
    "In Progress",
    "Completed",
    "Available",
    "Unavailable",
    "Terminate",
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
const options = renderlists.map((status) => ({
    label: (
        <span className={statusClasses[status] || "text-gray-500"}>
            {status}
        </span>
    ),
    value: status,
}));

const { useBreakpoint } = Grid;

const Staff = () => {
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const [searchText, setSearchText] = useState("");
    const [filterValue, setFilterValue] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isTerminateOpen, setIsTerminateOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const debouncedSearchText = useDebounce(searchText, 300);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (value) => {
        setFilterValue(value);
        setCurrentPage(1); // Reset page on filter change
    };

    const handleSearchChange = (value) => {
        setSearchText(value);
        setCurrentPage(1); // Reset page on search change
    };

    // Format query status parameter
    const statusParam =
        !filterValue || filterValue === "All" ? undefined : filterValue;

    const { data: apiResponse, isLoading } = useGetStaffDataQuery({
        status: statusParam,
        search: debouncedSearchText ? debouncedSearchText.trim() : undefined,
        page: currentPage - 1,
        size: 10,
    });

    const dataList = useMemo(() => {
        const rawStaff = Array.isArray(apiResponse)
            ? apiResponse
            : apiResponse?.staff || [];

        return rawStaff.map((staff) => {
            let fullImageUrl = staff.profileImage;

            if (staff?.profileImage && !staff.profileImage.startsWith("http")) {
                const separator = staff.profileImage.startsWith("/") ? "" : "/";
                fullImageUrl = `${IMAGE_BASE_URL}${separator}${staff.profileImage}`;
            }

            return {
                ...staff,
                profileImage: fullImageUrl,
            };
        });
    }, [apiResponse]);

    const [createStaff] = useCreateStaffMutation();
    const [editStaff] = useUpdateStaffMutation();
    const [deleteStaff] = useDeleteStaffMutation();
    const [terminateStaff] = useTerminateStaffMutation();
    const [rehiredStaff] = useRehiredStaffMutation();

    const statusCounts = useMemo(() => {
        const AllTotal =
            (apiResponse?.inProgressCount || 0) +
            (apiResponse?.completedCount || 0) +
            (apiResponse?.availableCount || 0) +
            (apiResponse?.unavailableCount || 0) +
            (apiResponse?.terminateCount || 0);

        return {
            All: AllTotal || dataList?.length || 0,
            "In Progress": apiResponse?.inProgressCount || 0,
            Completed: apiResponse?.completedCount || 0,
            Available: apiResponse?.availableCount || 0,
            Unavailable: apiResponse?.unavailableCount || 0,
            Terminate: apiResponse?.terminateCount || 0,
        };
    }, [apiResponse, dataList]);

    const handleActionClick = useCallback((actionType, record) => {
        setSelectedStaff(record);
        if (actionType === "view") {
            setIsDetailOpen(true);
        } else if (actionType === "terminate") {
            setIsTerminateOpen(true);
        }
    }, []);

    const handleTerminateStaff = async (staffId) => {
        if (window.confirm(`Are you sure to terminate this ${staffId}`)) {
            try {
                await terminateStaff(staffId).unwrap();
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Terminated successfully.",
                    }),
                );
            } catch (error) {
                const errorMessage =
                    error?.data?.message ||
                    error?.error ||
                    "Error while Terminate";
                dispatch(
                    setMessage({ msgType: "error", msgContent: errorMessage }),
                );
            }
        }
    };

    const handleRehired = async (staffId) => {
        if (window.confirm(`Are you sure to rehired this ${staffId}`)) {
            try {
                await rehiredStaff(staffId).unwrap();
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Re-Hired successfully.",
                    }),
                );
            } catch (error) {
                const errorMessage =
                    error?.data?.message ||
                    error?.error ||
                    "Error while Re-Hiring";
                dispatch(
                    setMessage({ msgType: "error", msgContent: errorMessage }),
                );
            }
        }
    };

    const handleDeleteStaff = async (staffId) => {
        if (window.confirm(`Are you sure to delete this ${staffId}`)) {
            try {
                await deleteStaff(staffId).unwrap();
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Deleted successfully.",
                    }),
                );
            } catch (error) {
                const errorMessage =
                    error?.data?.message ||
                    error?.error ||
                    "Error while deleting";
                dispatch(
                    setMessage({ msgType: "error", msgContent: errorMessage }),
                );
            }
        }
    };

    const handleSaveStaffDetail = async (updatedStaffFields) => {
        try {
            const staffId = updatedStaffFields.staffId;
            await editStaff(staffId, updatedStaffFields).unwrap();
            setSelectedStaff(updatedStaffFields);
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Edit Change successfully.",
                }),
            );
        } catch (error) {
            console.error(
                "Failed to save changes onto backend database:",
                error,
            );
            const errorMessage =
                error?.data?.message || error?.error || "Error while changeing";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
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
                title: "Staff ID",
                dataIndex: "staffCode",
                key: "staffCode",
            },
            {
                title: "Profile",
                dataIndex: "profileImage",
                key: "profile",
                render: (url) => (
                    <Image
                        src={url}
                        width={40}
                        alt="profile"
                        fallback="https://placehold.co/40x40?text=Staff"
                        className="rounded-md! shadow-sm!"
                    />
                ),
            },
            {
                title: "Name",
                dataIndex: "staffName",
                key: "staffName",
            },
            {
                title: "Contact",
                key: "contact",
                render: (_, record) => (
                    <Space vertical size="small">
                        <p className="font-medium">{record.phoneNumber}</p>
                        <p className="text-gray-500">{record.email}</p>
                    </Space>
                ),
            },
            {
                title: "Date Of Birth",
                dataIndex: "dateOfBirth",
                key: "dateOfBirth",
                render: (dob) => {
                    return dob && <p>{dayjs(dob).format("DD . MM . YYYY")}</p>;
                },
            },
            {
                title: "Joined Date",
                dataIndex: "joinedDate",
                key: "joinedDate",
                render: (jd) => {
                    return jd && <p>{dayjs(jd).format("DD . MM . YYYY")}</p>;
                },
            },
            {
                title: "Count",
                dataIndex: "completedJobsCount",
                key: "completedJobsCount",
            },
            {
                title: "Rating",
                dataIndex: "ratingAverage",
                key: "ratingAverage",
                render: (rating) => {
                    return rating !== undefined && rating !== null ? (
                        <p>⭐ {Number(rating).toFixed(1)}</p>
                    ) : (
                        <p>-</p>
                    );
                },
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status) => {
                    const statusClasses = {
                        "In Progress": "text-progress",
                        Available: "text-available",
                        Completed: "text-completed",
                        Unavailable: "text-unavailable",
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
                render: (_, record) => {
                    const items = [
                        {
                            label: (
                                <Button
                                    type="text"
                                    className="w-full! text-left!"
                                    onClick={() =>
                                        handleActionClick("view", record)
                                    }
                                >
                                    <p>
                                        <UserOutlined className="me-3" /> View
                                        Details
                                    </p>
                                </Button>
                            ),
                            key: "0",
                        },
                        record.status !== "Terminate" && {
                            label: (
                                <Button
                                    type="text"
                                    danger
                                    className="w-full! text-left!"
                                    onClick={() =>
                                        handleActionClick("terminate", record)
                                    }
                                >
                                    <DisconnectOutlined className="me-3" />{" "}
                                    Terminate
                                </Button>
                            ),
                            key: "1",
                        },
                    ].filter(Boolean);
                    return (
                        <Dropdown menu={{ items }} placement="bottom">
                            <MoreOutlined className="text-3xl cursor-pointer" />
                        </Dropdown>
                    );
                },
            },
        ],
        [currentPage, handleActionClick],
    );

    return (
        <div>
            <SubHeaderSection
                setSearchText={handleSearchChange} // Triggers input state resetting and search pagination
                title="Staff"
                subTitle="Manage your elite staff to unlock peak operational efficiency."
                subFormTitle="Create your elite staff to unlock peak operational efficiency."
                placeholderTitle="Search all staff..."
                triggerCreate={createStaff}
                triggerEdit={editStaff}
            />
            <TableHeaderSection
                renderlists={renderlists}
                options={options}
                setFilterValue={handleFilterChange} // Triggers status update & pagination reset
                statusCounts={statusCounts}
            />
            <div className="table-wrapper">
                <Table
                    dataSource={dataList}
                    columns={columns}
                    scroll={{ x: scrollX }}
                    loading={isLoading}
                    rowKey="staffId"
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

            <StaffDetailModal
                isDetailOpen={isDetailOpen}
                handleClose={() => setIsDetailOpen(false)}
                selectedStaff={selectedStaff}
                onSave={(updatedStaffFields) =>
                    handleSaveStaffDetail(updatedStaffFields)
                }
                onDelete={(staffId) => handleDeleteStaff(staffId)}
                reHired={(staffId) => handleRehired(staffId)}
            />

            <TerminateStaffModal
                isTerminateOpen={isTerminateOpen}
                handleClose={() => setIsTerminateOpen(false)}
                selectedStaff={selectedStaff}
                onTerminate={(staffId) => handleTerminateStaff(staffId)}
            />
        </div>
    );
};

export default Staff;
