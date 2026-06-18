import {
    Tabs,
    Card,
    Form,
    Input,
    Button,
    Typography,
    Avatar,
    Upload,
    Switch,
    Row,
    Col,
    Space,
    App,
} from "antd";
import {
    UserOutlined,
    LockOutlined,
    BellOutlined,
    UploadOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    useChangePasswordMutation,
    useUpdateAdminDataMutation,
    useGetSettingsQuery,
} from "./authApi";

const { Title, Text } = Typography;

const Settings = () => {
    const { token } = useSelector((state) => state?.auth);
    const { data: adminData } = useGetSettingsQuery(token);
    const [changePassword, { isLoading: isChangingPassword }] =
        useChangePasswordMutation();
    const [updateAdminData, { isLoading: isUpdatingAdmin }] =
        useUpdateAdminDataMutation();

    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();

    useEffect(() => {
        if (adminData) {
            form.setFieldsValue({
                username: adminData.username || "Admin",
                email: adminData.email || "admin@gmail.com",
                phone: adminData.phone || "(+95) 9 956 145 223",
            });
        }
    }, [adminData, form]);

    const onFinishAccount = async (values) => {
        // console.log(values);
        try {
            await updateAdminData({
                adminData: values,
                token,
            }).unwrap();
            message.success("Account settings updated successfully!");
        } catch (error) {
            message.error(
                error?.data?.message || "Failed to update account settings",
            );
        }
    };

    const onFinishPassword = async (values) => {
        try {
            await changePassword({
                updatePasswords: {
                    oldPassword: values.currentPassword,
                    newPassword: values.newPassword,
                },
                token,
            }).unwrap();
            message.success("Password changed successfully!");
            passwordForm.resetFields();
        } catch (error) {
            message.error(error?.data?.message || "Failed to change password");
        }
    };

    const items = [
        {
            key: "1",
            label: (
                <span className="flex items-center gap-2">
                    <UserOutlined />
                    Account
                </span>
            ),
            children: (
                <Card title="Account Information" className="shadow-sm">
                    <Row gutter={24}>
                        <Col
                            xs={24}
                            md={8}
                            className="flex flex-col items-center mb-6"
                        >
                            <Space vertical size="large">
                                <Avatar
                                    size={120}
                                    src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                    icon={<UserOutlined />}
                                    className="mb-4"
                                />
                                <Upload showUploadList={false}>
                                    <Button icon={<UploadOutlined />}>
                                        Change Avatar
                                    </Button>
                                </Upload>
                            </Space>
                        </Col>
                        <Col xs={24} md={16}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinishAccount}
                                initialValues={{
                                    username: adminData?.username || "Admin",
                                    email:
                                        adminData?.email || "admin@gmail.com",
                                    phone:
                                        adminData?.phone ||
                                        "(+95) 9 xxx xxx xxx",
                                }}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!",
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined />} />
                                </Form.Item>
                                <Form.Item
                                    label="Email Address"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                        },
                                        {
                                            type: "email",
                                            message:
                                                "Please enter a valid email!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Phone Number" name="phone">
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={<SaveOutlined />}
                                        className="bg-blue-600"
                                        loading={isUpdatingAdmin}
                                    >
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            ),
        },
        {
            key: "2",
            label: (
                <span className="flex items-center gap-2">
                    <LockOutlined />
                    Security
                </span>
            ),
            children: (
                <Card title="Change Password" className="shadow-sm">
                    <Form
                        form={passwordForm}
                        layout="vertical"
                        onFinish={onFinishPassword}
                        className="max-w-md"
                    >
                        <Form.Item
                            label="Current Password"
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input your current password!",
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your new password!",
                                },
                                {
                                    min: 6,
                                    message:
                                        "Password must be at least 6 characters!",
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item
                            label="Confirm New Password"
                            name="confirmPassword"
                            dependencies={["newPassword"]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please confirm your new password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("newPassword") ===
                                                value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "The two passwords that you entered do not match!",
                                            ),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isChangingPassword}
                                className="bg-blue-600"
                            >
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: "3",
            label: (
                <span className="flex items-center gap-2">
                    <BellOutlined />
                    Notifications
                </span>
            ),
            children: (
                <Card title="Notification Preferences" className="shadow-sm">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <Text strong className="block">
                                    Email Notifications
                                </Text>
                                <Text type="secondary">
                                    Receive emails about account activity and
                                    security.
                                </Text>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <Text strong className="block">
                                    Push Notifications
                                </Text>
                                <Text type="secondary">
                                    Receive push notifications on your device.
                                </Text>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <Text strong className="block">
                                    Newsletter
                                </Text>
                                <Text type="secondary">
                                    Receive our weekly newsletter about new
                                    features.
                                </Text>
                            </div>
                            <Switch />
                        </div>
                    </div>
                </Card>
            ),
        },
    ];

    return (
        <div className="max-w-5xl mx-auto py-4">
            <div className="mb-6">
                <Title level={2}>Settings</Title>
                <Text type="secondary">
                    Manage your account settings and preferences.
                </Text>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

export default Settings;
