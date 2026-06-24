import { Modal, Typography, Space, Button, Input } from "antd";
import { useState } from "react";

const CancelModal = ({
    selectedBooking,
    viewCancelModal,
    setViewCancelModal,
    onConfirmReject,
}) => {
    const [cancelReason, setCancelReason] = useState("");

    const handleClose = () => {
        setViewCancelModal(false);
        setCancelReason("");
    };

    const handleConfirmReject = () => {
        if (onConfirmReject) {
            onConfirmReject(selectedBooking?.bookingId, cancelReason);
        }
        handleClose();
    };

    return (
        <Modal
            title={<h1 className="text-xl text-primary">Cancel Booking?</h1>}
            open={viewCancelModal}
            onCancel={handleClose}
            footer={null}
        >
            <Typography.Title
                level={5}
                className="font-medium! font-montserrat!"
            >
                Are you sure you want to reject this booking?
            </Typography.Title>
            <Input.TextArea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
                className=" border! border-gray-300! rounded-xl! my-8! p-3!"
                placeholder="Enter reason for rejection ..."
            />
            <Space size={13}>
                <Button
                    className="bg-red-500! h-10! px-10! rounded-xl! text-white! hover:bg-red-800!"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    className="bg-green-500! h-10! px-10! rounded-xl! text-white! hover:bg-green-800!"
                    onClick={handleConfirmReject}
                >
                    Confirm
                </Button>
            </Space>
        </Modal>
    );
};

export default CancelModal;
