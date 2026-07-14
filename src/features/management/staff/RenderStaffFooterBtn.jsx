import { Button, Space } from "antd";

const RenderStaffFooterButtons = ({
    selectedStaff,
    handleClose,
    handleDelete,
    handleRehired,
    handleSave,
    handleCancelEdit,
    isEditing,
    setIsEditing,
}) => {
    if (isEditing) {
        return (
            <Space size="medium">
                <Button
                    type="primary"
                    onClick={handleSave}
                    className="p-5! rounded-lg! text-white!"
                >
                    Save
                </Button>
                <Button onClick={handleCancelEdit} className="p-5! rounded-lg!">
                    Cancel
                </Button>
            </Space>
        );
    }

    if (selectedStaff.status === "Terminate") {
        return (
            <Space size="medium">
                <Button onClick={handleClose} className="p-5! rounded-lg!">
                    Cancel
                </Button>
                <Button
                    onClick={handleRehired}
                    className="bg-green-500! p-5! rounded-lg! text-white! hover:bg-green-800!"
                >
                    Rehired
                </Button>
            </Space>
        );
    }

    return (
        <Space size="medium">
            <Button
                type="primary"
                onClick={setIsEditing}
                className="p-5! rounded-lg! text-white!"
            >
                Edit
            </Button>
            <Button
                onClick={handleDelete}
                className="bg-red-500! p-5! rounded-lg! text-white! hover:bg-red-800!"
            >
                Delete
            </Button>
        </Space>
    );
};

export default RenderStaffFooterButtons;
