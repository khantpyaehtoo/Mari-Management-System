import { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const AddForm = ({ title }) => {
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
                color="default"
                variant="solid"
                onClick={showModal}
                icon={<PlusCircleOutlined />}
                // className="!bg-black !text-white !p-3 !shadow-sm"
            >
                Add {title}
            </Button>
            <Modal
                title={
                    <Title className="uppercase" level={3}>
                        Add {title}
                    </Title>
                }
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form action="" method="">
                    <div className="flex flex-col space-y-1 my-7">
                        <label className="label-styling">{title} Name</label>
                        <input
                            placeholder={`${title} Name`}
                            className="input-styling"
                        />
                    </div>

                    <div className="flex flex-col space-y-1 my-7">
                        <label className="label-styling">{title}</label>
                        <input
                            placeholder={`${title}`}
                            className="input-styling"
                        />
                    </div>

                    <div>
                        <label className="label-styling">Image</label>
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

export default AddForm;
