import { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import resetImg2 from "../../../public/asset/Img2.png";
import heroImg from "../../../public/asset/Img3.png";
import ellipse from "../../../public/asset/Ellipse.png";

const { Title, Text } = Typography;

const ForgetPasswordForm = () => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState("email");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
            console.error(error);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const values = await form.validateFields(["otp"]);
            setLoading(true);

            console.log("Verifying OTP:", values.otp);
            setTimeout(() => {
                setLoading(false);
                message.success("OTP verified successfully!");
                navigate("/new-password", { state: { email: emailValue } });
            }, 1000);
        } catch (error) {
            console.error(error);
            message.error("Please enter a valid verification code");
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

            <div className="w-full max-w-345 p-8 rounded-xl shadow-lg bg-white-form relative overflow-hidden">
                <div className="mb-8">
                    <div className="flex justify-evenly items-center">
                        <img src={heroImg} className="md:block hidden" />
                        <img
                            src={resetImg2}
                            className="absolute top-0 right-0 lg:block md:hidden hidden "
                        />
                        <img
                            src={ellipse}
                            className="absolute pointer-events-none -bottom-12.5"
                        />

                        <div>
                            {/* <Link
                                to="/login"
                                className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
                            >
                                <ArrowLeftOutlined className="mr-2 text-xs group-hover:-translate-x-1 transition-transform" />
                                Back to Login
                            </Link> */}
                            <Title
                                level={3}
                                className="mb-2! font-semi-bold! font-montserrat!"
                            >
                                {currentStep === "email"
                                    ? "Forgot Password?"
                                    : "Check your Email"}
                            </Title>
                            <Text
                                type="secondary"
                                className="text-sm block mb-6 font-montserrat!"
                            >
                                {currentStep === "email"
                                    ? "Please Enter your Email and we will send a code to reset your password."
                                    : `We’ve sent a verification code to your email ${emailValue || ""}. Please enter it below to reset your password.`}
                            </Text>
                            <Form
                                form={form}
                                name="forget-password"
                                layout="vertical"
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
                                                className="login-input!"
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
                                                className="mt-2 text-primary! hover:underline!"
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

                                        <Form.Item className="mb-0 mt-4">
                                            <Button
                                                type="primary"
                                                size="large"
                                                block
                                                loading={loading}
                                                onClick={handleVerifyOTP}
                                                disabled={isSubmitting}
                                                className="h-12 font-semibold rounded-lg my-6"
                                            >
                                                Verify Code
                                            </Button>
                                            <Form.Item className="mb-0 mt-6">
                                                <span className="text-black font-medium">
                                                    Don’t Receive the OTP Code?
                                                </span>{" "}
                                                <button
                                                    onClick={handleRequestOTP}
                                                    className="mt-2 !text-primary hover:!underline"
                                                >
                                                    Resend
                                                </button>
                                            </Form.Item>
                                        </Form.Item>
                                    </>
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
