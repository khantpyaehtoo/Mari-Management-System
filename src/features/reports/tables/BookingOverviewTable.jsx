import { Table, Typography } from "antd";

const bookingColumn = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
        title: "Total Bookings",
        dataIndex: "total-bookings",
        key: "total-bookings",
    },
    { title: "Cancelled Bookings", dataIndex: "cancelled", key: "cancelled" },
    { title: "Walk-in Customers", dataIndex: "walk-in", key: "walk-in" },
    { title: "Active Staff", dataIndex: "active-staff", key: "active-staff" },
    {
        title: "Total Revenue",
        dataIndex: "total-revenue",
        key: "total-revenue",
    },
    { title: "Top Service", dataIndex: "top-service", key: "top-service" },
    { title: "New Clients", dataIndex: "new-clients", key: "new-clients" },
];

const BookingOverviewTable = ({ formattedDate }) => {
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
                    dataSource={[]}
                    rowKey={(record) => record.id || record.date}
                />
            </div>
        </section>
    );
};

export default BookingOverviewTable;
