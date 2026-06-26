import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Card, Space, Flex } from "antd";

const CustomerSummaryCard = ({ dummyData, data }) => {
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

    const handleChange = () => {
        console.log("click");
        data;
    };

    return (
        <Row gutter={20} className="px-2! my-10!">
            {CustomerSummaryCards.map((card, index) => (
                <Col span={8} key={index}>
                    <Card className="rounded-xl! border-2! border-gray-300!">
                        <Space vertical size="large" className="w-full!">
                            <p className="text-primary ps-2">{card.title}</p>
                            <Flex justify="space-between">
                                <p className="text-2xl">{card.value}</p>
                                {index !== 1 && (
                                    <button
                                        className="text-blue-700 hover:underline group"
                                        onClick={() => handleChange()}
                                    >
                                        View{" "}
                                        <ArrowRightOutlined className="mr-2 text-xs group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </Flex>
                        </Space>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CustomerSummaryCard;
