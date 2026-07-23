import { Card, Spin, Typography } from "antd";
import ReportCards from "./ReportCards";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import ReportBarChart from "./ReportBarChart";
import dayjs from "dayjs";
import { useState } from "react";
import {
    useGetReportBookingOverViewQuery,
    useGetReportChartDataQuery,
} from "./reportApi";
import {
    useGetServicePieChartQuery,
    useGetStaffPerformQuery,
} from "../../components/dashboard/dashboardApi";
import StaffPerformanceTable from "./tables/StaffPerformanceTable";
import BookingOverviewTable from "./tables/BookingOverviewTable";
import RevenueServiceTable from "./tables/RevenueServiceTable";

const ReportsPage = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const isCurrentMonth = selectedDate.isSame(dayjs(), "month");

    // Selected Month Dynamic Query Parameters
    const queryParams = {
        period: isCurrentMonth ? "weekly" : "monthly",
        month: selectedDate.format("MM"),
        year: selectedDate.format("YYYY"),
    };

    // Current Month Revenue Data Query
    const currentMonthParams = {
        period: "weekly",
        month: dayjs().format("MM"),
        year: dayjs().format("YYYY"),
    };

    const { data: currentMonthReportResponse } =
        useGetReportChartDataQuery(currentMonthParams);

    // Current Month Total Revenue
    const currChartData = currentMonthReportResponse?.chartData || [];
    const currTotalRevenue = currChartData.reduce((sum, item) => {
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

    const { data: bookingReport, isFetching: isBookingFetching } =
        useGetReportBookingOverViewQuery(queryParams);
    const bookingoverview = bookingReport?.content || [];
    // console.log("booking: ", bookingoverview)

    const { data: revenueService, isFetching: isServiceFetching } =
        useGetServicePieChartQuery(queryParams);
    const { data: staffPerform, isFetching: isStaffFetching } =
        useGetStaffPerformQuery(queryParams);

    const staffPerformData = Array.isArray(staffPerform)
        ? staffPerform
        : staffPerform?.data?.staffList || staffPerform?.staffList || [];

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
                                    julyRevenue={currTotalRevenue}
                                />
                            )}
                        </div>
                    </Card>
                </div>
            </section>

            <RevenueServiceTable
                formattedDate={formattedDate}
                revenueService={revenueService}
                isServiceFetching={isServiceFetching}
            />

            <BookingOverviewTable
                formattedDate={formattedDate}
                bookingReport={bookingoverview}
                isBookingFetching={isBookingFetching}
            />

            <StaffPerformanceTable
                formattedDate={formattedDate}
                staffPerform={staffPerformData}
                isStaffFetching={isStaffFetching}
            />
        </>
    );
};

export default ReportsPage;
