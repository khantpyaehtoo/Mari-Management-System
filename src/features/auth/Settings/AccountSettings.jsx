import {
    InfoCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Image, Input, Row, Tag, Upload } from "antd";
import { getImageUrl } from "../../../lib/getImageUrl";

const AccountSettings = ({
    // isUpdatingAdmin,
    form,
    onFinishAccount,
    adminData,
}) => {
    const profilePicUrl =
        adminData?.profilePicture ||
        "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg";

    const getImg = getImageUrl(profilePicUrl);

    const handleBeforeUpload = (file) => {
        const formData = new FormData();
        formData.append("profileImage", file);
        onFinishAccount(formData);
        return false; // Prevents default Antd upload behavior
    };

    return (
        <Card
            title="Account Information"
            // extra={
            //     <Button
            //         type="primary"
            //         htmlType="submit"
            //         icon={<SaveOutlined />}
            //         className="bg-blue-600"
            //         loading={isUpdatingAdmin}
            //     >
            //         Save Changes
            //     </Button>
            // }
            className="shadow-sm rounded-2xl!"
        >
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={6}>
                    <div className="flex flex-col items-center justify-center pb-8 lg:pb-0 lg:border-r lg:border-gray-300 h-full">
                        <div className="relative group flex justify-center items-center">
                            <Upload
                                showUploadList={false}
                                beforeUpload={handleBeforeUpload}
                                className="cursor-pointer! flex justify-center items-center!"
                            >
                                <Image
                                    src={getImg}
                                    width={128}
                                    height={128}
                                    preview={{ open: false }}
                                    styles={{
                                        root: {
                                            border: "2px solid var(--primary-pink)",
                                            borderRadius: "50%",
                                            padding: 4,
                                            transition: "all 0.3s ease",
                                            overflow: "hidden",
                                        },
                                        image: {
                                            borderRadius: "50%",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            transition: "transform 0.3s ease",
                                        },
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <Button
                                    icon={<UploadOutlined size={10} />}
                                    className="absolute! bottom-1! right-1! sm:bottom-2! sm:right-2! rounded-full! bg-primary! text-white! border-primary! z-10 shadow-md"
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
                                        disabled
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
                                        disabled
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
                                <Form.Item label="Email Address" name="email">
                                    <Input
                                        disabled
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
