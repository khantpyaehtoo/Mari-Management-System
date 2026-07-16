import { Card, Progress, Space, Spin, Table, Typography } from "antd";
import ReportCards from "./ReportCards";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import ReportBarChart from "./ReportBarChart";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetReportChartDataQuery } from "./reportApi";

// service
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

// Staff Performance
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
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const queryParams = {
        period: "monthly",
        month: selectedDate.format("MM"), // e.g., "07"
        year: selectedDate.format("YYYY"), // e.g., "2026"
    };

    const {
        data: reportResponse,
        isFetching,
        error,
    } = useGetReportChartDataQuery(queryParams);

    const chartData = reportResponse?.chartData || [];

    const handleDateChange = (type, value) => {
        if (type === "month") {
            setSelectedDate(selectedDate.month(value));
        } else if (type === "year") {
            setSelectedDate(selectedDate.year(value));
        }
    };

    const reportConfig = {
        selectedDate: selectedDate,
        onDateChange: handleDateChange,
    };

    return (
        <>
            <SubHeaderSection
                title="Reports & Analystics"
                subTitle="View detailed reports and insights about bookings, revenue, and customer activity."
                reportConfig={reportConfig}
            />

            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mt-5! mb-5!"
                >
                    Report Summary ({selectedDate.format("MMMM, YYYY")})
                </Typography.Title>

                <div className="mx-auto">
                    <ReportCards selectedDate={selectedDate} />
                </div>
            </section>

            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mb-5!"
                >
                    Daily Appointment and Monthly Revenue
                </Typography.Title>
                <div className="mx-auto">
                    <Card className="w-full shadow-sm p-4">
                        <div className="relative w-full h-105! flex items-center justify-center">
                            {isFetching ? (
                                <Spin
                                    size="large"
                                    description="Loading Chart Data..."
                                />
                            ) : error ? (
                                <p className="text-red-500">
                                    Failed to load chart data.
                                </p>
                            ) : (
                                <ReportBarChart chartData={chartData} />
                            )}
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
                        // dataSource={serviceDataSource}
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
                        // dataSource={bookingDataSource}
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
                    <Table columns={column} />
                </div>
            </section>
        </>
    );
};

export default ReportsPage;
