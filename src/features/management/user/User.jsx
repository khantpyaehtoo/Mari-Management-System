import { Grid, Table, Button } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useCreateUserMutation, useUpdateUserMutation } from "./userApi";
import UserDetailModal from "./UserDetailModal";

const { useBreakpoint } = Grid;
const dummyData = [
    {
        key: "1",
        customerId: "CUST-001",
        fullName: "John Doe",
        username: "johndoe99",
        customerName: "John Doe",
        profileUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        contact: {
            phone: "+1 (555) 019-2834",
            email: "john.doe@gmail.com",
        },
        gender: "Male",
        joinedDate: "2024-01-15",
        count: 12,
    },
    {
        key: "2",
        customerId: "CUST-002",
        fullName: "Jane Smith",
        username: "janesmith_dev",
        customerName: "Jane Smith",
        profileUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        contact: {
            phone: "+1 (555) 014-4921",
            email: "janesmith.dev@gmail.com",
        },
        gender: "Female",
        joinedDate: "2024-02-20",
        count: 5,
    },
    {
        key: "3",
        customerId: "CUST-003",
        fullName: "Alex Rivera",
        username: "arivera",
        customerName: "Alex Rivera",
        profileUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        contact: {
            phone: "+1 (555) 017-8833",
            email: "alex.rivera94@gmail.com",
        },
        gender: "Non-binary",
        joinedDate: "2023-11-05",
        count: 24,
    },
];
const User = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState("");

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const [createUser] = useCreateUserMutation();
    const [editUser] = useUpdateUserMutation();

    const handleViewDetail = (record) => {
        console.log(record);
        setSelectedCustomer(record);
        setViewModalOpen(true);
    };

    const columns = [
        {
            title: "No.",
            render: (_, __, index) => <p>{index + 1}</p>,
        },
        {
            title: "Customer Id",
            dataIndex: "customerId",
            key: "customerId",
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return (
                    String(record.customerId)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.fullName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.username)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            },
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Profile",
            dataIndex: "profileUrl",
            key: "profileUrl",
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
            render: (contact) => (
                <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>
                        {contact.phone}
                    </p>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "#8c8c8c",
                        }}
                    >
                        {contact.email}
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
            dataIndex: "joinedDate",
            key: "joinedDate",
        },
        {
            title: "Booking Count",
            dataIndex: "count",
            key: "count",
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
    ];

    // console.log(currentPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <SubHeaderSection
                setSearchText={setSearchText}
                title="User"
                triggerCreate={createUser}
                triggerEdit={editUser}
            />

            {/* <UserAddForm /> */}

            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={dummyData}
                    scroll={{ x: scrollX }}
                    pagination={{
                        current: currentPage,
                        onChange: handlePageChange,
                        size: "large",
                        pageSize: 5,
                        placement: ["topEnd"],
                    }}
                    bordered
                />
            </div>

            {selectedCustomer && (
                <UserDetailModal
                    viewModalOpen={viewModalOpen}
                    onClose={() => setViewModalOpen(false)}
                    selectedCustomer={selectedCustomer}
                />
            )}
        </div>
    );
};

export default User;
