import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, Spin } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetCustomerNotificationsQuery } from "./notificationApi";

dayjs.extend(relativeTime);
const IMAGE_BASE_URL = import.meta.env.VITE_BASE_API;

const CustomerNotiHistorySection = ({
    showDeleteModal,
    getNotificationIcon,
}) => {
    const { data: customerData, isLoading } =
        useGetCustomerNotificationsQuery();

    const customerNotis = Array.isArray(customerData)
        ? customerData
        : customerData?.content || customerData?.data || [];

    return (
        <div className="w-1/2 h-full overflow-y-auto px-5 py-2 space-y-4">
            <h1 className="font-semibold sticky top-0 py-5 px-4 rounded-2xl shadow-md w-full z-10 bg-backdrop-effects mb-4">
                Sent Notifications (Customers)
            </h1>

            {isLoading ? (
                <div className="py-10 text-center">
                    <Spin size="large" />
                </div>
            ) : customerNotis.length === 0 ? (
                <Empty
                    description="No customer notifications sent yet"
                    className="pt-10"
                />
            ) : (
                customerNotis.map((noti) => {
                    // Safe icon resolution with fallback
                    const uiConfig = getNotificationIcon
                        ? getNotificationIcon(noti.type)
                        : { bg: "bg-pink-50", icon: null };

                    const fullImgUrl = `${IMAGE_BASE_URL}${noti.imageUrl}`;

                    return (
                        <Card
                            key={noti.id}
                            className="border-gray-300! shadow-sm! rounded-xl! hover:shadow-md transition-shadow"
                        >
                            <Flex justify="space-between" align="start">
                                <div
                                    className={`${
                                        uiConfig?.bg || "bg-pink-50"
                                    } me-5 rounded-2xl p-3 shrink-0 flex items-center justify-center`}
                                >
                                    {uiConfig?.icon}
                                </div>

                                <div className="grow">
                                    <h1 className="text-primary font-semibold text-lg mb-1">
                                        {noti.title ||
                                            noti.customerName ||
                                            "Customer Notification"}
                                    </h1>

                                    <div className="space-y-3">
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {noti.message ||
                                                "No description provided."}
                                        </p>

                                        {noti.imageUrl && (
                                            <div className="w-full max-w-sm border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                                <img
                                                    src={fullImgUrl}
                                                    className="w-full object-cover max-h-48"
                                                    alt="attachment"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-3">
                                        <small className="text-gray-400">
                                            {noti.createdAt
                                                ? dayjs(
                                                      noti.createdAt,
                                                  ).fromNow()
                                                : noti.joinDate
                                                  ? `Joined: ${noti.joinDate}`
                                                  : "Just now"}
                                        </small>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => showDeleteModal(noti.id)}
                                    className="border-0! text-primary! hover:text-red-500! shrink-0 ms-2"
                                >
                                    <DeleteOutlined className="text-xl" />
                                </Button>
                            </Flex>
                        </Card>
                    );
                })
            )}
        </div>
    );
};

export default CustomerNotiHistorySection;
