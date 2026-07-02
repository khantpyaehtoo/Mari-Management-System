import { Card, Flex, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const BookingCard = () => {
    return (
        <Card>
            <Flex justify="space-between">
                <Space vertical size="small">
                    <Typography.Title
                        level={4}
                        className="font-medium! text-start! m-0!"
                    >
                        Today's Bookings
                    </Typography.Title>
                    <p className="text-gray-600">June 24, 2026</p>
                </Space>
                <Link to={"management/booking"} className="underline!">
                    View All
                </Link>
            </Flex>

            <section className="mt-5">
                <div className="border-2! border-primary! rounded-2xl! px-10! py-5! mb-3">
                    <Flex vertical>
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl! font-medium!">Myo Myo</h1>
                            <p className="text-end">10:00 AM</p>
                        </div>
                        <p className="text-sm mb-2">Gel Manicure + Nail Art</p>

                        <div className="flex items-center justify-between">
                            <Tag
                                style={{
                                    background: "oklch(0.7 0.1 218 / 67.78%)",
                                    color: "black",
                                    padding: "5px 18px",
                                    marginTop: "2px",
                                    borderRadius: "10px",
                                }}
                                variant="filled"
                            >
                                Confirmed
                            </Tag>
                            <p className="text-end">25,000 mmk</p>
                        </div>
                    </Flex>
                </div>
                <div className="border-2! border-primary! rounded-2xl! px-10! py-5! mb-3">
                    <Flex vertical>
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl! font-medium!">Myo Myo</h1>
                            <p className="text-end">10:00 AM</p>
                        </div>
                        <p className="text-sm mb-2">Gel Manicure + Nail Art</p>

                        <div className="flex items-center justify-between">
                            <Tag
                                style={{
                                    background: "oklch(0.7 0.1 218 / 67.78%)",
                                    color: "black",
                                    padding: "5px 18px",
                                    marginTop: "2px",
                                    borderRadius: "10px",
                                }}
                                variant="filled"
                            >
                                Confirmed
                            </Tag>
                            <p className="text-end">25,000 mmk</p>
                        </div>
                    </Flex>
                </div>
            </section>
        </Card>
    );
};

export default BookingCard;
