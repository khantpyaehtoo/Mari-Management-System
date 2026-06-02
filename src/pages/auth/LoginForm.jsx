import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "../../features/auth/authApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../features/auth/authSlice";
import { setMessage } from "../../app/core/notiSlice";
import { useState } from "react";

const { Title } = Typography;

const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [iserror, setIsError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginAccount] = useLoginAccountMutation();

    // console.log("What Message", setMessage); => check redux noti connection

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        try {
            setIsSubmitting(true);
            setIsError(null);

            const data = await loginAccount(values).unwrap();

            if (data?.accessToken) {
                Cookies.set("lmsToken", data?.accessToken);
                Cookies.set("email", values?.email);
                dispatch(
                    setLoggedIn({
                        token: data?.accessToken,
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

            setIsError(errorMessage);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
            <div className="w-full max-w-[380px] bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onFinish}
                >
                    <Title level={3} className="!mb-10 !font-bold">
                        Welcome Back!
                    </Title>
                    <Form.Item
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
                        <Input prefix={<UserOutlined />} placeholder="email" />
                    </Form.Item>
                    <Form.Item
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
                            <Link to="/reset" className="hover:!underline">
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
    );
};

export default LoginForm;
