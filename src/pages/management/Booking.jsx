import { Table } from "antd";
import { useState } from "react";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";

const data = [
    {
        key: 1,
        service: [
            {
                name: "nail cleaning",
                price: "20,000",
            },
        ],
        customer: "Aung Aung",
        time: "12 May 2004 12:30",
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
            title: "Service-name",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Service-price",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Employee",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Cutomer-name",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Booking-Time",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Employee",
            dataIndex: "id",
            key: "id",
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
