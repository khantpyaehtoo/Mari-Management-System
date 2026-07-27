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
import { getImageUrl } from "../../../app/core/functions/getImageUrl";

const RENDER_LISTS = [
    "All",
    "In Progress",
    "Completed",
    "Available",
    "Unavailable",
    "Terminate",
];
const STATUS_CLASSES = {
    "In Progress": "text-progress",
    Pending: "text-pending",
    Confirm: "text-confirm",
    Completed: "text-completed",
    Available: "text-available",
    Unavailable: "text-unavailable",
    Reject: "text-unavailable",
    Terminate: "text-gray-500",
};

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
        setFilterValue(value || "All");
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    const filterOptions = useMemo(() => {
        return RENDER_LISTS.map((status) => {
            const isActive = filterValue === status;

            return {
                label: (
                    <span
                        className={cn(
                            STATUS_CLASSES[status] || "text-gray-500",
                            "transition-all duration-200 cursor-pointer inline-block",
                            isActive && "font-medium",
                        )}
                    >
                        {status}
                    </span>
                ),
                value: status,
            };
        });
    }, [filterValue]);

    const statusParam =
        !filterValue || filterValue === "All"
            ? undefined
            : filterValue === "Terminate"
              ? "Inactive"
              : filterValue;

    const { data: apiResponse, isLoading } = useGetStaffDataQuery({
        status: statusParam,
        search: debouncedSearchText ? debouncedSearchText.trim() : undefined,
        page: currentPage - 1,
        size: 10,
    });

    const dataList = useMemo(() => {
        const rawStaff = Array.isArray(apiResponse)
            ? apiResponse
            : apiResponse?.staffList ||
              apiResponse?.staff ||
              apiResponse?.content ||
              [];

        const formatted = rawStaff.map((staff) => {
            const rawImg = staff.profileImage || staff.profilePicture;

            const fullImageUrl = getImageUrl(rawImg);

            const realId = staff.userId || staff.staffId || staff.id;
            const currentStatus =
                staff.status === "Inactive" ? "Terminate" : staff.status;

            return {
                ...staff,
                id: realId,
                staffId: realId,
                status: currentStatus,
                staffCode: staff.staffCode || staff.code,
                staffName: staff.staffName || staff.fullName,
                phoneNumber: staff.phoneNumber || staff.phone,
                profileImage: fullImageUrl,
                joinedDate: staff.joinedDate || staff.createdAt,
            };
        });

        if (!filterValue || filterValue === "All") {
            return formatted;
        }

        return formatted.filter(
            (item) => item.status?.toLowerCase() === filterValue.toLowerCase(),
        );
    }, [apiResponse, filterValue]);

    // console.log(dataList);

    const [createStaff] = useCreateStaffMutation();
    const [editStaff] = useUpdateStaffMutation();
    const [deleteStaff] = useDeleteStaffMutation();
    const [terminateStaff] = useTerminateStaffMutation();
    const [rehiredStaff] = useRehiredStaffMutation();

    const handleCreateStaff = async (formValues) => {
        try {
            const payload = {
                fullName: formValues.fullName || formValues.staffName,
                email: formValues.email,
                phoneNumber: formValues.phoneNumber || formValues.phone,
                dateOfBirth: formValues.dateOfBirth
                    ? dayjs(formValues.dateOfBirth).format(
                          "YYYY-MM-DDTHH:mm:ss[Z]",
                      )
                    : null,
            };
            const result = await createStaff(payload).unwrap();
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Staff created successfully.",
                }),
            );
            return result;
        } catch (error) {
            console.error("Create staff error:", error);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent:
                        error?.data?.message || "Failed to create staff",
                }),
            );
            throw error;
        }
    };

    const statusCounts = useMemo(() => {
        const AllTotal =
            (apiResponse?.inProgressCount || 0) +
            (apiResponse?.completedCount || 0) +
            (apiResponse?.availableCount || 0) +
            (apiResponse?.unavailableCount || 0) +
            (apiResponse?.inactiveCount || 0) +
            (apiResponse?.terminateCount || 0);

        return {
            All: AllTotal || dataList?.length || 0,
            "In Progress": apiResponse?.inProgressCount || 0,
            Completed: apiResponse?.completedCount || 0,
            Available: apiResponse?.availableCount || 0,
            Unavailable: apiResponse?.unavailableCount || 0,
            Terminate:
                apiResponse?.terminateCount || apiResponse?.inactiveCount || 0,
        };
    }, [apiResponse, dataList]);

    const handleActionClick = useCallback((actionType, record) => {
        console.log("Selected Staff DB Record:", record);
        setSelectedStaff(record);
        if (actionType === "view") {
            setIsDetailOpen(true);
        } else if (actionType === "terminate") {
            setIsTerminateOpen(true);
        }
    }, []);

    const handleTerminateStaff = async (staffId) => {
        const targetId =
            typeof staffId === "number" || typeof staffId === "string"
                ? staffId
                : selectedStaff?.userId ||
                  selectedStaff?.staffId ||
                  selectedStaff?.id;

        if (!targetId) return;

        try {
            await terminateStaff(targetId).unwrap();
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Terminated successfully.",
                }),
            );
            setIsTerminateOpen(false);
            setSelectedStaff(null);
        } catch (error) {
            const errorMessage =
                error?.data?.message ||
                error?.error ||
                "Error while Terminating staff";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
        }
    };

    const handleRehired = async (staffId) => {
        const targetId =
            typeof staffId === "number" || typeof staffId === "string"
                ? staffId
                : selectedStaff?.userId ||
                  selectedStaff?.staffId ||
                  selectedStaff?.id;

        if (!targetId) return;

        try {
            await rehiredStaff(targetId).unwrap();
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Re-Hired successfully.",
                }),
            );
            setIsDetailOpen(false);
            setSelectedStaff(null);
        } catch (error) {
            const errorMessage =
                error?.data?.message ||
                error?.error ||
                "Error while Re-Hiring staff";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
        }
    };

    const handleDeleteStaff = async (staffId) => {
        const idToPass = staffId || selectedStaff?.staffId || selectedStaff?.id;
        try {
            await deleteStaff(idToPass).unwrap();
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Deleted successfully.",
                }),
            );
            setIsDetailOpen(false);
        } catch (error) {
            const errorMessage =
                error?.data?.message ||
                error?.error ||
                "Error while deleting staff";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
        }
    };

    const handleSaveStaffDetail = async (updatedStaffFields) => {
        try {
            const targetId =
                updatedStaffFields.id || updatedStaffFields.staffId;
            await editStaff({
                id: targetId,
                fullName:
                    updatedStaffFields.fullName || updatedStaffFields.staffName,
                email: updatedStaffFields.email,
                phoneNumber:
                    updatedStaffFields.phoneNumber || updatedStaffFields.phone,
                dateOfBirth: updatedStaffFields.dateOfBirth,
            }).unwrap();

            setSelectedStaff(updatedStaffFields);
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Staff updated successfully.",
                }),
            );
            setIsDetailOpen(false);
        } catch (error) {
            console.error("Failed to update staff:", error);
            const errorMessage =
                error?.data?.message ||
                error?.error ||
                "Error while updating staff";
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
                    return dob ? (
                        <p>{dayjs(dob).format("DD . MM . YYYY")}</p>
                    ) : (
                        <p>-</p>
                    );
                },
            },
            {
                title: "Joined Date",
                dataIndex: "joinedDate",
                key: "joinedDate",
                render: (jd) => {
                    return jd ? (
                        <p>{dayjs(jd).format("DD . MM . YYYY")}</p>
                    ) : (
                        <p>-</p>
                    );
                },
            },
            {
                title: "Count",
                dataIndex: "completedJobsCount",
                key: "completedJobsCount",
                render: (count) => <p>{count ?? 0}</p>,
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
                render: (status, record) => {
                    let currentStatus =
                        status ||
                        (record.available ? "Available" : "Unavailable");

                    if (currentStatus === "Inactive") {
                        currentStatus = "Terminate";
                    }

                    return (
                        <p
                            className={cn(
                                "font-medium",
                                STATUS_CLASSES[currentStatus] ||
                                    "text-gray-500",
                            )}
                        >
                            {currentStatus}
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
                        record.status !== "Terminate" &&
                            record.status !== "Inactive" && {
                                label: (
                                    <Button
                                        type="text"
                                        danger
                                        className="w-full! text-left!"
                                        onClick={() =>
                                            handleActionClick(
                                                "terminate",
                                                record,
                                            )
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
                setSearchText={handleSearchChange}
                title="Staff"
                subTitle="Manage your elite staff to unlock peak operational efficiency."
                subFormTitle="Create your elite staff to unlock peak operational efficiency."
                placeholderTitle="Search all staff..."
                triggerCreate={handleCreateStaff}
                triggerEdit={handleSaveStaffDetail}
            />
            <TableHeaderSection
                renderlists={RENDER_LISTS}
                options={filterOptions}
                filterValue={filterValue}
                setFilterValue={handleFilterChange}
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
                onSave={handleSaveStaffDetail}
                onDelete={handleDeleteStaff}
                reHired={handleRehired}
            />

            <TerminateStaffModal
                isTerminateOpen={isTerminateOpen}
                handleClose={() => setIsTerminateOpen(false)}
                selectedStaff={selectedStaff}
                onTerminate={handleTerminateStaff}
            />
        </div>
    );
};

export default Staff;
