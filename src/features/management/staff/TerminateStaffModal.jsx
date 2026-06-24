import { Modal, Space, Avatar, Button } from "antd";

const TerminateStaffModal = ({
    isTerminateOpen,
    selectedStaff,
    onTerminate,
    handleClose,
}) => {
    const handleTerminateBtn = () => {
        if (onTerminate) {
            onTerminate(selectedStaff.staffId);
        }
        handleClose();
    };
    return (
        <Modal
            title={<h1>Terminate</h1>}
            open={isTerminateOpen}
            okText="Terminate"
            okButtonProps={{ danger: true }}
            onCancel={handleClose}
            footer={null}
        >
            {selectedStaff && (
                <>
                    <Space size="large" className="w-full py-4">
                        <Avatar
                            src={selectedStaff.profileUrl}
                            size="large"
                            className="w-15! h-15!"
                        />
                        <Space vertical>
                            <h1 className="text-xl font-semibold">
                                {selectedStaff.name}
                            </h1>
                            <p>{selectedStaff.staffId}</p>
                        </Space>
                    </Space>
                    <p className="text-xl py-3 mb-5">
                        Are you sure you want to terminate this staff?
                    </p>
                    <Space size="large">
                        <Button
                            onClick={handleClose}
                            className="bg-primary! p-5! rounded-lg! text-white! hover:bg-pink-200!"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleTerminateBtn}
                            className="bg-red-500! p-5! rounded-lg! text-white! hover:bg-red-800!"
                        >
                            Terminate
                        </Button>
                    </Space>
                </>
            )}
        </Modal>
    );
};

export default TerminateStaffModal;
