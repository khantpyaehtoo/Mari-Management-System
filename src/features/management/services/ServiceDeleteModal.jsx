import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Typography } from "antd";
import { Trash2 } from "lucide-react";

const ServiceDeleteModal = ({
    deleteModalOpen,
    selectedService,
    setDeleteModalOpen,
    handleDeleteConfirm,
}) => {
    return (
        <Modal
            open={deleteModalOpen}
            title={selectedService?.name || "Delete Service"}
            onCancel={() => setDeleteModalOpen(false)}
            footer={null}
        >
            <Typography.Title level={4} className="mt-4!">
                Are you sure you want to delete this "
                {selectedService?.name || "Service"}"?
            </Typography.Title>
            <Space className="my-4 w-full justify-end">
                <Button
                    onClick={() => setDeleteModalOpen(false)}
                    className="bg-gray-100!"
                >
                    <CloseCircleOutlined size={14} /> Cancel
                </Button>
                <Button
                    onClick={handleDeleteConfirm}
                    className="bg-red-500! text-white! border-red-500!"
                >
                    <Trash2 size={14} /> Delete
                </Button>
            </Space>
        </Modal>
    );
};

export default ServiceDeleteModal;
