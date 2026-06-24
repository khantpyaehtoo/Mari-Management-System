import { Modal, Typography, Space, Button, Flex, Input } from "antd";
import { useState } from "react";

const OverviewModal = ({
    isViewModalOpen,
    setIsViewModalOpen,
    selectedBooking,
    onConfirmCancel,
}) => {
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const handleClose = () => {
        setIsCancelling(false);
        setCancelReason("");
        setIsViewModalOpen(false);
    };

    const handleConfirmSubmit = () => {
        if (onConfirmCancel) {
            onConfirmCancel(selectedBooking?.bookingId, cancelReason);
        }
        handleClose();
    };
    return (
        <Modal
            title={<h1>Booking Overview {selectedBooking.status}</h1>}
            open={isViewModalOpen}
            onCancel={handleClose}
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
                <div className="w-full border-gray-400 border p-4 rounded-xl">
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

                {/* {selectedBooking.status === "Confirm" && (
                    <div className="flex justify-center my-6">
                        <Button className="w-full! h-10! bg-red-600! text-gray-200! rounded-lg! hover:shadow-md! hover:bg-red-800!">
                            Cancel Booking
                        </Button>
                    </div>
                )} */}

                {selectedBooking.status === "Confirm" && (
                    <div className="my-6">
                        {!isCancelling ? (
                            <Button
                                className="w-full! h-10! bg-red-600! text-gray-200! rounded-lg! hover:shadow-md! hover:bg-red-800!"
                                onClick={() => setIsCancelling(true)}
                            >
                                Cancel Booking
                            </Button>
                        ) : (
                            <Space vertical className="w-full" size="middle">
                                <div className="w-full">
                                    <p className="font-semibold mb-2 text-gray-600">
                                        Reason for cancellation:
                                    </p>
                                    <Input.TextArea
                                        rows={3}
                                        placeholder="Please tell us why you want to cancel this booking..."
                                        value={cancelReason}
                                        onChange={(e) =>
                                            setCancelReason(e.target.value)
                                        }
                                        className="rounded-lg! border border-gray-400! p-2!"
                                    />
                                </div>
                                <Flex gap="middle">
                                    <Button
                                        danger
                                        type="primary"
                                        className="flex-1! h-10! rounded-lg!"
                                        disabled={!cancelReason.trim()}
                                        onClick={handleConfirmSubmit}
                                    >
                                        Confirm Cancel
                                    </Button>
                                    <Button
                                        className="flex-1! h-10! rounded-lg! hover:bg-primary! hover:text-white!"
                                        onClick={() => setIsCancelling(false)}
                                    >
                                        Back
                                    </Button>
                                </Flex>
                            </Space>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default OverviewModal;
