import {
    DollarOutlined,
    SlidersOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { useGetDashBoardCardStatsQuery } from "../../components/dashboard/dashboardApi";
import dayjs from "dayjs";
import { getTrendingText } from "../../app/core/functions/getTrendingText";

const ReportCards = ({ queryParams }) => {
    const { data: reportData, isLoading } =
        useGetDashBoardCardStatsQuery(queryParams);

    const selectedYear = queryParams?.year || dayjs().year();
    const selectedMonthName = queryParams?.month
        ? typeof queryParams.month === "number"
            ? dayjs()
                  .month(queryParams.month - 1)
                  .format("MMMM")
            : queryParams.month
        : dayjs().format("MMMM");

    const ReportSummaryCards = [
        {
            icon: <DollarOutlined />,
            trending: getTrendingText(reportData?.revenueGrowthPercentage),
            value: reportData?.totalRevenue
                ? `${reportData.totalRevenue.toLocaleString()}`
                : "0",
            title: `Total Revenue This Month (${selectedMonthName}, ${selectedYear})`,
        },
        {
            icon: <SlidersOutlined />,
            trending: getTrendingText(reportData?.bookingsGrowthPercentage),
            value: reportData?.totalBookings || "0",
            title: `Total Bookings This Month (${selectedMonthName}, ${selectedYear})`,
        },
        {
            icon: <UserOutlined />,
            trending: getTrendingText(reportData?.customersGrowthPercentage),
            value: reportData?.totalCustomers || "0",
            title: `Total Customers (${selectedMonthName}, ${selectedYear})`,
        },
    ];

    return (
        <Row gutter={16} className="px-2! my-10!">
            {ReportSummaryCards.map((card, index) => (
                <Col span={8} key={index}>
                    <DashboardCard
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        trending={card.trending}
                        isLoading={isLoading}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default ReportCards;
