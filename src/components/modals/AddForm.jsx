import { useState } from "react";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Typography,
    Upload,
} from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddForm = ({ title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { Title } = Typography;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log("Form Values", values);
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const config = {
        rules: [
            { type: "object", required: true, message: "Please select time!" },
        ],
    };

    return (
        <>
            <Button
                color="default"
                variant="solid"
                onClick={showModal}
                icon={<PlusCircleOutlined />}
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
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
            >
                {" "}
                <Form form={form}>
                    {title !== "Booking" && (
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
                    )}

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

                    {title === "Booking" && (
                        <>
                            <Form.Item
                                label={
                                    <label className="label-styling">
                                        Service Name
                                    </label>
                                }
                                layout="vertical"
                                name="name"
                            >
                                <Input
                                    required
                                    placeholder="Service name"
                                    className="!input-styling"
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label className="label-styling">
                                        Service Price
                                    </label>
                                }
                                layout="vertical"
                                name="price"
                            >
                                <Input
                                    required
                                    placeholder="Service Price"
                                    className="!input-styling"
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label className="label-styling">
                                        Customer Name
                                    </label>
                                }
                                layout="vertical"
                                name="customerName"
                            >
                                <Input
                                    required
                                    placeholder="Customer Name"
                                    className="!input-styling"
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label className="label-styling">
                                        Employee Name
                                    </label>
                                }
                                layout="vertical"
                                name="employeeName"
                            >
                                <Input
                                    required
                                    placeholder="Employee Name"
                                    className="!input-styling"
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label className="label-styling">
                                        Booked Time
                                    </label>
                                }
                                {...config}
                                layout="vertical"
                                name="date-picker"
                            >
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </Form.Item>
                        </>
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
