import { Table } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
// import { useGetUserDataQuery } from "../../features/management/user/userApi";
// import CookieJS from "js-cookie";
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

    // const token = CookieJS.get("lmsToken");
    // console.log(userList);
    // const { data: userList, isLoading, isError } = useGetUserDataQuery();
    // if (isLoading) return <p>Loading ...</p>;
    // if (isError) return <p>Error ...</p>;

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

    // const handleCreateUser = async () => {
    //     try {
    //         const [craeteUser] = await useCreateUserMutation();
    //     } catch {
    //     } finally {
    //     }
    // };

    // console.log(currentPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <SubHeaderSection setSearchText={setSearchText} title={"User"} />

            {/* <UserAddForm /> */}

            <div className="table-wrapper">
                <Table
                    columns={columns}
                    // dataSource={userList}
                    rowKey={Math.random}
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
