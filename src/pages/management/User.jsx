import { Table } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useGetUserDataQuery } from "../../features/management/user/userApi";

// const data = [
//     {
//         key: 1,
//         username: "Joe",
//         age: 20,
//         address: "Yangon",
//     },
//     {
//         key: 2,
//         username: "Green",
//         age: 32,
//         address: "Mandalay",
//     },
//     {
//         key: 3,
//         username: "Brown",
//         age: 28,
//         address: "Taunggyi",
//     },
//     {
//         key: 4,
//         username: "Black",
//         age: 24,
//         address: "Bago",
//     },
//     {
//         key: 5,
//         username: "Joe",
//         age: 20,
//         address: "Yangon",
//     },
//     {
//         key: 6,
//         username: "Green",
//         age: 32,
//         address: "Mandalay",
//     },
//     {
//         key: 7,
//         username: "Brown",
//         age: 28,
//         address: "Taunggyi",
//     },
//     {
//         key: 8,
//         username: "Black",
//         age: 24,
//         address: "Bago",
//     },
//     {
//         key: 9,
//         username: "Joe",
//         age: 20,
//         address: "Yangon",
//     },
//     {
//         key: 10,
//         username: "Green",
//         age: 32,
//         address: "Mandalay",
//     },
//     {
//         key: 11,
//         username: "Brown",
//         age: 28,
//         address: "Taunggyi",
//     },
//     {
//         key: 12,
//         username: "Black",
//         age: 24,
//         address: "Bago",
//     },
// ];

const User = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { data } = useGetUserDataQuery();
    const userList = data;

    console.log(userList?.username);

    const columns = [
        {
            title: "username",
            dataIndex: "username",
            key: "username",
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                    String(record.age)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.address)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.username)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            },
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "phoneNumber",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
    ];

    // console.log(currentPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <SubHeaderSection setSearchText={setSearchText} title={"User"} />

            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={userList}
                    pagination={{
                        current: currentPage,
                        onChange: handlePageChange,
                        size: "large",
                        pageSize: 5,
                        placement: ["topEnd"],
                    }}
                />
            </div>
        </div>
    );
};

export default User;
