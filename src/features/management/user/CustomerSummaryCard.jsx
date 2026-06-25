import { Col, Row, Card, Space } from "antd";

const CustomerSummaryCard = ({ dummyData }) => {
    const CustomerSummaryCards = [
        {
            title: "Total Customer",
            value: <span className="text-pending">{dummyData?.length}</span>,
        },
        {
            title: "Today's Booking",
            value: <span className="text-available">20</span>,
        },
        {
            title: "Blocked Customer",
            value: <span className="text-unavailable">2</span>,
        },
    ];

    return (
        <Row gutter={20} className="px-2! my-10!">
            {CustomerSummaryCards.map((card, index) => (
                <Col span={8} key={index}>
                    <Card className="rounded-xl! border-2! border-gray-300!">
                        <Space vertical size="large">
                            <p className="text-primary ps-2">{card.title}</p>
                            <p className="text-2xl">{card.value}</p>
                        </Space>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CustomerSummaryCard;
