import { Modal, Typography, Space, Button, Flex, Input, Skeleton } from "antd";
import { useState } from "react";
import { useBookingDetailsQuery } from "./bookingApi";
import { cn } from "../../../lib/utils";
import { useSelector } from "react-redux";

const OverviewModal = ({
    isViewModalOpen,
    setIsViewModalOpen,
    selectedBooking,
    onConfirmCancel,
}) => {
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const token = useSelector((state) => state?.authSlice?.token);

    const { data: bookingDetails, isLoading } = useBookingDetailsQuery(
        selectedBooking?.id, // First argument is ( Query Parameter )
        { skip: !isViewModalOpen }, // Second argument is ( RTK query Option)
    );

    const handleClose = () => {
        setIsCancelling(false);
        setCancelReason("");
        setIsViewModalOpen(false);
    };

    const handleConfirmSubmit = () => {
        if (onConfirmCancel) {
            onConfirmCancel(
                bookingDetails?.id || selectedBooking?.id,
                cancelReason,
                token,
            );
        }
        handleClose();
    };

    const statusClasses = {
        Inprogress: "text-progress",
        Pending: "text-pending",
        Confirm: "text-confirm",
        Completed: "text-completed",
        Available: "text-available",
        Unavailable: "text-unavailable",
        Reject: "text-unavailable",
    };

    const currentStatus = bookingDetails?.status || selectedBooking?.status;

    return (
        <Modal
            title={
                <h1>
                    Booking Overview{" "}
                    {!isLoading && currentStatus && (
                        <span
                            className={cn(
                                "font-medium ml-2 text-lg",
                                statusClasses[currentStatus] || "text-gray-500",
                            )}
                        >
                            ({currentStatus})
                        </span>
                    )}
                </h1>
            }
            open={isViewModalOpen}
            onCancel={handleClose}
            footer={null}
        >
            <Skeleton active loading={isLoading} paragraph={{ rows: 8 }}>
                <div className="w-full">
                    <div className="w-full py-4 space-y-2">
                        <p>
                            <span className="font-semibold">Booking ID :</span>{" "}
                            {bookingDetails?.bookingId}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Customer Name :
                            </span>{" "}
                            {bookingDetails?.customerName}
                        </p>
                        <p>
                            <span className="font-semibold">Phone :</span>{" "}
                            {bookingDetails?.phoneNumber}
                        </p>
                    </div>

                    <div className="w-full bg-white-back border-gray-400 border p-4 rounded-xl">
                        <Typography.Title
                            level={3}
                            className="font-montserrat! font-medium! text-primary! m-0! mb-3!"
                        >
                            Appointment Details
                        </Typography.Title>
                        <ul className="border-b border-b-gray-400 px-7 pb-4 flex flex-col list-disc marker:text-primary marker:text-2xl gap-1">
                            <li>
                                <span className="font-semibold">
                                    Booked Time :
                                </span>{" "}
                                {bookingDetails?.appointmentDetails}
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Staff Name :
                                </span>{" "}
                                {bookingDetails?.staffName}
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Services :
                                </span>{" "}
                                {bookingDetails?.serviceName} (
                                {bookingDetails?.duration} mins)
                            </li>
                        </ul>
                        <Flex
                            justify="space-between"
                            className="pt-3 font-semibold text-lg"
                        >
                            <h3>Total Charges</h3>
                            <h3>{bookingDetails?.price}</h3>
                        </Flex>
                    </div>

                    {/* Action States */}
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
                        <div className="my-6">
                            {!isCancelling ? (
                                <Button
                                    className="w-full! h-10! bg-red-600! text-gray-200! rounded-lg! hover:shadow-md! hover:bg-red-800!"
                                    onClick={() => setIsCancelling(true)}
                                >
                                    Cancel Booking
                                </Button>
                            ) : (
                                <Space
                                    vertical
                                    className="w-full"
                                    size="middle"
                                >
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
                                            onClick={() =>
                                                setIsCancelling(false)
                                            }
                                        >
                                            Back
                                        </Button>
                                    </Flex>
                                </Space>
                            )}
                        </div>
                    )}
                </div>
            </Skeleton>
        </Modal>
    );
};

export default OverviewModal;
