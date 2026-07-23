import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Card, Space, Flex } from "antd";
import { useGetMetricDataQuery } from "./userApi";

const CustomerSummaryCard = ({ filteredValue, setFilteredValue }) => {
    const { data: metrics } = useGetMetricDataQuery();

    const CustomerSummaryCards = [
        {
            title: "Total Customer",
            value: (
                <span className="text-pending font-semibold">
                    {metrics?.totalCustomers ?? 0}
                </span>
            ),
            filterType: "All",
        },
        {
            title: "Today's Booking",
            value: (
                <span className="text-available font-semibold">
                    {metrics?.todayBookings ?? 0}
                </span>
            ),
            filterType: null,
        },
        {
            title: "Blocked Customer",
            value: (
                <span className="text-unavailable font-semibold">
                    {metrics?.blockedCustomers ?? 0}
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
                            <Flex justify="space-between" align="center">
                                <p className="text-2xl">{card.value}</p>

                                {card.filterType &&
                                    filteredValue !== card.filterType && (
                                        <button
                                            type="button"
                                            className="text-blue-700 hover:underline group cursor-pointer flex items-center gap-1"
                                            onClick={() =>
                                                setFilteredValue(
                                                    card.filterType,
                                                )
                                            }
                                        >
                                            <span>View</span>
                                            <ArrowRightOutlined className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )}

                                {filteredValue === card.filterType && (
                                    <span className="text-xs text-green-700 font-medium bg-green-100 px-2.5 py-1 rounded-md">
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
