import { useState } from "react";
import { Button, Form, Input, Modal, Typography, Upload } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddForm = ({ title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [formValue, setFormValue] = useState("");
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
                    <Form.Item
                        layout="vertical"
                        name="name"
                        label={
                            <label className="label-styling">
                                {title} name
                            </label>
                        }
                    >
                        <Input
                            required
                            placeholder={`${title} Name`}
                            className="!input-styling"
                        />
                    </Form.Item>

                    {title !== "Services" && title !== "Booking" && (
                        <>
                            <Form.Item
                                name="email"
                                layout="vertical"
                                label={
                                    <label className="label-styling">
                                        {title} Email
                                    </label>
                                }
                                hasFeedback
                                rules={[
                                    {
                                        type: "email",
                                        message: "The input is not valid email",
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

                            <Form.Item
                                layout="vertical"
                                name="password"
                                label={
                                    <label className="label-styling">
                                        password
                                    </label>
                                }
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input password",
                                    },
                                    {
                                        min: 8,
                                        message:
                                            "Password must be at least 8 characters",
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
                        </>
                    )}

                    {title === "Services" && (
                        <Form.Item
                            label={
                                <label className="label-styling">
                                    {title} Price
                                </label>
                            }
                            layout="vertical"
                            name="price"
                        >
                            <Input
                                required
                                placeholder={`${title} Price`}
                                className="!input-styling"
                            />
                        </Form.Item>
                    )}

                    {title !== "User" && title !== "Booking" && (
                        <Form.Item
                            label={
                                <label className="label-styling">Image</label>
                            }
                            layout="vertical"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload action="/services" listType="picture-card">
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
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default AddForm;
