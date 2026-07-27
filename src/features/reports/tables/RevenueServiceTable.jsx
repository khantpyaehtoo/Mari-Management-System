import { Progress, Table, Typography } from "antd";
import { useState } from "react";

const RevenueServiceTable = ({
    formattedDate,
    revenueService,
    isServiceFetching,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const serviceColumns = [
        {
            title: "No.",
            render: (_, __, index) => (
                <p className="m-0">{(currentPage - 1) * 5 + index + 1}</p>
            ),
        },
        {
            title: "Services",
            dataIndex: "serviceName",
            key: "serviceName",
        },
        {
            title: "In-App Booking",
            dataIndex: "appointment",
            key: "appointment",
        },
        {
            title: "Walk-in",
            dataIndex: "walkIn",
            key: "walkIn",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (val) => (
                <>
                    {val?.toLocaleString() || 0} <small>MMK</small>
                </>
            ),
        },
        {
            title: "Revenue",
            dataIndex: "revenue",
            key: "revenue",
            render: (val) => (
                <>
                    {val?.toLocaleString() || 0} <small>MMK</small>
                </>
            ),
        },
        {
            title: "Total Count",
            dataIndex: "totalCount",
            key: "totalCount",
        },
        {
            title: "% of Revenue",
            dataIndex: "revenuePercentage",
            key: "revenuePercentage",
            render: (percent) => (
                <div style={{ width: 150 }}>
                    <Progress
                        percent={percent}
                        size="small"
                        status="active"
                        strokeColor="#2DC72D"
                    />
                </div>
            ),
        },
    ];

    return (
        <section className="mb-12">
            <Typography.Title
                level={2}
                className="text-xl! font-medium! px-3 mb-5!"
            >
                Revenue by Service ({formattedDate})
            </Typography.Title>
            <div className="table-wrapper">
                <Table
                    columns={serviceColumns}
                    dataSource={revenueService}
                    loading={isServiceFetching}
                    rowKey={(record) => record.id || record.serviceName}
                    bordered
                    pagination={{
                        pageSize: 5,
                        current: currentPage,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />
            </div>
        </section>
    );
};

export default RevenueServiceTable;
