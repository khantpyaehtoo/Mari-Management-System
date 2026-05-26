import { Button, Space, Form, Input } from "antd";

const ForgetPasswordForm = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Form
                name="reset"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360 }}
                onFinish={onFinish}
            >
                <h2 className="text-3xl font-bold mb-10">Reset Password</h2>
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
                    <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                    name="OTP"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.OTP />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button block type="primary" htmlType="submit">
                            Request OTP
                        </Button>
                        <Button block type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ForgetPasswordForm;
