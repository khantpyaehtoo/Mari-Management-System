import { useState } from "react";
import { Button, Form, Input, Modal, Typography, Upload } from "antd";
import {
    LockOutlined,
    PlusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";

const AddForm = ({ title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Title } = Typography;
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCreate = async (values) => {
        setIsModalOpen(false);
        console.log("clicked", values);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
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
                Create {title}
            </Button>

            <Modal
                title={
                    <Title className="uppercase" level={3}>
                        Create {title}
                    </Title>
                }
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleCreate}
                onCancel={handleCancel}
                okText="Create"
            >
                <Form action="" method="">
                    <div>
                        <label className="label-styling">{title} Name</label>
                        <Form.Item name="name">
                            <Input
                                required
                                placeholder={`${title} Name`}
                                className="!input-styling"
                            />
                        </Form.Item>
                    </div>
                    {(title != "Services" && (
                        <>
                            <div>
                                <label className="label-styling">
                                    {title} Email
                                </label>
                                <Form.Item
                                    name="email"
                                    hasFeedback
                                    rules={[
                                        {
                                            type: "email",
                                            message:
                                                "The input is not valid email",
                                        },
                                        {
                                            required: true,
                                            message: "Please input email",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={`${title} Email`}
                                        className="!input-styling"
                                    />
                                </Form.Item>
                            </div>

                            <div>
                                <label className="label-styling">
                                    password
                                </label>
                                <Form.Item
                                    name="password"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input password",
                                        },
                                        {
                                            min: 8,
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        allowClear
                                        // prefix={<LockOutlined />}
                                        placeholder={`${title} Password`}
                                        className="!input-styling"
                                    />
                                </Form.Item>
                            </div>
                        </>
                    )) || (
                        <>
                            <div>
                                <label className="label-styling">
                                    {title} Price
                                </label>
                                <Form.Item name="name">
                                    <Input
                                        required
                                        placeholder={`${title} Price`}
                                        className="!input-styling"
                                    />
                                </Form.Item>
                            </div>
                        </>
                    )}

                    {title != "User" && (
                        <div>
                            <label className="label-styling">Image</label>
                            <Form.Item
                                label="Upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    action="/services"
                                    listType="picture-card"
                                >
                                    <button
                                        style={{
                                            color: "inherit",
                                            cursor: "inherit",
                                            border: 0,
                                            background: "none",
                                        }}
                                        type="button"
                                    >
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                            Upload
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </div>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default AddForm;
