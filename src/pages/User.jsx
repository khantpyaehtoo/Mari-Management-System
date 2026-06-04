import { Input, Table, Typography } from "antd";
import { useEffect, useState } from "react";

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
    const [paginationConfig, setPaginationConfig] = useState({
        current: 1,
        pageSize: 3,
        total: data.length,
    });
    // const filterSearch =
    //     String(record.name).toLowerCase().includes(value.toLowerCase());
    // };

    const handlePageChange = (page, pageSize) => {
        setPaginationConfig({ ...paginationConfig, current: page, pageSize });
    };

    // const CustomPagination = () => {
    //     <Pagination
    //         current={paginationConfig.current}
    //         pageSize={paginationConfig.pageSize}
    //         pageSizeOptions={[2, 3, 4]}
    //         total={paginationConfig.total}
    //         onChange={handlePageChange}
    //     />;
    // };

    return (
        <div>
            <Title className="title-style" level={3}>
                User
            </Title>

            <Search
                placeholder="Search user ...."
                onSearch={(value) => setSearchText(value)}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <Table
                columns={[
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
                ]}
                dataSource={data}
                pagination={paginationConfig}
                // onClick={() => handlePageChange(1, data.length)}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default User;
