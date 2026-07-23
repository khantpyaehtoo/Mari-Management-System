import { useState, useEffect } from "react";
import { Button, Form, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import resetImg2 from "../../../public/asset/Img2.png";
import heroImg from "../../../public/asset/Img3.png";
import ellipse from "../../../public/asset/Ellipse.png";

import { useRequestOtpMutation, useVerifyOtpMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notifications/notiSlice";

const { Title, Text } = Typography;

const ForgetPasswordForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState("email");
    const [countdown, setCountdown] = useState(0);

    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    const [requestOtp, { isLoading: isRequestingOtp }] =
        useRequestOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

    // Form inputs watch
    const emailValue = Form.useWatch("email", form);
    const otpValue = Form.useWatch("otp", form);

    const isFormEmpty = !emailValue || emailValue.trim().length === 0;
    const isSubmitting = !otpValue || otpValue.trim().length !== 6;

    // Countdown Timer Logic
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleRequestOTP = async () => {
        try {
            const targetEmail =
                userEmail || (await form.validateFields(["email"])).email;

            await requestOtp({
                email: targetEmail,
            }).unwrap();

            setUserEmail(targetEmail);

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Verification code sent to your email!",
                }),
            );

            setCurrentStep("reset");
            setCountdown(60);
        } catch (error) {
            console.error("Failed to request OTP:", error);
            const errorMsg =
                error?.data?.message ||
                "Failed to send reset code. Please try again.";
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMsg,
                }),
            );
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const values = await form.validateFields(["otp"]);

            const response = await verifyOtp({
                email: userEmail,
                otp: values.otp,
            }).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "OTP verified successfully!",
                }),
            );

            navigate("/new-password", {
                state: {
                    email: userEmail,
                    token: response?.accessToken || response?.token,
                },
            });
        } catch (error) {
            console.error("OTP Verification failed:", error);
            const errorMsg =
                error?.data?.message ||
                "Please enter a valid verification code";

            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMsg,
                }),
            );
        }
    };

    return (
        <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-white-back px-4">
            <img
                src={ellipse}
                className="absolute pointer-events-none -left-12.5 top-0"
                alt=""
            />
            <img
                src={ellipse}
                className="absolute pointer-events-none -right-12.5 bottom-30"
                alt=""
            />

            <div className="w-full max-w-345 p-8 rounded-xl shadow-lg bg-white-form relative overflow-hidden">
                <div className="mb-8">
                    <div className="flex justify-evenly items-center">
                        <img
                            src={heroImg}
                            className="md:block hidden"
                            alt="Hero"
                        />
                        <img
                            src={resetImg2}
                            className="absolute top-0 right-0 lg:block md:hidden hidden"
                            alt="Reset"
                        />
                        <img
                            src={ellipse}
                            className="absolute pointer-events-none -bottom-12.5"
                            alt=""
                        />

                        <div>
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
                                    : `We’ve sent a verification code to your email "${userEmail || ""}". Please enter it below to reset your password.`}
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
                                                loading={isRequestingOtp}
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
                                                loading={isVerifyingOtp}
                                                onClick={handleVerifyOTP}
                                                disabled={isSubmitting}
                                                className="h-12 font-semibold rounded-lg my-6"
                                            >
                                                Verify Code
                                            </Button>

                                            <div className="mt-6">
                                                <span className="text-black font-medium">
                                                    Didn’t receive the OTP Code?
                                                </span>{" "}
                                                <button
                                                    type="button"
                                                    onClick={handleRequestOTP}
                                                    disabled={
                                                        countdown > 0 ||
                                                        isRequestingOtp
                                                    }
                                                    className="mt-2 text-primary! hover:underline! cursor-pointer disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed font-semibold"
                                                >
                                                    {countdown > 0
                                                        ? `Resend in ${countdown}s`
                                                        : "Resend Code"}
                                                </button>
                                            </div>
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
