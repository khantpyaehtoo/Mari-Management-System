import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Empty, Flex } from "antd";

const CustomerNotiHistorySection = ({
    customerNotis,
    showDeleteModal,
    getNotificationIcon,
}) => {
    return (
        <div className="w-1/2 h-full overflow-y-auto px-5 py-2 space-y-4">
            <h1 className="font-semibold sticky top-0 py-5 px-4 rounded-2xl shadow-md w-full z-10 bg-backdrop-effects mb-4">
                Sent Notifications (Customers)
            </h1>

            {customerNotis.length === 0 ? (
                <Empty
                    description="No customer notifications sent yet"
                    className="pt-10"
                />
            ) : (
                customerNotis.map((noti) => {
                    const uiConfig = getNotificationIcon(noti.type);
                    return (
                        <Card
                            key={noti.id}
                            className="border-gray-300! shadow-sm! rounded-xl! hover:shadow-md transition-shadow"
                        >
                            <Flex justify="space-between" align="start">
                                <div
                                    className={`${uiConfig.bg} me-5 rounded-2xl p-3 shrink-0`}
                                >
                                    {uiConfig.icon}
                                </div>
                                <div className="grow">
                                    <div className="flex items-start gap-2 mb-1">
                                        <Avatar
                                            src={
                                                noti.profilePicture ||
                                                `https://api.dicebear.com/10.x/lorelei/svg?seed=${noti.id}`
                                            }
                                            className="shrink-0"
                                        />
                                        <h1 className="text-primary font-semibold text-lg">
                                            {noti.title ||
                                                "Customer Notification"}
                                        </h1>
                                    </div>
                                    <div className="space-y-3 pl-10">
                                        <p className="text-sm font-medium text-gray-700">
                                            {noti.customerName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {noti.email} | {noti.phoneNumber}
                                        </p>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {noti.message}
                                        </p>
                                    </div>
                                    <div className="mt-3 pl-10">
                                        <small className="text-gray-400">
                                            {noti.joinDate
                                                ? `Joined: ${noti.joinDate}`
                                                : ""}
                                        </small>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => showDeleteModal(noti.id)}
                                    className="border-0! text-primary! hover:text-red-500! shrink-0"
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
