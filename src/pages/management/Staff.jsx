import { Flex, Space, Table, Tag, Image } from "antd";
import flowerProfile from "../../../public/flowerProfile.jpg";
import { useState } from "react";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";

const data = [
    {
        key: "1",
        profile: (
            <Image
                src={flowerProfile}
                width={40}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        profile: (
            <Image
                src={flowerProfile}
                width={40}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["Blah"],
    },
    {
        key: "3",
        profile: (
            <Image
                src={flowerProfile}
                width={40}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        key: "4",
        profile: (
            <Image
                src={flowerProfile}
                width={40}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "5",
        profile: (
            <Image
                src={flowerProfile}
                width={40}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["Blah"],
    },
    {
        key: "6",
        profile: (
            <Image
                src={flowerProfile}
                width={40}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

const Staff = () => {
    const [searchText, setSearchText] = useState("");
    const columns = [
        {
            title: "Profile",
            dataIndex: "profile",
            key: "profile",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                    String(record.age)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.address)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.firstName)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            },
            children: [
                {
                    title: "First Name",
                    dataIndex: "firstName",
                    key: "firstName",
                },
                {
                    title: "Last Name",
                    dataIndex: "lastName",
                    key: "lastName",
                },
            ],
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
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags) => (
                <Flex gap="small" align="center" wrap>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
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
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="medium">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <SubHeaderSection setSearchText={setSearchText} title={"Staff"} />
            <div className="table-wrapper">
                <Table dataSource={data} columns={columns} />
            </div>
        </div>
    );
};

export default Staff;
