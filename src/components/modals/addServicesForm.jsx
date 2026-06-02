import { useState } from "react";
import { Button, Modal, Typography } from "antd";

const addServicesForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Title } = Typography;
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                className="!bg-black !text-white !p-3 !shadow-sm"
            >
                Add Service
            </Button>
            <Modal
                title={<Title level={3}>Add Service</Title>}
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form action="" method="">
                    <div className="flex flex-col space-y-1 my-7">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Service Name
                        </label>
                        <input
                            placeholder="Service Name"
                            className="input-styling"
                        />
                    </div>

                    <div className="flex flex-col space-y-1 my-7">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Service Price
                        </label>
                        <input
                            placeholder="Service Price"
                            className="input-styling"
                        />
                    </div>

                    <div>
                        <label>Image</label>
                        <input
                            placeholder="Image"
                            className="input-styling mb-10"
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default addServicesForm;
