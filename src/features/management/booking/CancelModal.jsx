import { Modal, Typography, Space, Button, Input } from "antd";

const CancelModal = ({ viewCancelModal, setViewCancelModal }) => {
    return (
        <Modal
            title={<h1 className="text-xl text-primary">Cancel Booking?</h1>}
            open={viewCancelModal}
            onCancel={() => setViewCancelModal(false)}
            footer={null}
        >
            <Typography.Title
                level={5}
                className="font-medium! font-montserrat!"
            >
                Are you sure you want to reject this booking?
            </Typography.Title>
            <Input.TextArea
                rows={4}
                className=" border! border-gray-300! rounded-xl! my-8! p-3!"
                placeholder="Enter reason for rejection…"
            />
            <Space size={13}>
                <Button
                    className="bg-red-500! h-10! px-10! rounded-xl! text-white! hover:bg-red-800!"
                    onClick={() => setViewCancelModal(false)}
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

export default CancelModal;
