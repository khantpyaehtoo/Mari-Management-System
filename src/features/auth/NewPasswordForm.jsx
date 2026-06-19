import { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";
import resetImg2 from "../../../public/asset/Img2.png";
import resetImg3 from "../../../public/asset/Img3.png";
import ellipse from "../../../public/asset/Ellipse.png";

const { Title, Text } = Typography;

const NewPasswordForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [resetPassword] = useResetPasswordMutation();

    const email = location.state?.email || "";

    const onFinish = async (values) => {
        console.log("Submitting new password for:", email, values);
        try {
            setLoading(true);
            const response = await resetPassword(email).unwrap();
            console.log("Reset password API response:", response);

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent:
                        "Password reset successful! Please log in with your new password.",
                }),
            );
            navigate("/login");
        } catch (err) {
            console.error("Reset password failed:", err);
            const errorMessage =
                err?.data?.message || err?.error || "Failed to reset password";
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMessage,
                }),
            );
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-white-back px-4">
            <img
                src={ellipse}
                className="absolute pointer-events-none left-[-50px] top-0"
                alt=""
            />
            <img
                src={ellipse}
                className="absolute pointer-events-none right-[-50px] bottom-30"
                alt=""
            />

            <div className="w-full max-w-[1380px] p-8 rounded-xl shadow-lg bg-white-form relative overflow-hidden">
                <div className="mb-8">
                    <div className="flex justify-evenly items-center">
                        <img src={resetImg3} alt="Reset Illustration" />
                        <img
                            src={resetImg2}
                            className="absolute top-0 right-0 lg:block md:hidden hidden "
                        />
                        <img
                            src={ellipse}
                            className="absolute pointer-events-none bottom-[-50px]"
                            alt=""
                        />

                        <div className="w-full max-w-[440px]">
                            <Title level={3} className="!mb-2 !font-bold">
                                Create New Password
                            </Title>
                            <Text
                                type="secondary"
                                className="text-sm block mb-6"
                            >
                                Please set a strong, secure new password for
                                your account.
                            </Text>
                            <Form
                                form={form}
                                name="new-password"
                                layout="vertical"
                                requiredMark={false}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="password"
                                    label="New Password"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your new password",
                                        },
                                        {
                                            min: 8,
                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={
                                            <LockOutlined className="text-gray-400 mr-1" />
                                        }
                                        placeholder="Min. 8 characters"
                                        size="large"
                                        className="rounded-lg"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    hasFeedback
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please confirm your new password",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "password",
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "The two passwords do not match!",
                                                    ),
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={
                                            <LockOutlined className="text-gray-400 mr-1" />
                                        }
                                        placeholder="Repeat your password"
                                        size="large"
                                        className="rounded-lg"
                                    />
                                </Form.Item>

                                <Form.Item className="mb-0 mt-6">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        loading={loading}
                                        className="h-12 font-semibold rounded-lg"
                                    >
                                        Reset Password
                                    </Button>
                                </Form.Item>

                                <Form.Item className="mb-0 mt-4 text-center">
                                    <Link
                                        to="/login"
                                        className="!text-primary hover:!underline font-medium"
                                    >
                                        Back to Log In
                                    </Link>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPasswordForm;
