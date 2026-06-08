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
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";
import { useCreateUserMutation } from "../../features/management/user/userApi";

const AddForm = ({ title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { Title } = Typography;
    const dispatch = useDispatch();
    const [createUser] = useCreateUserMutation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form Values", values);
            const { data, error } = await createUser({
                getUserData: values,
                // token,
            });

            if (data) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Successful",
                    }),
                );
                console.log(data);
            } else {
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error.message,
                    }),
                );
            }

            form.resetFields();
            setIsModalOpen(false);
        } catch (err) {
            if (err.errorFields) {
                console.log("Validation Failed:", err.errorFields);
                return;
            }

            console.error("Form Submission failed", err);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: "Error occurred",
                }),
            );
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
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
                <Form form={form} layout="vertical">
                    {title !== "Booking" && (
                        <Form.Item
                            name="name"
                            label={
                                <label className="label-styling">
                                    {title} name
                                </label>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: `Please input ${title} name!`,
                                },
                            ]}
                        >
                            <Input
                                placeholder={`${title} Name`}
                                className="!input-styling"
                            />
                        </Form.Item>
                    )}
                    {title !== "Services" && title !== "Booking" && (
                        <>
                            <Form.Item
                                name="email"
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
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input price!",
                                },
                            ]}
                        >
                            <Input
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
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input service name!",
                                    },
                                ]}
                            >
                                <Input
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
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input price!",
                                    },
                                ]}
                            >
                                <Input
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
                                name="customerName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input customer name!",
                                    },
                                ]}
                            >
                                <Input
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
                                name="employeeName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input employee name!",
                                    },
                                ]}
                            >
                                <Input
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
