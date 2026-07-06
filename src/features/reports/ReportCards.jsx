import {
    DollarOutlined,
    ImportOutlined,
    SnippetsOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Space } from "antd";

const ReportCards = () => {
    const ReportSummaryCards = [
        {
            icon: <DollarOutlined />,
            title: "467k",
            value: "Total Revenue This Month (June,2026)",
        },
        {
            icon: <ImportOutlined />,
            title: "467k",
            value: "Total Order This Month (June,2026)",
        },
        {
            icon: <SnippetsOutlined />,
            title: "467k",
            value: "Total Revenue This Month (June,2026)",
        },
    ];

    return (
        <Row gutter={16} className="px-2! my-10!">
            {ReportSummaryCards.map((card, index) => (
                <Col span={8} key={index}>
                    <Card className="rounded-xl! border-2! border-gray-300!">
                        <Space vertical size="large">
                            <p className="bg-primary px-6 py-5 w-16 rounded-2xl">
                                {card.icon}
                            </p>
                            <p className="text-2xl">{card.title} MMK</p>
                            <p className="text-primary ps-2">{card.value}</p>
                        </Space>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ReportCards;
