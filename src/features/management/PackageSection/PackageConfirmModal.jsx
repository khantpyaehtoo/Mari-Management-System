import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Typography } from "antd";
import { Star, StarX } from "lucide-react";

const PackageConfirmModal = ({
    deleteModalOpen,
    selectedPackage,
    setDeleteModalOpen,
    handleDisableConfirm,
    isLoading = false,
    loading = false,
    isEnable = selectedPackage?.enabled === false,
}) => {
    const isBtnLoading = isLoading || loading;

    const actionText = isEnable ? "Restore" : "Disable";
    const actionColor = isEnable
        ? "bg-emerald-600! hover:bg-emerald-700! border-emerald-600! text-white!"
        : "bg-red-500! hover:bg-red-600! border-red-500! text-white!";

    return (
        <Modal
            open={deleteModalOpen}
            title={`${actionText} Package`}
            onCancel={() => setDeleteModalOpen(false)}
            footer={null}
            destroyOnHidden
        >
            <Typography.Title level={4} className="mt-4!">
                Are you sure you want to {actionText.toLowerCase()} "
                {selectedPackage?.name || "this package"}"?
            </Typography.Title>

            <Typography.Text type="secondary">
                {isEnable
                    ? "This package will become active and visible to customers again."
                    : "This package will no longer be visible to customers."}
            </Typography.Text>

            <Space className="my-4 w-full justify-end">
                <Button
                    onClick={() => setDeleteModalOpen(false)}
                    className="bg-gray-100!"
                    disabled={isBtnLoading}
                >
                    <CloseCircleOutlined style={{ fontSize: "14px" }} /> Cancel
                </Button>

                <Button
                    loading={isBtnLoading}
                    onClick={handleDisableConfirm}
                    className={actionColor}
                >
                    {isEnable ? <Star size={14} /> : <StarX size={14} />}{" "}
                    {actionText}
                </Button>
            </Space>
        </Modal>
    );
};

export default PackageConfirmModal;
