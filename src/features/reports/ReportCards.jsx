import {
    DollarOutlined,
    SlidersOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import DashboardCard from "../../components/dashboard/DashboardCard";

const ReportCards = () => {
    const ReportSummaryCards = [
        {
            icon: <DollarOutlined />,
            trending: "+20% last month",
            value: "467k",
            title: "Total Revenue This Month (June,2026)",
        },
        {
            icon: <SlidersOutlined />,
            trending: "-20% last month",
            value: "100",
            title: "Total Bookings This Month (June,2026)",
        },
        {
            icon: <UserOutlined />,
            trending: "+20% last month",
            value: "876",
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
                    />
                </Col>
            ))}
        </Row>
    );
};

export default ReportCards;
