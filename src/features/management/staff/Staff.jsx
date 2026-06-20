import { Table, Image, Dropdown, Space } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { EyeOutlined } from "@ant-design/icons";
import { cn } from "../../../lib/utils";

const randomNumber = Math.floor(Math.random() * 1000);
const randomString = Math.random().toString(36).substring(2, 9);

const items = [
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                1st menu item
            </a>
        ),
        key: "0",
    },
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                2nd menu item
            </a>
        ),
        key: "1",
    },
];

const data = [
    {
        staffId: `ST-${String(randomNumber).padStart(4, "0")}`,
        profile:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Phyu Phyu",
        phone: `09-${String(randomNumber * 7).padStart(9, `${randomNumber}`)}`,
        email: `${randomString}@gmail.com`,
        dob: "19/09/1999",
        joined: "02/12/2022",
        count: `${String(randomNumber).padStart(3, "1")}`,
        rating: "4.5",
        status: "In Progress",
    },
    {
        key: "2",
        staffId: `ST-${String(Math.floor(Math.random() * 1000)).padStart(4, "0")}`,
        profileUrl:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Aung Aung",
        phone: "09-450123456",
        email: `${Math.random().toString(36).substring(2, 7)}@gmail.com`,
        dob: "12/05/1995",
        joined: "15/01/2023",
        count: "142",
        rating: "4.8",
        status: "Completed",
    },
    {
        key: "3",
        staffId: `ST-${String(Math.floor(Math.random() * 1000)).padStart(4, "0")}`,
        profileUrl:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Su Su",
        phone: "09-798654321",
        email: `${Math.random().toString(36).substring(2, 7)}@gmail.com`,
        dob: "24/11/1998",
        joined: "10/06/2024",
        count: "95",
        rating: "4.2",
        status: "Available",
    },
    {
        key: "4",
        staffId: `ST-${String(Math.floor(Math.random() * 1000)).padStart(4, "0")}`,
        profileUrl:
            "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
        name: "Kyaw Kyaw",
        phone: "09-254889900",
        email: `${Math.random().toString(36).substring(2, 7)}@gmail.com`,
        dob: "03/02/1992",
        joined: "01/09/2021",
        count: "310",
        rating: "4.0",
        status: "Unavailable",
    },
];

const Staff = () => {
    const [searchText, setSearchText] = useState("");
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
                    className="!rounded-md !shadow-sm"
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return (
                    record.name.toLowerCase().includes(value.toLowerCase()) ||
                    record.staffId.toLowerCase().includes(value.toLowerCase())
                );
            },
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
        {
            title: "Date Of Birth",
            dataIndex: "dob",
            key: "dob",
        },
        {
            title: "Joined Date",
            dataIndex: "joined",
            key: "joined",
        },
        {
            title: "Count",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusClasses = {
                    "In Progress": "text-progress",
                    Available: "text-available",
                    Completed: "text-available",
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
        // {
        //     title: "Tags",
        //     dataIndex: "tags",
        //     key: "tags",
        //     render: (tags) => (
        //         <Flex gap="small" align="center" wrap>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? "geekblue" : "green";
        //                 if (tag === "Blah") {
        //                     color = "volcano";
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </Flex>
        //     ),
        // },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            View Details
                            <EyeOutlined />
                        </Space>
                    </a>
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <SubHeaderSection
                setSearchText={setSearchText}
                title="Staff"
                subTitle="Manage your elite staff to unlock peak operational efficiency. "
            />
            <div className="table-wrapper">
                <Table dataSource={data} columns={columns} />
            </div>
        </div>
    );
};

export default Staff;
