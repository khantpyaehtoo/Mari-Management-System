import { Table, Button, Dropdown, message } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { DownOutlined } from "@ant-design/icons";

const initialData = [
    {
        key: 1,
        id: "# 01",
        serviceName: "nail cleaning",
        price: "20,000",
        customerName: "Mya Mya",
        bookedAt: "4 Jun 2026 12:30",
        status: "Pending",
        startedAt: "4 Jun 2026 12:40",
        employee: "Hla Hla",
    },
    {
        key: 2,
        id: "# 01",
        serviceName: "nail designing",
        price: "20,000",
        customerName: "Aung Aung",
        bookedAt: "4 Jun 2026 12:30",
        status: "Completed",
        startedAt: "4 Jun 2026 12:40",
        employee: "Hla Hla",
    },
    {
        key: 3,
        id: "# 01",
        serviceName: "nail removing",
        price: "20,000",
        customerName: "Aung Aung",
        bookedAt: "4 Jun 2026 12:30",
        status: "Canceled",
        startedAt: "4 Jun 2026 12:40",
        employee: "Hla Hla",
    },
];

const items = [
    { label: "Pending", key: "Pending" },
    { label: "Completed", key: "Completed" },
    { label: "Canceled", key: "Canceled" },
    { label: "Progress", key: "Progress" },
];

const Booking = () => {
    const [dataSource, setDataSource] = useState(initialData);
    const [searchText, setSearchText] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    // Handles the selection from the dropdown
    const handleMenuClick = (record, e) => {
        const nextStatus = e.key;

        // Update only the specific row data
        const updatedData = dataSource.map((item) => {
            if (item.key === record.key) {
                return { ...item, status: nextStatus };
            }
            return item;
        });

        setDataSource(updatedData);
        messageApi.success(`Updated status to ${nextStatus}`);
    };

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Service",
            key: "service",
            children: [
                {
                    title: "service name",
                    dataIndex: "serviceName",
                    key: "serviceName",
                },
                {
                    title: "price",
                    dataIndex: "price",
                    key: "price",
                },
            ],
        },
        {
            title: "Customer-name",
            dataIndex: "customerName",
            key: "customerName",
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.customerName)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            title: "Booking Status",
            key: "booking",
            children: [
                {
                    title: "Booked At",
                    dataIndex: "bookedAt",
                    key: "bookedAt",
                },
                {
                    title: "Current Status",
                    dataIndex: "status",
                    key: "status",
                    render: (text, record) => {
                        const menuProps = {
                            items,
                            onClick: (e) => handleMenuClick(record, e),
                        };

                        return (
                            <Dropdown menu={menuProps} trigger={["click"]}>
                                <Button>
                                    <span className="bg-amber-400 px-2 rounded-md">
                                        {text}
                                    </span>{" "}
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                        );
                    },
                },
                {
                    title: "Started At",
                    dataIndex: "startedAt",
                    key: "startedAt",
                },
            ],
        },
        {
            title: "Employee",
            dataIndex: "employee",
            key: "employee",
        },
    ];

    return (
        <div>
            {contextHolder} {/* for message alert noti */}
            <SubHeaderSection setSearchText={setSearchText} title={"Booking"} />
            <div className="table-wrapper">
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    );
};

export default Booking;
