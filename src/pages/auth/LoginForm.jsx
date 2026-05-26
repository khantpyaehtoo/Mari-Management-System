import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";

const LoginForm = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360 }}
                onFinish={onFinish}
            >
                <h2 className="text-3xl font-bold mb-10">Login</h2>
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
                        <a href="/reset">Forgot password</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <a href="/signup">Register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
