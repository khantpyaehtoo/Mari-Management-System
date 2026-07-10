import { Card, Flex, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetTodayBookingListQuery } from "./dashboardApi";

const BookingCard = () => {
    const { data: todayBooking = [] } = useGetTodayBookingListQuery();

    const getStatusStyles = (status) => {
        switch (status) {
            case "CONFIRMED":
                return { bg: "#e6f4ff", text: "#0958d9", border: "#91caff" };
            case "PENDING":
                return { bg: "#fff7e6", text: "#d46b08", border: "#ffd591" };
            case "COMPLETED":
                return { bg: "#f6ffed", text: "#389e0d", border: "#b7eb8f" };
            case "CANCELLED":
                return { bg: "#fff1f0", text: "#cf1322", border: "#ffa39e" };
            default:
                return { bg: "#f5f5f5", text: "#595959", border: "#d9d9d9" };
        }
    };

    const formattedToday = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Card className="shadow-sm">
            <Flex justify="space-between" align="center">
                <Space vertical size="small">
                    <Typography.Title
                        level={4}
                        className="font-medium! text-start! m-0!"
                    >
                        Today's Bookings
                    </Typography.Title>
                    <p className="text-gray-600 m-0">{formattedToday}</p>
                </Space>
                <Link to={"management/booking"} className="underline!">
                    View All
                </Link>
            </Flex>

            <section className="mt-5 space-y-4 max-h-100 overflow-y-auto pr-1">
                {todayBooking.length > 0 ? (
                    todayBooking.map((booking) => {
                        const tagStyle = getStatusStyles(booking.status);

                        return (
                            <div
                                key={booking.id}
                                className="border-2 border-primary rounded-2xl px-5 py-3"
                            >
                                <Flex vertical>
                                    <div className="flex items-center justify-between mb-2">
                                        <h1 className="text-xl! font-semibold!">
                                            {booking.staffName}
                                        </h1>
                                        <p className="text-end font-medium text-gray-700">
                                            {booking.bookingTime}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-2">
                                        {booking.serviceNames}
                                    </p>

                                    <div className="flex items-center justify-between mt-1">
                                        <Tag
                                            style={{
                                                background: tagStyle.bg,
                                                color: tagStyle.text,
                                                borderColor: tagStyle.border,
                                                padding: "4px 16px",
                                                borderRadius: "20px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {booking.status}
                                        </Tag>
                                        <p className="text-end font-semibold text-primary">
                                            {booking.price.toLocaleString()}{" "}
                                            <small>mmk</small>
                                        </p>
                                    </div>
                                </Flex>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        No bookings scheduled for today.
                    </div>
                )}
            </section>
        </Card>
    );
};

export default BookingCard;
