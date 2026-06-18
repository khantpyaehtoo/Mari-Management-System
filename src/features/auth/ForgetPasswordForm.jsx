import { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import {
    ArrowLeftOutlined,
    MailOutlined,
    LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";

const { Title, Text } = Typography;

const ForgetPasswordForm = () => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState("email");

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailValue = Form.useWatch("email", form);
    const otpValue = Form.useWatch("otp", form);

    const isFormEmpty = !emailValue || emailValue.length === 0;
    const isSubmitting = !otpValue || otpValue.length !== 6;

    const handleRequestOTP = async () => {
        try {
            const values = await form.validateFields(["email"]);
            setLoading(true);

            console.log("Requesting OTP for:", values.email);
            setTimeout(() => {
                setLoading(false);
                setCurrentStep("reset");
                message.success("Verification code sent to your email!");
            }, 1000);
        } catch (error) {
            message.error(error);
        }
    };

    const [resetPassword] = useResetPasswordMutation();
    const onFinish = async (values) => {
        console.log("Resetting password with:", values);

        try {
            setLoading(true);
            const email = values.email;
            const { data } = await resetPassword(email);
            if (data?.success) {
                form.resetFields();
                navigate("/login");
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "successful!",
                    }),
                );
            }
        } catch (err) {
            setLoading(false);
            console.error("reset password failed", err);
            const errorMsg = err?.data?.message || err?.error;

            setIsError(errorMsg);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: isError,
                }),
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
            <div className="w-full max-w-[380px] bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-8">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
                    >
                        <ArrowLeftOutlined className="mr-2 text-xs group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>

                    <Title level={3} className="!mb-2 !font-bold">
                        {currentStep === "email"
                            ? "Forgot Password?"
                            : "Set New Password"}
                    </Title>
                    <Text type="secondary" className="text-sm">
                        {currentStep === "email"
                            ? "No worries, we'll send you reset instructions."
                            : "Almost there! Enter the code sent to your email."}
                    </Text>
                </div>

                <Form
                    form={form}
                    name="forget-password"
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    autoComplete="off"
                >
                    {currentStep === "email" ? (
                        <>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your email",
                                    },
                                    {
                                        type: "email",
                                        message:
                                            "Please enter a valid email address",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <MailOutlined className="text-gray-400 mr-1" />
                                    }
                                    placeholder="e.g. name@company.com"
                                    size="large"
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            <Form.Item className="mb-0 mt-4">
                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    loading={loading}
                                    onClick={handleRequestOTP}
                                    disabled={isFormEmpty}
                                    className="h-12 font-semibold rounded-lg"
                                >
                                    Send Reset Code
                                </Button>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                name="otp"
                                label="Verification Code"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter the 6-digit code",
                                    },
                                ]}
                            >
                                <Input.OTP
                                    size="large"
                                    length={6}
                                    className="justify-between"
                                />
                            </Form.Item>

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
                                    disabled={isSubmitting}
                                    placeholder="Min. 8 characters"
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
                                    className="h-12 font-semibold rounded-lg"
                                >
                                    Reset Password
                                </Button>
                                <Button
                                    type="link"
                                    block
                                    className="mt-4 text-gray-500"
                                    onClick={() => setCurrentStep("email")}
                                >
                                    Didn't get a code?{" "}
                                    <span className="text-blue-600 font-medium">
                                        Try again
                                    </span>
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default ForgetPasswordForm;
