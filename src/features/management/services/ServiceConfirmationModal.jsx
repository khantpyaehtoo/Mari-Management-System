import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Space, Typography } from "antd";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const ServiceConfirmationModal = ({
    deleteModalOpen,
    selectedService,
    setDeleteModalOpen,
    handleRestoreConfirm,
    handleDeleteConfirm,
    categories = [],
    isLoading,
    isDeletedMode,
}) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        if (!selectedService) return;

        const catId = selectedService?.categoryId;

        queueMicrotask(() => {
            setSelectedCategoryId(catId ? Number(catId) : null);
        });
    }, [selectedService]);

    const onRestoreSubmit = () => {
        if (handleRestoreConfirm) {
            handleRestoreConfirm({
                serviceId: selectedService?.id,
                categoryId: selectedCategoryId,
            });
        }
    };

    const categoryOptions = categories
        ?.filter((cat) => cat?.name?.toLowerCase() !== "package")
        ?.map((cat) => ({
            label: cat?.name,
            value: Number(cat?.id),
        }));

    return (
        <Modal
            open={deleteModalOpen}
            title={
                isDeletedMode
                    ? `Restore "${selectedService?.name || "Service"}"`
                    : `Delete "${selectedService?.name || "Service"}"`
            }
            onCancel={() => setDeleteModalOpen(false)}
            footer={null}
            destroyOnHidden
        >
            {isDeletedMode ? (
                /* RESTORE MODE UI */
                <div>
                    <Typography.Text className="text-gray-600 block mt-2">
                        Select a category to restore this service into:
                    </Typography.Text>

                    {/* Category Selection Dropdown */}
                    <div className="mt-3 mb-5">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">
                            Target Category
                        </label>
                        <Select
                            className="w-full"
                            placeholder="Select a category"
                            value={selectedCategoryId}
                            onChange={(value) => setSelectedCategoryId(value)}
                            options={categoryOptions}
                            size="large"
                        />
                    </div>

                    <Space className="my-2 w-full justify-end">
                        <Button
                            onClick={() => setDeleteModalOpen(false)}
                            className="bg-gray-100!"
                            disabled={isLoading}
                        >
                            <CloseCircleOutlined size={14} /> Cancel
                        </Button>
                        <Button
                            onClick={onRestoreSubmit}
                            disabled={!selectedCategoryId}
                            loading={isLoading}
                            className="bg-emerald-600! text-white! border-emerald-600! flex items-center justify-center gap-1.5"
                        >
                            <RefreshCcw size={14} />
                            Restore Service
                        </Button>
                    </Space>
                </div>
            ) : (
                /* DELETE MODE UI */
                <div>
                    <Typography.Title level={5} className="mt-4! text-red-500!">
                        Are you sure you want to delete "
                        {selectedService?.name || "Service"}"?
                    </Typography.Title>
                    <p className="text-xs text-gray-400 mb-4">
                        This action will move the service to Deleted Services.
                    </p>
                    <Space className="my-2 w-full justify-end">
                        <Button
                            onClick={() => setDeleteModalOpen(false)}
                            className="bg-gray-100!"
                            disabled={isLoading}
                        >
                            <CloseCircleOutlined size={14} /> Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            className="bg-red-500! text-white! border-red-500! flex items-center justify-center gap-1.5"
                            loading={isLoading}
                        >
                            <Trash2 size={14} /> Delete
                        </Button>
                    </Space>
                </div>
            )}
        </Modal>
    );
};

export default ServiceConfirmationModal;
