import {
    DollarOutlined,
    SlidersOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { useGetDashBoardCardStatsQuery } from "../../components/dashboard/dashboardApi";

const ReportCards = () => {
    const { data: reportData, isLoading } = useGetDashBoardCardStatsQuery();
    const ReportSummaryCards = [
        {
            icon: <DollarOutlined />,
            trending: reportData?.revenueTrending || "+0% last month",
            value: reportData?.totalRevenue || "0k",
            title: "Total Revenue This Month (June,2026)",
        },
        {
            icon: <SlidersOutlined />,
            trending: reportData?.bookingsTrending || "-0% last month",
            value: reportData?.totalBookings || "0",
            title: "Total Bookings This Month (June,2026)",
        },
        {
            icon: <UserOutlined />,
            trending: reportData?.customersTrending || "+0% last month",
            value: reportData?.totalCustomers || "0",
            title: "Total Customers (May,2026)",
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
