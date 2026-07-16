import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Card, Space, Flex } from "antd";

const CustomerSummaryCard = ({
    getAllUserData,
    getBlockUserData,
    filteredValue,
    setFilteredValue,
}) => {
    const CustomerSummaryCards = [
        {
            title: "Total Customer",
            value: (
                <span className="text-pending">
                    {getAllUserData?.content?.length || 0}
                </span>
            ),
            filterType: "All",
        },
        {
            title: "Today's Booking",
            value: <span className="text-available">20</span>,
            filterType: null,
        },
        {
            title: "Blocked Customer",
            // Dynamically show the length from the blocked user data array
            value: (
                <span className="text-unavailable">
                    {getBlockUserData?.content?.length ||
                        getBlockUserData?.length ||
                        0}
                </span>
            ),
            filterType: "Blocked",
        },
    ];

    return (
        <Row gutter={20} className="px-2! my-10!">
            {CustomerSummaryCards.map((card, index) => (
                <Col span={8} key={index}>
                    <Card className="rounded-xl! border-2! border-gray-300!">
                        <Space vertical size="large" className="w-full!">
                            <p className="text-primary ps-2">{card.title}</p>
                            <Flex justify="space-between">
                                <p className="text-2xl">{card.value}</p>

                                {/* Show View button only if it matches a filter action AND isn't already the active view */}
                                {card.filterType &&
                                    filteredValue !== card.filterType && (
                                        <button
                                            className="text-blue-700 hover:underline group"
                                            onClick={() =>
                                                setFilteredValue(
                                                    card.filterType,
                                                )
                                            }
                                        >
                                            View{" "}
                                            <ArrowRightOutlined className="mr-2 text-xs group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )}

                                {/* Quick visual cue to let admin know this is the active table filter list */}
                                {filteredValue === card.filterType && (
                                    <span className="text-xs text-green-400 font-medium bg-green-100 px-2 py-0.5 rounded-md self-center">
                                        Active View
                                    </span>
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
