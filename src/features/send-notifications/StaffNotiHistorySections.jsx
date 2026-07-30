import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, Spin } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetStaffNotificationsQuery } from "./notificationApi";
import { getImageUrl } from "../../app/core/functions/getImageUrl";

dayjs.extend(relativeTime);
// const DUMMY_NOTIFICATIONS = [
//     {
//         id: "1",
//         title: "System Maintenance Notice",
//         message:
//             "The system will be undergoing scheduled maintenance tonight from 12:00 AM to 2:00 AM.",
//         type: "warning",
//         imageUrl:
//             "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500", // Sample Image
//         createdAt: new Date().toISOString(),
//     },
//     {
//         id: "2",
//         title: "New Policy Update",
//         message:
//             "Please review the updated staff guidelines in the company portal.",
//         type: "info",
//         imageUrl: null, // Image မပါတဲ့ card အတွက် စမ်းဖို့
//         createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
//     },
//     {
//         id: "3",
//         title: "Emergency Announcement",
//         message:
//             "All staff are required to submit their monthly report by 5 PM today.",
//         type: "urgent",
//         imageUrl:
//             "https://images.unsplash.com/photo-1557683316-973673baf926?w=500",
//         createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
//     },
// ];
const StaffNotiHistorySections = ({ getNotificationIcon, showDeleteModal }) => {
    const { data, isLoading } = useGetStaffNotificationsQuery();

    const staffNotis = Array.isArray(data) ? data : data?.content || [];

    // const staffNotis = DUMMY_NOTIFICATIONS;

    return (
        <div className="w-1/2 h-full overflow-y-auto border-e border-e-gray-400 px-5 py-2 space-y-4!">
            <h1 className="font-semibold sticky top-0 py-5 px-4 rounded-2xl shadow-md w-full z-10 mb-4 bg-white-form border border-gray-400 text-gray-500">
                Sent Notifications (Staffs)
            </h1>

            {isLoading ? (
                <div className="py-10 text-center">
                    <Spin size="large" />
                </div>
            ) : staffNotis.length === 0 ? (
                <Empty
                    description="No staff notifications sent yet"
                    className="pt-10"
                />
            ) : (
                staffNotis.map((noti) => {
                    const uiConfig = getNotificationIcon
                        ? getNotificationIcon(noti.type)
                        : { bg: "bg-pink-50", icon: null };

                    const fullImgUrl = getImageUrl(noti.imageUrl);

                    return (
                        <Card
                            key={noti.id}
                            className="border-gray-300! shadow-sm! rounded-xl! hover:shadow-md! transition-shadow!"
                        >
                            <Flex justify="space-between" align="start">
                                <div
                                    className={`${uiConfig.bg} me-5 rounded-2xl p-3 shrink-0 flex items-center justify-center`}
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
