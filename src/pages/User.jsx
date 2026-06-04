import { Input, Table, Typography } from "antd";
import { useState } from "react";
import AddForm from "../components/modals/AddForm";

const data = [
    {
        key: 1,
        username: "Joe",
        age: 20,
        address: "Yangon",
    },
    {
        key: 2,
        username: "Green",
        age: 32,
        address: "Mandalay",
    },
    {
        key: 3,
        username: "Brown",
        age: 28,
        address: "Taunggyi",
    },
    {
        key: 4,
        username: "Black",
        age: 24,
        address: "Bago",
    },
    {
        key: 5,
        username: "Joe",
        age: 20,
        address: "Yangon",
    },
    {
        key: 6,
        username: "Green",
        age: 32,
        address: "Mandalay",
    },
    {
        key: 7,
        username: "Brown",
        age: 28,
        address: "Taunggyi",
    },
    {
        key: 8,
        username: "Black",
        age: 24,
        address: "Bago",
    },
    {
        key: 9,
        username: "Joe",
        age: 20,
        address: "Yangon",
    },
    {
        key: 10,
        username: "Green",
        age: 32,
        address: "Mandalay",
    },
    {
        key: 11,
        username: "Brown",
        age: 28,
        address: "Taunggyi",
    },
    {
        key: 12,
        username: "Black",
        age: 24,
        address: "Bago",
    },
];

const User = () => {
    const { Title } = Typography;
    const { Search } = Input;

    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        {
            title: "Name",
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
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "address",
            dataIndex: "address",
            key: "address",
        },
    ];

    // console.log(currentPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="title-style flex justify-between items-center">
                <Title level={3}>User</Title>
                <Search
                    placeholder="Search user ...."
                    onSearch={(value) => setSearchText(value)}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="!w-128"
                />
                <AddForm title={"User"} />
            </div>

            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={data}
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
