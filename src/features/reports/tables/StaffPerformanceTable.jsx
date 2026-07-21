import { Space, Table, Typography } from "antd";

const staffColumns = [
    {
        title: "Staff Info",
        dataIndex: "staffName",
        key: "employeeInfo",
        render: (text, record) => (
            <Space vertical>
                <div className="font-medium">{text}</div>
                <div className="text-xs text-gray-400">{record.staffCode}</div>
            </Space>
        ),
    },
    {
        title: "Services Completed",
        dataIndex: "completedJobsCount",
        key: "completedJobsCount",
    },
    {
        title: "Client Rating",
        dataIndex: "ratingAverage",
        key: "ratingAverage",
        render: (rating) => {
            return rating !== undefined && rating !== null ? (
                <p>⭐ {Number(rating).toFixed(1)}</p>
            ) : (
                <p>-</p>
            );
        },
    },
    {
        title: "Revenue",
        dataIndex: "totalRevenue",
        key: "totalRevenue",
        render: (val) => (
            <>
                {val?.toLocaleString() || 0} <small>MMK</small>
            </>
        ),
    },
    {
        title: "Commission",
        dataIndex: "totalCommission",
        key: "totalCommission",
        render: (val) => (
            <>
                {val?.toLocaleString() || 0} <small>MMK</small>
            </>
        ),
    },
];

const StaffPerformanceTable = ({
    formattedDate,
    staffPerform,
    isStaffFetching,
}) => {
    return (
        <section className="mb-10">
            <Space vertical size="small" className="w-full mb-3">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 m-0!"
                >
                    Staff's Performance ({formattedDate})
                </Typography.Title>
                <Typography.Text className="text-gray-600 px-3 block">
                    Track completed bookings, customer ratings, and overall
                    performance.
                </Typography.Text>
            </Space>
            <div className="table-wrapper">
                <Table
                    columns={staffColumns}
                    dataSource={staffPerform}
                    loading={isStaffFetching}
                    rowKey={(record) => record.id || record.staffCode}
                />
            </div>
        </section>
    );
};

export default StaffPerformanceTable;
