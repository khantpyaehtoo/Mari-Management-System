import { Table, Image, Dropdown, Space, Grid, Button } from "antd";
import { useState, useMemo, useCallback } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { cn } from "../../../lib/utils";
import {
    useCreateStaffMutation,
    useDeleteStaffMutation,
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
import { setMessage } from "../../../app/core/notiSlice";

const STATIC_DATA = [
    {
        key: "1",
        staffId: "ST-0042",
        profileUrl:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Phyu Phyu",
        phone: "09-459112233",
        email: "phyuphyu@gmail.com",
        dob: "19/09/1999",
        joined: "02/12/2022",
        count: "115",
        rating: "4.5",
        status: "In Progress",
    },
    {
        key: "2",
        staffId: "ST-0182",
        profileUrl:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Aung Aung",
        phone: "09-450123456",
        email: "aungaung@gmail.com",
        dob: "12/05/1995",
        joined: "15/01/2023",
        count: "142",
        rating: "4.8",
        status: "Completed",
    },
    {
        key: "3",
        staffId: "ST-0934",
        profileUrl:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Su Su",
        phone: "09-798654321",
        email: "susu@gmail.com",
        dob: "24/11/1998",
        joined: "10/06/2024",
        count: "95",
        rating: "4.2",
        status: "Available",
    },
    {
        key: "4",
        staffId: "ST-0512",
        profileUrl:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Kyaw Kyaw",
        phone: "09-254889900",
        email: "kyawkyaw@gmail.com",
        dob: "03/02/1992",
        joined: "01/09/2021",
        count: "310",
        rating: "4.0",
        status: "Unavailable",
    },
];

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

    const [dataList, setDataList] = useState(STATIC_DATA);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isTerminateOpen, setIsTerminateOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const [searchText, setSearchText] = useState("");
    const [filterValue, setFilterValue] = useState(null);

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const [createStaff] = useCreateStaffMutation();
    const [editStaff] = useUpdateStaffMutation();
    const [deleteStaff] = useDeleteStaffMutation();
    const [terminateStaff] = useTerminateStaffMutation();

    // Optimized status calculation into a single pass
    const statusCounts = useMemo(() => {
        return {
            All: dataList?.length,
            "In Progress": dataList?.filter(
                (item) => item.status === "In Progress",
            ).length,
            Completed: dataList?.filter((item) => item.status === "Completed")
                .length,
            Available: dataList?.filter((item) => item.status === "Available")
                .length,
            Unavailable: dataList?.filter(
                (item) => item.status === "Unavailable",
            ).length,
        };
    }, [dataList]);

    // UseCallback for freeze memory reference addresses across renders
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
                        msgContent: "Deleted successfully.",
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
                    "Error while deleteing";

                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: errorMessage,
                    }),
                );
            }
        }
    };

    const handleSaveStaffDetail = async (updatedStaffFields) => {
        try {
            const staffId = updatedStaffFields.staffId;
            await editStaff(staffId, updatedStaffFields).unwrap();

            setDataList((prevList) =>
                prevList.map((item) =>
                    item.key === updatedStaffFields.key
                        ? { ...item, ...updatedStaffFields }
                        : item,
                ),
            );

            setSelectedStaff(updatedStaffFields);
            console.log("Saved successfully!", staffId, updatedStaffFields);
        } catch (error) {
            console.error(
                "Failed to save changes onto backend database:",
                error,
            );
        }
    };

    const columns = useMemo(
        () => [
            {
                title: "No.",
                render: (_, __, index) => <p>{index + 1}</p>,
            },
            {
                title: "Staff ID",
                dataIndex: "staffId",
                key: "staffId",
            },
            {
                title: "Profile",
                dataIndex: "profileUrl",
                key: "profile",
                render: (url) => (
                    <Image
                        src={url}
                        width={40}
                        alt="profile"
                        className="rounded-md! shadow-sm!"
                    />
                ),
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                filteredValue: searchText ? [searchText] : null,
                onFilter: (value, record) =>
                    record.name.toLowerCase().includes(value.toLowerCase()) ||
                    record.staffId.toLowerCase().includes(value.toLowerCase()),
            },
            {
                title: "Contact",
                key: "contact",
                render: (_, record) => (
                    <Space vertical size="small">
                        <p className="font-medium">{record.phone}</p>
                        <p className="text-gray-500">{record.email}</p>
                    </Space>
                ),
            },
            { title: "Date Of Birth", dataIndex: "dob", key: "dob" },
            { title: "Joined Date", dataIndex: "joined", key: "joined" },
            { title: "Count", dataIndex: "count", key: "count" },
            { title: "Rating", dataIndex: "rating", key: "rating" },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                filteredValue: filterValue ? [filterValue] : null,
                onFilter: (value, record) => record.status === value,
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
                        {
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
                    ];
                    return (
                        <Dropdown menu={{ items }} placement="bottom">
                            <MoreOutlined className="text-3xl cursor-pointer" />
                        </Dropdown>
                    );
                },
            },
        ],
        [searchText, filterValue, handleActionClick],
    );

    return (
        <div>
            <SubHeaderSection
                setSearchText={setSearchText}
                title="Staff"
                subTitle="Manage your elite staff to unlock peak operational efficiency."
                subFormTitle="Create your elite staff to unlock peak operational efficiency."
                placeholderTitle="Search the all staff ..."
                triggerCreate={createStaff}
                triggerEdit={editStaff}
            />
            <TableHeaderSection
                renderlists={renderlists}
                options={options}
                setFilterValue={setFilterValue}
                statusCounts={statusCounts}
            />
            <div className="table-wrapper">
                <Table
                    dataSource={dataList}
                    columns={columns}
                    scroll={{ x: scrollX }}
                    bordered
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
