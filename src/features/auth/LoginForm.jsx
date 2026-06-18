import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "./authApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "./authSlice";
import { setMessage } from "../../app/core/notiSlice";
import { useState } from "react";
import loginImg from "../../../public/asset/img1.png";

const { Title } = Typography;

const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isError, setIsError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginAccount] = useLoginAccountMutation();

    // console.log(" Message", setMessage); => check redux connection

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        try {
            setIsSubmitting(true);
            // setIsError(null);

            const data = await loginAccount(values).unwrap();
            console.log(data?.tokenPair.accessToken);

            if (data?.tokenPair.accessToken) {
                Cookies.set("lmsToken", data?.tokenPair.accessToken);
                Cookies.set("email", values?.email);

                dispatch(
                    setLoggedIn({
                        token: data?.tokenPair.accessToken,
                        email: values?.email,
                    }),
                );
                navigate("/");
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Login Successful!",
                    }),
                );
            }
        } catch (err) {
            console.error("Login failed:", err);
            setIsSubmitting(false);

            const errorMessage =
                err?.data?.message || err?.error || "Login failed";

            // setIsError(errorMessage);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMessage,
                }),
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-2">
            <div>
                <img src={loginImg} className="rounded-se-[200px] " />
            </div>
            <div className="min-h-screen flex items-center justify-center bg-white-back">
                <div>
                    <div className="mb-10">
                        <h1 className="text-primary text-2xl font-bold mb-2">
                            Welcome to Mari’s Nail Salon
                        </h1>
                        <span>
                            Sign in to manage bookings, services, and staff
                            schedules.
                        </span>
                    </div>
                    <div className="w-full max-w-[380px] bg-white-form p-8 rounded-xl shadow-sm border border-primary">
                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                            style={{ maxWidth: 360 }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                layout="vertical"
                                label="Gmail"
                                name="email"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                    {
                                        type: "email",
                                        message: "The input is not valid email",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Enter Your Gmail"
                                    className="!p-2"
                                />
                            </Form.Item>
                            <Form.Item
                                layout="vertical"
                                label="Password"
                                name="password"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                    {
                                        min: 8,
                                    },
                                ]}
                            >
                                <Input.Password
                                    allowClear
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                    className="!p-2"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Flex justify="space-between" align="center">
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        noStyle
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <Link
                                        to="/reset"
                                        className="hover:!underline"
                                    >
                                        Forgot password
                                    </Link>
                                </Flex>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmitting}
                                    // disabled={isFormEmpty}
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
