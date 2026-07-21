import { Table, Typography } from "antd";
import { useState } from "react";

const BookingOverviewTable = ({
    formattedDate,
    bookingReport,
    isBookingFetching,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const bookingColumn = [
        {
            title: "No.",
            render: (_, __, index) => (
                <p className="m-0">{(currentPage - 1) * 5 + index + 1}</p>
            ),
        },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: "Total Bookings",
            dataIndex: "totalBookings",
            key: "totalBookings",
        },
        {
            title: "Cancelled Bookings",
            dataIndex: "cancelledBookings",
            key: "cancelledBookings",
        },
        {
            title: "Walk-in Customers",
            dataIndex: "walkInCustomers",
            key: "walkInCustomers",
        },
        { title: "Active Staff", dataIndex: "activeStaff", key: "activeStaff" },
        {
            title: "Total Revenue",
            dataIndex: "totalRevenue",
            key: "totalRevenue",
        },
        { title: "Top Service", dataIndex: "topService", key: "topService" },
    ];

    return (
        <section className="mb-12">
            <Typography.Title
                level={2}
                className="text-xl! font-medium! px-3 mb-5!"
            >
                Booking Overview ({formattedDate})
            </Typography.Title>
            <div className="table-wrapper">
                <Table
                    columns={bookingColumn}
                    dataSource={bookingReport}
                    loading={isBookingFetching}
                    rowKey={(record, idx) => record.id || record.date || idx}
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

export default BookingOverviewTable;
