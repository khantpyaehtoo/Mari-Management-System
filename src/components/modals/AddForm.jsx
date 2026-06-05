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
    // const [formValue, setFormValue] = useState("");
    const [form] = Form.useForm();
    const { Title } = Typography;

    // const employeeName = Form.useForm("employeeName", form);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onFinish = (fieldValue) => {
        try {
            const rawDate = fieldValue["date-picker"];
            const formattedDate = rawDate
                ? rawDate.format("YYYY-MM-DD HH:mm:ss")
                : new Date().toISOString().replace("T", " ").substring(0, 19);
            const values = {
                ...fieldValue,
                "date-picker": formattedDate,
            };
            console.log("Received values of form ", values);
        } catch (err) {
            console.err("error", err);
        } finally {
            form.resetFields();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInput = (e) => {
        const rawData = e.target.value;
        console.log(rawData);
        return rawData;
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
                onOk={onFinish}
                onCancel={handleCancel}
                okText="Create"
            >
                {" "}
                {/* //onFinish={onFinish} */}
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
                                getValueFromEvent={handleInput}
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
