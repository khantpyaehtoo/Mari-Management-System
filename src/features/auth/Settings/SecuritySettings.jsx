import { LockOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Skeleton } from "antd";

const confirmPasswordRules = [
    {
        required: true,
        message: "Please confirm your new password!",
    },
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error("The two passwords that you entered do not match!"),
            );
        },
    }),
];

const SecuritySettings = ({
    isChangingPassword,
    passwordForm,
    onFinishPassword,
    isLoading = false,
}) => {
    return (
        <Card
            title="Change Password"
            className="shadow-sm! w-full lg:w-[60%] rounded-2xl!"
        >
            <Form
                form={passwordForm}
                layout="vertical"
                onFinish={onFinishPassword}
                className="max-w-md w-full"
            >
                {isLoading ? (
                    <>
                        <Skeleton
                            active
                            paragraph={{ rows: 0 }}
                            className="mb-3!"
                            style={{ width: 120 }}
                        />
                        <Skeleton.Input
                            active
                            className="mb-3!"
                            style={{ width: 360 }}
                        />
                    </>
                ) : (
                    <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your current password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            className="input-styling!"
                        />
                    </Form.Item>
                )}

                {isLoading ? (
                    <>
                        <Skeleton
                            active
                            paragraph={{ rows: 0 }}
                            className="mb-3!"
                            style={{ width: 120 }}
                        />
                        <Skeleton.Input
                            active
                            className="mb-3!"
                            style={{ width: 360 }}
                        />
                    </>
                ) : (
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
                        <Input.Password
                            prefix={<LockOutlined />}
                            className="input-styling!"
                        />
                    </Form.Item>
                )}

                {isLoading ? (
                    <>
                        <Skeleton
                            active
                            paragraph={{ rows: 0 }}
                            className="mb-3!"
                            style={{ width: 120 }}
                        />
                        <Skeleton.Input
                            active
                            className="mb-3!"
                            style={{ width: 360 }}
                        />
                    </>
                ) : (
                    <Form.Item
                        label="Confirm New Password"
                        name="confirmPassword"
                        dependencies={["newPassword"]}
                        rules={confirmPasswordRules}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            className="input-styling!"
                        />
                    </Form.Item>
                )}

                {isLoading ? (
                    <Skeleton.Node
                        active
                        className="mb-3!"
                        style={{ width: 200, height: 40 }}
                    />
                ) : (
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
                )}
            </Form>
        </Card>
    );
};

export default SecuritySettings;
