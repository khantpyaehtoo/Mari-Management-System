import { Modal, Spin } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { BellRing, PartyPopper, TriangleAlert, Info } from "lucide-react";
import {
    useGetStaffNotificationsQuery,
    useGetCustomerNotificationsQuery,
    useDeleteNotiHistoryMutation,
    useCreateNotificationMutation,
} from "./notificationApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomerNotiHistorySection from "./CustomerNotiHistorySection";
import StaffNotiHistorySections from "./StaffNotiHistorySections";

dayjs.extend(relativeTime);

const Notifications = () => {
    const dispatch = useDispatch();

    const { data: staffNotis = [], isLoading: isStaffLoading } =
        useGetStaffNotificationsQuery();
    const { data: customerData, isLoading: isCustomerLoading } =
        useGetCustomerNotificationsQuery();

    const customerNotis = customerData?.content || [];

    const [deleteNoti] = useDeleteNotiHistoryMutation();
    const [createNotification] = useCreateNotificationMutation();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedNotiId, setSelectedNotiId] = useState(null);

    // Dynamic UI Config
    const getNotificationIcon = (type) => {
        switch (type?.toUpperCase()) {
            case "PROMOTION":
                return {
                    icon: <PartyPopper size={30} className="text-primary" />,
                    bg: "bg-primary-sec",
                };
            case "BOOKING":
            case "ANNOUNCEMENT":
                return {
                    icon: <BellRing size={30} className="text-primary" />,
                    bg: "bg-primary-sec",
                };
            case "ALERT":
                return {
                    icon: (
                        <TriangleAlert size={30} className="text-unavailable" />
                    ),
                    bg: "bg-red-50",
                };
            default:
                return {
                    icon: <Info size={30} className="text-gray-500" />,
                    bg: "bg-gray-100",
                };
        }
    };

    const showDeleteModal = (id) => {
        setSelectedNotiId(id);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedNotiId) return;
        try {
            await deleteNoti(selectedNotiId).unwrap();
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Deleted successfully",
                }),
            );
            setDeleteModalOpen(false);
            setSelectedNotiId(null);
        } catch (error) {
            let errorMessage = error?.data?.message || "Delete failed occurred";
            dispatch(
                setMessage({ msgType: "error", msgContent: errorMessage }),
            );
        }
    };

    const isGlobalLoading = isStaffLoading || isCustomerLoading;

    return (
        <>
            <SubHeaderSection
                title="Sent Notifications"
                subTitle="You can send notifications to staffs & customers."
                formType={["To Staff", "To Customer"]}
                triggerCreate={createNotification}
            />

            {isGlobalLoading ? (
                <div className="w-full h-[calc(100vh-150px)] flex items-center justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="flex w-full h-[calc(100vh-150px)] mt-4 overflow-hidden">
                    {/* LEFT COLUMN: STAFFS */}
                    <StaffNotiHistorySections
                        staffNotis={staffNotis}
                        getNotificationIcon={getNotificationIcon}
                        showDeleteModal={showDeleteModal}
                    />

                    {/* RIGHT COLUMN: CUSTOMERS */}
                    <CustomerNotiHistorySection
                        customerNotis={customerNotis}
                        showDeleteModal={showDeleteModal}
                        getNotificationIcon={getNotificationIcon}
                    />
                </div>
            )}

            <Modal
                title="Confirm Delete"
                open={deleteModalOpen}
                onOk={handleDeleteConfirm}
                onCancel={() => {
                    setDeleteModalOpen(false);
                    setSelectedNotiId(null);
                }}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this notification?</p>
            </Modal>
        </>
    );
};

export default Notifications;
