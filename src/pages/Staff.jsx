import { Input, Typography } from "antd";
import { Flex, Space, Table, Tag } from "antd";
import AddServicesForm from "../components/modals/addForm";
import { useState } from "react";
const { Column, ColumnGroup } = Table;
const data = [
    {
        key: "1",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["Blah"],
    },
    {
        key: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        key: "4",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "5",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["Blah"],
    },
    {
        key: "6",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

const Staff = () => {
    const { Title } = Typography;
    const { Search } = Input;

    const [searchText, setSearchText] = useState("");

    const filterSearch = (value, record) => {
        return (
            String(record.name).toLowerCase().includes(value.toLowerCase()) ||
            String(record.age).toLowerCase().includes(value.toLowerCase()) ||
            String(record.address).toLowerCase().includes(value.toLowerCase())
        );
    };

    return (
        <div>
            <div className="title-style flex justify-between items-center">
                <Title level={3}>Staff</Title>

                <AddServicesForm title={"Staff"} />
            </div>
            <div className="table-wrapper">
                <Search
                    placeholder="Search ..."
                    onSearch={(value) => setSearchText(value)}
                />

                <Table
                    dataSource={data}
                    onFilter={(value, record) => filterSearch(value, record)}
                    onChange={(e) => setSearchText(e.target.value)}
                >
                    <ColumnGroup
                        title="Name"
                        filteredValue={searchText}
                        dataIndex="name"
                    >
                        <Column
                            title="First Name"
                            dataIndex="firstName"
                            key="firstName"
                        />
                        <Column
                            title="Last Name"
                            dataIndex="lastName"
                            key="lastName"
                        />
                    </ColumnGroup>
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={(tags) => (
                            <Flex gap="small" align="center" wrap>
                                {tags.map((tag) => {
                                    let color =
                                        tag.length > 5 ? "geekblue" : "green";
                                    if (tag === "Blah") {
                                        color = "volcano";
                                    }
                                    return (
                                        <Tag color={color} key={tag}>
                                            {tag.toUpperCase()}
                                        </Tag>
                                    );
                                })}
                            </Flex>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="medium">
                                <a>Invite {record.lastName}</a>
                                <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
};

export default Staff;
