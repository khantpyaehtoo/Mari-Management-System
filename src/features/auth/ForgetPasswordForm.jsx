import { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";
import resetImg2 from "../../../public/asset/Img2.png";
import resetImg3 from "../../../public/asset/Img3.png";
import ellipse from "../../../public/asset/Ellipse.png";

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
        <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-white-back px-4">
            <img
                src={ellipse}
                className="absolute pointer-events-none left-[-50px] top-0"
            />
            <img
                src={ellipse}
                className="absolute pointer-events-none right-[-50px] bottom-30"
            />

            <div className="w-full max-w-[1380px] p-8 rounded-xl shadow-lg bg-white-form relative overflow-hidden">
                <div className="mb-8">
                    <div className="flex justify-evenly items-center">
                        <img src={resetImg3} />
                        <img
                            src={resetImg2}
                            className="absolute top-0 right-0"
                        />
                        <img
                            src={ellipse}
                            className="absolute pointer-events-none bottom-[-50px]"
                        />

                        <div>
                            {/* <Link
                                to="/login"
                                className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
                            >
                                <ArrowLeftOutlined className="mr-2 text-xs group-hover:-translate-x-1 transition-transform" />
                                Back to Login
                            </Link> */}
                            <Title level={3} className="!mb-2 !font-bold">
                                {currentStep === "email"
                                    ? "Forgot Password?"
                                    : "Check your Email"}
                                {currentStep === "final"
                                    ? "Create New Password"
                                    : ""}
                            </Title>
                            <Text type="secondary" className="text-sm">
                                {currentStep === "email"
                                    ? "Please Enter your Email and we will send a code to reset your password."
                                    : "We’ve sent a verification code to your email, mari_admin@gmail.com. Please enter it below to reset your password"}
                            </Text>
                            <Form
                                form={form}
                                name="forget-password"
                                className="!mt-10"
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
                                                    message:
                                                        "Please enter your email",
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

                                        <Form.Item className="mb-0 mt-6">
                                            <span className="text-black font-medium">
                                                Remember your Password?
                                            </span>{" "}
                                            <Link
                                                to="/login"
                                                className="mt-2 !text-primary hover:!underline"
                                            >
                                                Log In
                                            </Link>
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

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            block
                                            className="h-12 font-semibold rounded-lg"
                                        >
                                            Continue
                                        </Button>
                                    </>
                                )}
                                {currentStep === "final" ? (
                                    <>
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

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            block
                                            className="h-12 font-semibold rounded-lg"
                                        >
                                            Continue
                                        </Button>

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
                                                onClick={() =>
                                                    setCurrentStep("email")
                                                }
                                            >
                                                Didn't get a code?{" "}
                                                <span className="text-blue-600 font-medium">
                                                    Try again
                                                </span>
                                            </Button>
                                        </Form.Item>
                                    </>
                                ) : (
                                    ""
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordForm;
