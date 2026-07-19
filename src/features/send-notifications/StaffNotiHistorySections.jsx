import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex } from "antd";
import dayjs from "dayjs";

const StaffNotiHistorySections = ({
    staffNotis,
    getNotificationIcon,
    showDeleteModal,
}) => {
    return (
        <div className="w-1/2 h-full overflow-y-auto border-e border-e-gray-400 px-5 py-2 space-y-4">
            <h1 className="font-semibold sticky top-0 py-5 px-4 rounded-2xl shadow-md w-full z-10 bg-backdrop-effects mb-4">
                Sent Notifications (Staffs)
            </h1>

            {staffNotis.length === 0 ? (
                <Empty
                    description="No staff notifications sent yet"
                    className="pt-10"
                />
            ) : (
                staffNotis.map((noti) => {
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
                                    <h1 className="text-primary font-semibold text-lg mb-1">
                                        {noti.title}
                                    </h1>
                                    <div className="space-y-3">
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {noti.message}
                                        </p>
                                        {noti.imageUrl && (
                                            <div className="w-full max-w-sm border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                                <img
                                                    src={noti.imageUrl}
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
                                                : "Just now"}
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

export default StaffNotiHistorySections;
