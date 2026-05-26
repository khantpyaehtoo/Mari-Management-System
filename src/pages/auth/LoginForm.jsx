import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
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
                        Login
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
                            className="!mb-4"
                            htmlType="submit"
                        >
                            Log in
                        </Button>
                        or{" "}
                        <Link to="/signup" className="hover:!underline">
                            Register now !
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
