import { useState } from "react";
import { Button, Modal } from "antd";

const showModal = () => {
    setIsModalOpen(true);
};

const handleOk = () => {
    setIsModalOpen(false);
};

const handleCancel = () => {
    setIsModalOpen(false);
};

const addServicesForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default addServicesForm;
