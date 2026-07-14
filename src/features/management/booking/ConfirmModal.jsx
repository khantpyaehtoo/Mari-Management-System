import { Modal, Typography, Space, Button } from "antd";
import { useBookingDetailsQuery } from "./bookingApi";

const ConfirmModal = ({
    viewConfirmModal,
    setViewConfirmModal,
    handleConfirmBtn,
    selectedBooking,
}) => {
    const { data: bookingDetails } = useBookingDetailsQuery(
        selectedBooking?.id || selectedBooking?.bookingId,
    );

    const handleClose = () => {
        setViewConfirmModal(false);
    };
    const handleConfirm = () => {
        if (handleConfirmBtn) {
            handleConfirmBtn(bookingDetails?.id);
        }
        handleClose();
    };

    return (
        <Modal
            title={<h1 className="text-xl text-primary">Confirm Booking?</h1>}
            open={viewConfirmModal}
            onCancel={handleClose}
            footer={null}
        >
            <Typography.Title
                level={5}
                className="font-medium! font-montserrat! my-10!"
            >
                Are you sure you want to confirm this booking?
            </Typography.Title>
            <Space size={13}>
                <Button
                    className="bg-red-500! h-10! px-10! rounded-xl! text-white! hover:bg-red-800!"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    className="bg-green-500! h-10! px-10! rounded-xl! text-white! hover:bg-green-800!"
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </Space>
        </Modal>
    );
};

export default ConfirmModal;
