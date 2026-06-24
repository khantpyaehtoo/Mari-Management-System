import { Modal, Typography, Space, Button } from "antd";

const ConfirmModal = ({ viewConfirmModal, setViewConfirmModal }) => {
    return (
        <Modal
            title={<h1 className="text-xl text-primary">Confirm Booking?</h1>}
            open={viewConfirmModal}
            onCancel={() => setViewConfirmModal(false)}
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
                    onClick={() => setViewConfirmModal(false)}
                >
                    Cancel
                </Button>
                <Button className="bg-green-500! h-10! px-10! rounded-xl! text-white! hover:bg-green-800!">
                    Confirm
                </Button>
            </Space>
        </Modal>
    );
};

export default ConfirmModal;
