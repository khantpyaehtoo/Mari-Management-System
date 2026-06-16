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
            title: "Id",
            dataIndex: "rowId",
            key: "rowId",
        },
        {
            title: "Profile",
            dataIndex: "profile",
            key: "profile",
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            filteredValue: searchText ? [searchText] : null,
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
        },
        {
            title: "Staff Id",
            dataIndex: "staffId",
            key: "staffId",
        },
        {
            title: "DOB",
            dataIndex: "dob",
            key: "dob",
        },
        {
            title: "Phone Number",
            dataIndex: "phNo",
            key: "phNo",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Password",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
        },
        {
            title: "Customer Count",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "Available",
            dataIndex: "available",
            key: "available",
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
