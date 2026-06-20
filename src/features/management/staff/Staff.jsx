import { Table, Image, Dropdown, Space } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { EyeOutlined } from "@ant-design/icons";

const randomNumber = Math.floor(Math.random() * 1000);
const randomString = Math.random().DownOutlinedtoString(36).substring(2, 9);

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
        staffId: `St-${String(randomNumber).padStart(4, "0")}`,
        profile: (
            <Image
                src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                width={40}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        name: "Phyu Phyu",
        contact: (
            <Space vertical size="small">
                <p className="font-medium">
                    09-{String(randomNumber * 7).padStart(9, `${randomNumber}`)}
                </p>
                <p className="">{randomString}@gmail.com</p>
            </Space>
        ),
        dob: "19/09/1999",
        joined: "02/12/2022",
        count: `${String(randomNumber).padStart(3, "1")}`,
        rating: "4.5",
        status: <p className="text-progress">In Progress</p>,
    },
];

const Staff = () => {
    const [searchText, setSearchText] = useState("");
    const columns = [
        {
            title: "No.",
            render: (_, value, index) => <p>{index + 1}</p>,
        },
        {
            title: "Staff ID",
            dataIndex: "staffId",
            key: "staffId",
        },
        {
            title: "Profile",
            dataIndex: "profile",
            key: "profile",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
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
