import { Card, Progress, Space, Table, Typography } from "antd";
import ReportCards from "./ReportCards";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import ReportBarChart from "./ReportBarChart";

// service
const serviceDataSource = [
    {
        key: "1",
        services: "Haircut & Styling",
        appointment: 45,
        walk: 15,
        price: "$50",
        revenue: "$3,000",
        count: 60,
        share: 40,
    },
    {
        key: "2",
        services: "Beard Trim & Shave",
        appointment: 20,
        walk: 25,
        price: "$30",
        revenue: "$1,350",
        count: 45,
        share: 30,
    },
    {
        key: "3",
        services: "Hair Coloring",
        appointment: 12,
        walk: 3,
        price: "$120",
        revenue: "$1,800",
        count: 15,
        share: 20,
    },
    {
        key: "4",
        services: "Facial & Skincare",
        appointment: 8,
        walk: 2,
        price: "$75",
        revenue: "$750",
        count: 10,
        share: 10,
    },
];
const serviceColumns = [
    {
        title: "Services",
        dataIndex: "services",
        key: "services",
    },
    {
        title: "Appointment",
        dataIndex: "appointment",
        key: "appointment",
    },
    {
        title: "Walk-in",
        dataIndex: "walk",
        key: "walk",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
    },
    {
        title: "Total Count",
        dataIndex: "count",
        key: "count",
    },
    {
        title: "% of Revenue",
        dataIndex: "share",
        key: "share",
        render: (share) => (
            <div style={{ width: 150 }}>
                <Progress
                    percent={share}
                    size="small"
                    status="active"
                    strokeColor="#2DC72D"
                />
            </div>
        ),
    },
];

// monthly overview
const bookingColumn = [
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Total Bookings",
        dataIndex: "total-bookings",
        key: "total-bookings",
    },
    {
        title: "Cancelled Bookings",
        dataIndex: "cancelled",
        key: "cancelled",
    },
    {
        title: "Walk-in Customers",
        dataIndex: "walk-in",
        key: "walk-in",
    },
    {
        title: "Active Staff",
        dataIndex: "active-staff",
        key: "active-staff",
    },
    {
        title: "Total Revenue",
        dataIndex: "total-revenue",
        key: "total-revenue",
    },
    {
        title: "Top Service",
        dataIndex: "top-service",
        key: "top-service",
    },
    {
        title: "New Clients",
        dataIndex: "new-clients",
        key: "new-clients",
    },
];
const bookingDataSource = [
    {
        key: "1",
        date: "2026-07-01",
        "total-bookings": 42,
        cancelled: 3,
        "walk-in": 12,
        "active-staff": 5,
        "total-revenue": "$2,450",
        "top-service": "Haircut & Styling",
        "new-clients": 8,
    },
    {
        key: "2",
        date: "2026-07-02",
        "total-bookings": 38,
        cancelled: 1,
        "walk-in": 15,
        "active-staff": 4,
        "total-revenue": "$1,980",
        "top-service": "Beard Trim & Shave",
        "new-clients": 5,
    },
    {
        key: "3",
        date: "2026-07-03",
        "total-bookings": 55,
        cancelled: 4,
        "walk-in": 22,
        "active-staff": 6,
        "total-revenue": "$3,620",
        "top-service": "Hair Coloring",
        "new-clients": 14,
    },
    {
        key: "4",
        date: "2026-07-04",
        "total-bookings": 48,
        cancelled: 2,
        "walk-in": 9,
        "active-staff": 5,
        "total-revenue": "$2,890",
        "top-service": "Haircut & Styling",
        "new-clients": 7,
    },
    {
        key: "5",
        date: "2026-07-05",
        "total-bookings": 30,
        cancelled: 5,
        "walk-in": 8,
        "active-staff": 3,
        "total-revenue": "$1,420",
        "top-service": "Facial & Skincare",
        "new-clients": 3,
    },
];

// Employee Performance
const dummyData = [
    {
        key: "1",
        employeeInfo: "ST-0042",
        name: "Phyu Phyu",
        count: "115",
        rating: "4.5",
        revenue: "200,000",
        commission: "20000",
    },
];
const column = [
    {
        title: "Staff Info",
        dataIndex: "employeeInfo",
        key: "employeeInfo",
    },
    {
        title: "Services Completed",
        dataIndex: "count",
        key: "count",
    },
    {
        title: "Client Rating",
        dataIndex: "rating",
        key: "rating",
    },
    {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
    },
    {
        title: "Commission",
        dataIndex: "commission",
        key: "commission",
    },
];

const ReportsPage = () => {
    return (
        <>
            <SubHeaderSection
                title="Reports & Analystics"
                subTitle="View detailed reports and insights about bookings, revenue, and customer activity."
            />

            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mt-5! mb-5!"
                >
                    Report Summary (May, 2026)
                </Typography.Title>

                <div className="mx-auto">
                    <ReportCards />
                </div>
            </section>

            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mb-5!"
                >
                    Daily Appointment and Monthly Revenue (June,2026)
                </Typography.Title>

                <div className="mx-auto">
                    <Card className="w-full shadow-sm p-4">
                        <div className="relative w-full h-105!">
                            <ReportBarChart />
                        </div>
                    </Card>
                </div>
            </section>

            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mb-5!"
                >
                    Revenue by Service (June, 2026)
                </Typography.Title>

                <div className="table-wrapper">
                    <Table
                        columns={serviceColumns}
                        dataSource={serviceDataSource}
                    />
                </div>
            </section>

            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mb-5!"
                >
                    June, 2026 Overview
                </Typography.Title>

                <div className="table-wrapper">
                    <Table
                        columns={bookingColumn}
                        dataSource={bookingDataSource}
                    />
                </div>
            </section>

            <section className="mb-10">
                <Space vertical size="small">
                    <Typography.Title
                        level={2}
                        className="text-xl! font-medium! px-3"
                    >
                        Nail Artist’s Performance (Monthly)
                    </Typography.Title>
                    <p className="text-gray-600 px-3">
                        Track completed bookings, customer ratings, and overall
                        performance.
                    </p>
                </Space>
                <div className="table-wrapper">
                    <Table columns={column} dataSource={dummyData} />
                </div>
            </section>
        </>
    );
};

export default ReportsPage;
