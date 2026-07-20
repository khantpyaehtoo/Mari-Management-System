import { Card, Progress, Space, Spin, Table, Typography } from "antd";
import ReportCards from "./ReportCards";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import ReportBarChart from "./ReportBarChart";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetReportChartDataQuery } from "./reportApi";
import {
    useGetServicePieChartQuery,
    useGetStaffPerformQuery,
} from "../../components/dashboard/dashboardApi";

// service columns
const serviceColumns = [
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

// monthly overview columns
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

// Staff Performance columns
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

const ReportsPage = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const isCurrentMonth = selectedDate.isSame(dayjs(), "month");

    // Selected Month အတွက် Dynamic Query Parameters
    const queryParams = {
        period: isCurrentMonth ? "weekly" : "yearly",
        month: selectedDate.format("MM"),
        year: selectedDate.format("YYYY"),
    };

    // 💡 July (Current Month) ရဲ့ Revenue Data ကို အမြဲရနေအောင် သီးသန့် Query ခေါ်ထားပါမည်
    const currentMonthParams = {
        period: "weekly",
        month: dayjs().format("MM"),
        year: dayjs().format("YYYY"),
    };

    const { data: currentMonthReportResponse } =
        useGetReportChartDataQuery(currentMonthParams);

    // Current Month (July) ရဲ့ Total Revenue ကို Sum တွက်ယူခြင်း
    const julyChartData = currentMonthReportResponse?.chartData || [];
    const julyTotalRevenue = julyChartData.reduce((sum, item) => {
        const rev =
            item.revenueBlock?.totalRevenue ??
            item.totalRevenue ??
            item.revenue ??
            0;
        return sum + Number(rev);
    }, 0);

    const {
        data: reportResponse,
        isFetching: isChartFetching,
        error: chartError,
    } = useGetReportChartDataQuery(queryParams);

    const chartData = reportResponse?.chartData || [];

    const { data: revenueService, isFetching: isServiceFetching } =
        useGetServicePieChartQuery(queryParams);
    const { data: staffPerform, isFetching: isStaffFetching } =
        useGetStaffPerformQuery(queryParams);

    // Date Filter Handler
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

    const formattedDate = selectedDate.format("MMMM, YYYY");

    return (
        <>
            <SubHeaderSection
                title="Reports & Analytics"
                subTitle="View detailed reports and insights about bookings, revenue, and customer activity."
                reportConfig={reportConfig}
            />

            {/* Report Summary */}
            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mt-5! mb-5!"
                >
                    Report Summary ({formattedDate})
                </Typography.Title>
                <div className="mx-auto">
                    <ReportCards
                        selectedDate={selectedDate}
                        queryParams={queryParams}
                    />
                </div>
            </section>

            {/* Chart Data */}
            <section className="mb-12">
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mb-5!"
                >
                    Daily Appointment and Monthly Revenue ({formattedDate})
                </Typography.Title>
                <div className="mx-auto">
                    <Card className="w-full shadow-sm p-4 h-180">
                        <div className="relative w-full min-h-100">
                            {isChartFetching ? (
                                <Spin
                                    size="large"
                                    description="Loading Chart Data..."
                                    className="flex! justify-center! items-center! min-h-100"
                                />
                            ) : chartError ? (
                                <Typography.Text type="danger">
                                    Failed to load chart data.
                                </Typography.Text>
                            ) : (
                                <ReportBarChart
                                    chartData={chartData}
                                    selectedMonth={selectedDate.format("MMMM")}
                                    julyRevenue={julyTotalRevenue}
                                />
                            )}
                        </div>
                    </Card>
                </div>
            </section>

            {/* Revenue by Service */}
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
                    />
                </div>
            </section>

            {/* Booking Overview */}
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

            {/* Staff Performance */}
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
        </>
    );
};

export default ReportsPage;
