import { Typography } from "antd";
import { Button, Form, Input } from "antd";
import { useState } from "react";

const { Title } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

const onFinish = (values) => {
    console.log(values);
};
const Settings = () => {
    const [name, setName] = useState("admin");
    const [email, setEmail] = useState("admin@gmail.com");

    return (
        <>
            <Title className="p-3 border-b-1" level={3}>
                Settings
            </Title>

            <section className="w-full shadow-sm h-[300px]">
                <div className="flex justify-around items-center h-full bg-red-300">
                    <div className="h-full w-full">
                        <img
                            src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                            alt="user-profile"
                            className="w-50 h-50 rounded-full p-8"
                        />
                        <Title level={4}>{name}</Title>
                        <Title level={5}>{email}</Title>
                    </div>

                    <div className="bg-blue-200 h-full w-50/50">
                        <Form
                            {...layout}
                            name="nest-messages"
                            onFinish={onFinish}
                            style={{ maxWidth: 600 }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                name={["user", "name"]}
                                label="Name"
                                rules={[{ required: true }]}
                                initialValues={name}
                            >
                                <Input
                                    placeholder={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                name={["user", "email"]}
                                label="Email"
                                rules={[{ type: "email", required: true }]}
                            >
                                <Input
                                    placeholder={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Settings;
