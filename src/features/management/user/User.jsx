import { Grid, Table } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useCreateUserMutation, useUpdateUserMutation } from "./userApi";

const { useBreakpoint } = Grid;
const User = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const [createUser] = useCreateUserMutation();
    const [editUser] = useUpdateUserMutation();

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return (
                    String(record.phone)
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
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Specialization",
            dataIndex: "specialization",
            key: "specialization",
        },
        {
            title: "createdAt",
            dataIndex: "createdAt",
            key: "createdAt",
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
                    // dataSource={userList}
                    onScroll={{ x: scrollX }}
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
        </div>
    );
};

export default User;
