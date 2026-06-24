import {
    Table,
    Image,
    Dropdown,
    Space,
    Grid,
    Modal,
    Button,
    Avatar,
} from "antd";
import { useState, useMemo } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { cn } from "../../../lib/utils";
import { useCreateStaffMutation, useUpdateStaffMutation } from "./staffApi";
import TableHeaderSection from "../../../components/tableHeaderSection/TableHeaderSection";
import {
    DisconnectOutlined,
    MoreOutlined,
    UserOutlined,
} from "@ant-design/icons";
import StaffDetailModal from "./StaffDetailsModal";

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

    // Derived State calculated only when data changes
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

    const handleActionClick = (actionType, record) => {
        setSelectedStaff(record);
        if (actionType === "view") {
            setIsDetailOpen(true);
        } else if (actionType === "terminate") {
            setIsTerminateOpen(true);
        }
    };

    const handleSaveStaffDetail = async (updatedStaffFields) => {
        try {
            await editStaff(updatedStaffFields).unwrap();

            setDataList((prevList) =>
                prevList.map((item) =>
                    item.key === updatedStaffFields.key
                        ? { ...item, ...updatedStaffFields }
                        : item,
                ),
            );

            setSelectedStaff(updatedStaffFields);
            console.log("Saved successfully!");
        } catch (error) {
            console.error(
                "Failed to save changes onto backend database:",
                error,
            );
        }
    };

    const columns = [
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
                    <Dropdown
                        menu={{ items }}
                        placement="bottom"
                        // trigger={["click"]}
                    >
                        <MoreOutlined className="text-3xl cursor-pointer" />
                    </Dropdown>
                );
            },
        },
    ];

    {
        /* <Modal
                title={<h1>View Detail</h1>}
                open={isDetailOpen}
                footer={null}
            >
                {selectedStaff && (
                    <div className="w-full">
                        <Space size="large" className="border-b w-full py-4">
                            <Avatar
                                src={selectedStaff.profileUrl}
                                size="large"
                                className="w-15! h-15!"
                            />
                            <Space vertical>
                                <h1 className="text-xl font-semibold">
                                    {selectedStaff.name}
                                </h1>
                                <p>{selectedStaff.staffId}</p>
                            </Space>
                        </Space>
                        <Space vertical className="border-b w-full py-3">
                            <p>Phone: {selectedStaff.phone}</p>
                            <p>Email: {selectedStaff.email}</p>
                            <p>DATE OF BIRTH: {selectedStaff.dob}</p>
                        </Space>
                        <Space vertical className="border-b w-full py-3 mb-10">
                            <p>Customer Count: {selectedStaff.count}</p>
                            <p>Rating: {selectedStaff.rating}</p>
                        </Space>
                        <Space size="large">
                            <Button className="bg-primary! p-5! rounded-lg! text-white! hover:bg-pink-200!">
                                Edit
                            </Button>
                            <Button className="bg-red-500! p-5! rounded-lg! text-white! hover:bg-red-800!">
                                Delete
                            </Button>
                        </Space>
                    </div>
                )}
            </Modal> */
    }

    return (
        <div>
            <SubHeaderSection
                setSearchText={setSearchText}
                title="Staff"
                subTitle="Manage your elite staff to unlock peak operational efficiency."
                subFormTitle="Create your elite staff to unlock peak operational efficiency."
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
                    dataSource={STATIC_DATA}
                    columns={columns}
                    scroll={{ x: scrollX }}
                    bordered
                />
            </div>

            <StaffDetailModal
                isDetailOpen={isDetailOpen}
                handleClose={() => setIsDetailOpen(false)}
                selectedStaff={selectedStaff}
                onSave={handleSaveStaffDetail}
            />

            <Modal
                title={<h1>Terminate</h1>}
                open={isTerminateOpen}
                okText="Terminate"
                okButtonProps={{ danger: true }}
                onCancel={() => setIsTerminateOpen(false)}
            >
                {selectedStaff && (
                    <>
                        <Space size="large" className="w-full py-4">
                            <Avatar
                                src={selectedStaff.profileUrl}
                                size="large"
                                className="w-15! h-15!"
                            />
                            <Space vertical>
                                <h1 className="text-xl font-semibold">
                                    {selectedStaff.name}
                                </h1>
                                <p>{selectedStaff.staffId}</p>
                            </Space>
                        </Space>
                        <p className="text-xl py-3 mb-5">
                            Are you sure you want to terminate this staff?
                        </p>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Staff;
