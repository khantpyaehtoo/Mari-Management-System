import {
    InfoCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    SaveOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, Row, Tag, Upload } from "antd";

const AccountSettings = ({
    isUpdatingAdmin,
    form,
    onFinishAccount,
    adminData,
}) => {
    const imageBaseUrl = "http://192.168.0.183:8080/uploads/";
    const profilePicUrl = adminData?.profilePicture
        ? `${imageBaseUrl}${adminData.profilePicture}`
        : "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg";

    return (
        <Card
            title="Account Information"
            extra={
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    className="bg-blue-600"
                    loading={isUpdatingAdmin}
                >
                    Save Changes
                </Button>
            }
            className="shadow-sm rounded-2xl!"
        >
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={6}>
                    <div className="flex flex-col items-center justify-center pb-8 lg:pb-0 lg:items-start lg:justify-start lg:border-r lg:border-gray-300 lg:ps-10 h-full">
                        <div className="relative">
                            <Upload
                                showUploadList={false}
                                className="cursor-pointer!"
                            >
                                <Avatar
                                    size={140}
                                    src={profilePicUrl}
                                    icon={<UserOutlined />}
                                    className="border-3! border-primary!"
                                />
                                <Button
                                    icon={<UploadOutlined size={10} />}
                                    className="absolute! bottom-3! right-3! rounded-full! bg-primary! text-white! border-primary! transform translate-x-1/4 translate-y-1/4"
                                />
                            </Upload>
                        </div>
                        <p className="text-xs text-center w-40 mt-5">
                            Allowed JPG, GIF or PNG. Max size of 800kB
                        </p>
                    </div>
                </Col>
                <Col xs={24} lg={18} className="mx-auto">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinishAccount}
                    >
                        <Row gutter={[24, 0]}>
                            <Col xs={24} md={12}>
                                <Form.Item label="Full Name" name="fullName">
                                    <Input
                                        prefix={
                                            <UserOutlined className="me-2!" />
                                        }
                                        className="input-styling!"
                                        placeholder={
                                            adminData?.fullName ||
                                            "Enter full name"
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item label="Phone Number" name="phone">
                                    <Input
                                        prefix={
                                            <PhoneOutlined className="me-2!" />
                                        }
                                        className="input-styling!"
                                        placeholder={
                                            adminData?.phone ||
                                            "Enter phone number"
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Email Address"
                                    name="email"
                                    rules={[
                                        {
                                            type: "email",
                                            message:
                                                "Please enter a valid email!",
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={
                                            <MailOutlined className="me-2!" />
                                        }
                                        className="input-styling!"
                                        placeholder={
                                            adminData?.email ||
                                            "Enter email address"
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item label="Role">
                                    <div className="border-b pb-3">
                                        <Tag
                                            style={{
                                                background:
                                                    "oklch(0.8334 0.0876 8.43 / 71.79%)",
                                                color: "black",
                                                padding: "5px 18px",
                                                marginTop: "2px",
                                                borderRadius: "10px",
                                                textTransform: "uppercase",
                                            }}
                                            variant="filled"
                                        >
                                            {adminData?.role || "USER"}
                                        </Tag>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <div className="flex gap-3 px-3 py-2 w-full max-w-175 rounded-xl text-gray-600 bg-primary-sec text-xs mt-10!">
                                <InfoCircleOutlined className="mt-0.5" />
                                <p>
                                    Changes made to your personal information
                                    will be reflected across the salon's booking
                                    and artist directory.
                                </p>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default AccountSettings;
