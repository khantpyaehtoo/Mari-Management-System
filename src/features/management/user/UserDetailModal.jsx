import { Modal, Space, Avatar, Flex, Card, Button, Skeleton } from "antd";
import { useGetDetailUserQuery } from "./userApi";

const UserDetailModal = ({
    viewModalOpen,
    onClose,
    selectedCustomer,
    handleBlockBtn,
}) => {
    const { data: userDetails, isLoading } = useGetDetailUserQuery(
        selectedCustomer?.id,
        { skip: !viewModalOpen || !selectedCustomer?.id },
    );

    if (!selectedCustomer) return null;

    const customerDetailCardItem = [
        {
            title: "Phone Number",
            value: userDetails?.phoneNumber || "N/A",
        },
        {
            title: "Status",
            value: userDetails?.status || "N/A",
        },
        {
            title: "Total Bookings",
            value: userDetails?.totalBookings ?? 0,
        },
        {
            title: "Last Visit",
            value: userDetails?.lastVisit || "N/A",
        },
    ];

    const handleBlock = () => {
        if (handleBlockBtn && userDetails?.customerId) {
            handleBlockBtn(userDetails.customerId);
        }
        onClose();
    };

    return (
        <Modal
            title={<h1 className="text-2xl font-semibold">View Detail</h1>}
            open={viewModalOpen}
            onCancel={onClose}
            footer={null}
        >
            {isLoading ? (
                <div className="py-4">
                    <Space
                        className="w-full border-b border-gray-400 pb-3 px-3 my-3"
                        size="middle"
                    >
                        <Skeleton.Avatar
                            active
                            size="large"
                            shape="circle"
                            className="w-15! h-15!"
                        />
                        <div className="flex flex-col gap-2">
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ width: 180 }}
                            />
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ width: 120 }}
                            />
                        </div>
                    </Space>

                    <div className="customer-grid-wrapper mt-4">
                        <Flex
                            justify="space-between"
                            align="center"
                            className="mb-4!"
                        >
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ width: 150 }}
                            />
                            <Skeleton.Input
                                active
                                size="small"
                                style={{ width: 120 }}
                            />
                        </Flex>
                        <div className="grid-items-2 mx-auto">
                            {[1, 2, 3, 4].map((i) => (
                                <Card
                                    key={i}
                                    className="rounded-xl! border-2! border-gray-200"
                                    style={{ width: 200 }}
                                >
                                    <Skeleton
                                        active
                                        paragraph={{ rows: 1 }}
                                        title={false}
                                    />
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="customer-grid-wrapper my-6">
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 130 }}
                            className="mb-3"
                        />
                        <div className="space-y-3">
                            <Skeleton
                                active
                                paragraph={{ rows: 1 }}
                                title={false}
                            />
                            <Skeleton
                                active
                                paragraph={{ rows: 1 }}
                                title={false}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Space className="w-full border-b border-gray-400 pb-3 px-3 my-3">
                        <Avatar
                            src={
                                userDetails?.profilePicture ||
                                userDetails?.profileUrl
                            }
                            size="large"
                            className="w-15! h-15!"
                        />
                        <Space vertical>
                            <Space>
                                <h1 className="text-xl font-medium">
                                    {userDetails?.customerName}
                                </h1>
                                -
                                <h1 className="text-primary font-semibold text-xl">
                                    {userDetails?.customerId}
                                </h1>
                            </Space>
                            <p className="font-medium text-gray-500">
                                {userDetails?.email}
                            </p>
                        </Space>
                    </Space>

                    <div className="customer-grid-wrapper">
                        <Flex justify="space-between" align="center">
                            <h1 className="text-primary font-semibold text-lg">
                                Customer Summary
                            </h1>
                            <h1>
                                Joined Date:{" "}
                                <span className="font-semibold">
                                    {userDetails?.joinDate}
                                </span>
                            </h1>
                        </Flex>

                        <div className="grid-items-2 mt-5 mx-auto">
                            {customerDetailCardItem.map((item, index) => (
                                <Card
                                    key={index}
                                    className="rounded-xl! border-2! border-gray-300"
                                    style={{ width: 200 }}
                                >
                                    <Space vertical size="small">
                                        <h1 className="font-normal text-gray-400">
                                            {item.title}
                                        </h1>
                                        <p className="text-small font-medium">
                                            {item.value}
                                        </p>
                                    </Space>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="customer-grid-wrapper my-4">
                        <h1 className="text-primary font-medium text-lg mb-3">
                            Recent Bookings
                        </h1>
                        {userDetails?.recentBookings &&
                        userDetails.recentBookings.length > 0 ? (
                            userDetails.recentBookings.map((booking, index) => (
                                <div
                                    key={index}
                                    className="text-md border-b border-b-gray-400 py-3!"
                                >
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                    >
                                        <p className="capitalize">
                                            {booking.serviceName}
                                        </p>
                                        <p className="font-semibold">
                                            {booking.bookingDate}
                                        </p>
                                    </Flex>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center py-4">
                                No recent bookings found.
                            </p>
                        )}
                    </div>
                </>
            )}

            {/* Action Buttons (Always visible at the bottom) */}
            <Flex
                justify="end"
                align="center"
                gap="medium"
                className="border-t-2 border-gray-300 pt-4! mt-4"
            >
                <Button
                    type="primary"
                    className="text-lg! text-white! rounded-xl! p-6!"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    className="bg-red-500! text-lg! text-white! rounded-xl! p-6! hover:bg-red-800!"
                    disabled={isLoading}
                    onClick={handleBlock}
                >
                    Block
                </Button>
            </Flex>
        </Modal>
    );
};

export default UserDetailModal;
