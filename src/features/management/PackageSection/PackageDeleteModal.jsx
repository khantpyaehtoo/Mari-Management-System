import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Typography } from "antd";
import { Trash2 } from "lucide-react";

const PackageDisableModal = ({
    deleteModalOpen,
    selectedPackage,
    setDeleteModalOpen,
    handleDisableConfirm,
    loading = false,
}) => {
    return (
        <Modal
            open={deleteModalOpen}
            title={selectedPackage?.name || "Disable Package"}
            onCancel={() => setDeleteModalOpen(false)}
            footer={null}
        >
            <Typography.Title level={4} className="mt-4!">
                Are you sure you want to disable "
                {selectedPackage?.name || "this package"}"?
            </Typography.Title>

            <Typography.Text type="secondary">
                This package will no longer be visible to customers.
            </Typography.Text>

            <Space className="my-4 w-full justify-end">
                <Button
                    onClick={() => setDeleteModalOpen(false)}
                    className="bg-gray-100!"
                >
                    <CloseCircleOutlined size={14} /> Cancel
                </Button>
                <Button
                    loading={loading}
                    onClick={handleDisableConfirm}
                    className="bg-red-500! text-white! border-red-500!"
                >
                    <Trash2 size={14} /> Delete
                </Button>
            </Space>
        </Modal>
    );
};

export default PackageDisableModal;
