import { Modal, Space, Avatar, Flex, Card, Button } from "antd";

const UserDetailModal = ({
    viewModalOpen,
    onClose,
    selectedCustomer,
    handleBlockBtn,
}) => {
    const customerDetailCardItem = [
        {
            title: "Phone Number",
            value: `${selectedCustomer.contact?.phone || undefined} `,
        },
        {
            title: "Status",
            value: `${selectedCustomer.status}`,
        },
        {
            title: "Total Bookings",
            value: `${selectedCustomer.count}`,
        },
        {
            title: "Last Visit",
            value: `${selectedCustomer.lastVisit}`,
        },
    ];

    const handleBlock = () => {
        if (handleBlockBtn) {
            handleBlockBtn(selectedCustomer.customerId);
        }
        onClose();
    };

    return (
        <Modal
            title={<h1>View Detail</h1>}
            open={viewModalOpen}
            onCancel={onClose}
            footer={null}
        >
            <Space className="w-full border-b border-gray-400 pb-3 px-3 my-3">
                <Avatar
                    src={selectedCustomer.profileUrl}
                    size="large"
                    className="w-15! h-15!"
                />
                <Space vertical>
                    <Space>
                        <h1 className="text-xl font-medium">
                            {selectedCustomer.customerName}
                        </h1>
                        -
                        <h1 className="text-primary font-semibold text-xl">
                            {selectedCustomer.customerId}
                        </h1>
                    </Space>
                    <p className="font-medium">
                        {selectedCustomer.contact.email}
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
                            {selectedCustomer.joinedDate}
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
                    Recent Booking
                </h1>
                <div className="text-md border-b border-b-gray-400 py-3!">
                    <Flex justify="space-between" align="center">
                        <p>manicure cleansing</p>
                        <p className="font-semibold">23.6.2026</p>
                    </Flex>
                </div>
            </div>

            <Flex
                justify="end"
                align="center"
                gap="medium"
                className="border-t-2 border-gray-300 pt-4!"
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
                    onClick={handleBlock}
                >
                    Block
                </Button>
            </Flex>
        </Modal>
    );
};

export default UserDetailModal;
