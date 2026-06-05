import { Table } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";

const data = [
    {
        key: 1,
        id: "# 01",
        serviceName: "nail cleaning",
        price: "20,000",
        customerName: "Aung Aung",
        bookedAt: "4 Jun 2026 12:30",
        status: "Finished",
        startedAt: "4 Jun 2026 12:40",
        employee: "Hla Hla",
    },
    {
        key: 1,
        id: "# 01",
        serviceName: "nail designing",
        price: "20,000",
        customerName: "Aung Aung",
        bookedAt: "4 Jun 2026 12:30",
        status: "Finished",
        startedAt: "4 Jun 2026 12:40",
        employee: "Hla Hla",
    },
    {
        key: 1,
        id: "# 01",
        serviceName: "nail removing",
        price: "20,000",
        customerName: "Aung Aung",
        bookedAt: "4 Jun 2026 12:30",
        status: "Finished",
        startedAt: "4 Jun 2026 12:40",
        employee: "Hla Hla",
    },
];

const Booking = () => {
    const [searchText, setSearchText] = useState("");

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
            title: "Cutomer-name",
            dataIndex: "customerName",
            key: "customerName",
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
            <SubHeaderSection setSearchText={setSearchText} title={"Booking"} />

            <div className="table-wrapper">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Booking;
