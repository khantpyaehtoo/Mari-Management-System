import { Modal, Typography, Space, Button, Flex } from "antd";

const OverviewModal = ({
    isViewModalOpen,
    setIsViewModalOpen,
    selectedBooking,
}) => {
    return (
        <Modal
            title={<h1>Booking Overview {selectedBooking.status}</h1>}
            open={isViewModalOpen}
            onCancel={() => setIsViewModalOpen(false)}
            footer={null}
        >
            <div className="w-full">
                <Space vertical className="w-full py-4">
                    <p>
                        <span className="font-semibold">Booking ID :</span>{" "}
                        {selectedBooking.bookingId}
                    </p>
                    <p>
                        <span className="font-semibold">Customer Name :</span>{" "}
                        {selectedBooking.customerName}
                    </p>
                    <p>
                        <span className="font-semibold">Phone :</span>{" "}
                        {selectedBooking.phone}
                    </p>
                </Space>
                <div className="w-full border-gray-400! border p-4 rounded-xl">
                    <Typography.Title
                        level={3}
                        className="font-montserrat! font-medium! text-primary!"
                    >
                        Appointment Details
                    </Typography.Title>
                    <ul className="border-b border-b-gray-400 px-7 pb-4 flex flex-col list-disc marker:text-primary marker:text-2xl">
                        <li>
                            {selectedBooking.date}. {selectedBooking.bookedTime}
                        </li>
                        <li>{selectedBooking.staffName}</li>
                        <li>
                            {selectedBooking.serviceName} (
                            {selectedBooking.duringTime})
                        </li>
                    </ul>
                    <Flex
                        justify="space-between"
                        className="p-3! font-semibold!"
                    >
                        <h3>Total Charges</h3>
                        <h3>{selectedBooking.price}</h3>
                    </Flex>
                </div>
                {selectedBooking.status === "In Progress" && (
                    <h2 className="text-xl font-medium text-red-600 text-center p-7">
                        You can’t cancel this booking.
                    </h2>
                )}
                {selectedBooking.status === "Completed" && (
                    <h2 className="text-xl font-medium text-green-600 text-center p-7">
                        Booking completed successfully.
                    </h2>
                )}
                {selectedBooking.status === "Reject" && (
                    <h2 className="text-xl font-medium text-red-600 text-center p-7">
                        Booking Rejected.
                    </h2>
                )}
                {selectedBooking.status === "Confirm" && (
                    <div className="flex justify-center my-6">
                        <Button className="w-full! h-10! bg-red-600! text-gray-200! rounded-lg! hover:shadow-md! hover:bg-red-800!">
                            Cancel Booking
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default OverviewModal;
