import {
    Tabs,
    Card,
    Form,
    Input,
    Button,
    Typography,
    Avatar,
    Upload,
    Row,
    Col,
    App,
    Tag,
} from "antd";
import {
    UserOutlined,
    LockOutlined,
    UploadOutlined,
    SaveOutlined,
    InfoCircleOutlined,
    DesktopOutlined,
    SoundOutlined,
    CloudUploadOutlined,
    InboxOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useChangePasswordMutation,
    useUpdateAdminDataMutation,
    useGetSettingsQuery,
} from "./authApi";
import { setMessage } from "../../app/core/notiSlice";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const Settings = () => {
    const { token } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();

    const { data: adminData } = useGetSettingsQuery(token);
    const [changePassword, { isLoading: isChangingPassword }] =
        useChangePasswordMutation();
    const [updateAdminData, { isLoading: isUpdatingAdmin }] =
        useUpdateAdminDataMutation();

    const containerRef = useRef(null);
    const [pillStyles, setPillStyles] = useState({ width: 0, left: 0 });
    const [activeKey, setActiveKey] = useState("1");

    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();

    // 💡 useCallback သုံးပြီး function ကို memoize လုပ်ထားပါတယ်
    const updatePillPosition = useCallback((key) => {
        if (!containerRef.current) return;
        const activeTabEl = containerRef.current.querySelector(
            `[data-node-key="${key}"]`,
        );
        if (activeTabEl) {
            setPillStyles({
                width: activeTabEl.offsetWidth,
                left: activeTabEl.offsetLeft,
            });
        }
    }, []);

    useEffect(() => {
        updatePillPosition(activeKey);

        const handleResize = () => updatePillPosition(activeKey);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeKey, updatePillPosition]);

    useEffect(() => {
        if (adminData) {
            form.setFieldsValue({
                username: adminData.username || "Admin",
                email: adminData.email || "admin@gmail.com",
                phone: adminData.phone || "(+95) 9 956 145 223",
            });
        }
    }, [adminData, form]);

    const onFinishAccount = useCallback(
        async (values) => {
            try {
                await updateAdminData({ adminData: values, token }).unwrap();
                message.success("Account settings updated successfully!");
            } catch (error) {
                message.error(
                    error?.data?.message || "Failed to update account settings",
                );
            }
        },
        [updateAdminData, token, message],
    );

    const onFinishPassword = useCallback(
        async (values) => {
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
                message.error(
                    error?.data?.message || "Failed to change password",
                );
            }
        },
        [changePassword, token, message, passwordForm],
    );

    const uploadProps = useMemo(
        () => ({
            name: "file",
            multiple: true,
            action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
            onChange(info) {
                const { status } = info.file;
                if (status === "done") {
                    dispatch(
                        setMessage({
                            msgType: "success",
                            msgContent: `${info.file.name} file uploaded successfully.`,
                        }),
                    );
                } else if (status === "error") {
                    dispatch(
                        setMessage({
                            msgType: "error",
                            msgContent: `${info.file.name} file upload failed.`,
                        }),
                    );
                }
            },
        }),
        [dispatch],
    );

    const items = useMemo(
        () => [
            {
                key: "1",
                label: (
                    <span className="flex items-center gap-2">
                        <UserOutlined />
                        Account
                    </span>
                ),
                children: (
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
                                                src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                                icon={<UserOutlined />}
                                                className="border-3! border-primary!"
                                            />
                                            <Button
                                                icon={
                                                    <UploadOutlined size={10} />
                                                }
                                                className="absolute! bottom-3! right-3! rounded-full! bg-primary! text-white! border-primary! transform translate-x-1/4 translate-y-1/4"
                                            />
                                        </Upload>
                                    </div>
                                    <p className="text-xs text-center w-40 mt-5">
                                        Allowed JPG, GIF or PNG. Max size of
                                        800kB
                                    </p>
                                </div>
                            </Col>
                            <Col xs={24} lg={18} className="mx-auto">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinishAccount}
                                    initialValues={{
                                        username:
                                            adminData?.username || "Admin",
                                        email:
                                            adminData?.email ||
                                            "admin@gmail.com",
                                        phone:
                                            adminData?.phone ||
                                            "(+95) 9 xxx xxx xxx",
                                    }}
                                >
                                    <Row gutter={[24, 0]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Username"
                                                name="username"
                                            >
                                                <Input
                                                    prefix={<UserOutlined />}
                                                    className="input-styling!"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Phone Number"
                                                name="phone"
                                            >
                                                <Input className="input-styling!" />
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
                                                <Input className="input-styling!" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item label="Role" name="role">
                                                <div className="border-b pb-3">
                                                    <Tag
                                                        style={{
                                                            background:
                                                                "oklch(0.8334 0.0876 8.43 / 71.79%)",
                                                            color: "black",
                                                            padding: "5px 18px",
                                                            marginTop: "2px",
                                                            borderRadius:
                                                                "10px",
                                                        }}
                                                        variant="filled"
                                                    >
                                                        admin
                                                    </Tag>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <div className="flex gap-3 px-3 py-2 w-full max-w-175 rounded-xl text-gray-600 bg-primary-sec text-xs mt-10!">
                                            <InfoCircleOutlined className="mt-0.5" />
                                            <p>
                                                Changes made to your personal
                                                information will be reflected
                                                across the salon's booking and
                                                artist directory.
                                            </p>
                                        </div>
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
                        <DesktopOutlined />
                        Salon Profile
                    </span>
                ),
                children: (
                    <Card className="shadow-sm w-full lg:w-[60%] rounded-2xl!">
                        <section className="flex flex-col border-b-black sm:flex-row gap-4 justify-between items-start sm:items-center mb-10!">
                            <Card.Meta
                                title="Salon Identity"
                                description="Your public-facing name & logo"
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<UploadOutlined />}
                                loading={isUpdatingAdmin}
                            >
                                Upload
                            </Button>
                        </section>
                        <Form layout="vertical">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mx-10">
                                <Form.Item
                                    label="Salon Logo"
                                    valuePropName="fileList"
                                >
                                    <Upload
                                        beforeUpload={() => false}
                                        showUploadList={false}
                                        className="w-full"
                                    >
                                        <button
                                            style={{
                                                color: "inherit",
                                                cursor: "pointer",
                                                background: "none",
                                            }}
                                            type="button"
                                            className="w-50 h-33 border-2 border-black border-dotted rounded-2xl mt-3"
                                        >
                                            <CloudUploadOutlined className="text-2xl" />
                                            <div style={{ marginTop: 8 }}>
                                                Upload Logo
                                            </div>
                                        </button>
                                        <p className="mt-5 text-center md:text-left">
                                            PNG, SVG
                                        </p>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="Salon Name" name="name">
                                    <Input
                                        className="input-styling!"
                                        placeholder="Enter the Salon Name"
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </Card>
                ),
            },
            {
                key: "3",
                label: (
                    <span className="flex items-center gap-2">
                        <SoundOutlined />
                        Media & Uploads
                    </span>
                ),
                children: (
                    <div className="space-y-10">
                        {[1, 2, 3].map((index) => (
                            <Card
                                key={index}
                                className="shadow-sm rounded-2xl! mb-10!"
                            >
                                <section className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-10! border-b border-gray-400 pb-5">
                                    <Card.Meta
                                        title="Home Screen Banner"
                                        description="Hero image displayed at the top of your client-facing booking page"
                                    />
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={<UploadOutlined />}
                                        loading={isUpdatingAdmin}
                                    >
                                        Upload
                                    </Button>
                                </section>
                                <section className="flex justify-between items-center pb-5">
                                    <Card.Meta
                                        title="Hero Banner"
                                        description="Shown full-width on the client booking home screen. Use a high-quality lifestyle image of your salon or nail work."
                                    />
                                    <div className="border border-gray-300 px-3 py-2 rounded-md">
                                        16:5 — 1600 × 500px
                                    </div>
                                </section>
                                <Dragger
                                    {...uploadProps}
                                    className="h-125! w-full max-w-100!"
                                >
                                    <div className="p-5 md:p-15">
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag file to this area to
                                            upload
                                        </p>
                                    </div>
                                </Dragger>
                            </Card>
                        ))}
                    </div>
                ),
            },
            {
                key: "4",
                label: (
                    <span className="flex items-center gap-2">
                        <LockOutlined />
                        Security
                    </span>
                ),
                children: (
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
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    className="input-styling!"
                                />
                            </Form.Item>
                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your new password!",
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
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    className="input-styling!"
                                />
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
        ],
        [
            adminData,
            isUpdatingAdmin,
            form,
            onFinishAccount,
            uploadProps,
            passwordForm,
            onFinishPassword,
            isChangingPassword,
        ],
    );

    const renderTabBar = useCallback(
        (props, DefaultTabBar) => (
            <div className="sticky top-0 bg-white-back mb-10 z-50">
                <div className="mb-2 px-10 py-4">
                    <Title level={2} className="text-xl md:text-2xl">
                        Settings
                    </Title>
                    <Text type="secondary" className="text-xs md:text-sm">
                        Manage your account settings and preferences.
                    </Text>
                </div>
                <div
                    ref={containerRef}
                    className="custom-tabs-wrapper"
                    style={{
                        "--pill-width": `${pillStyles.width}px`,
                        "--pill-left": `${pillStyles.left}px`,
                    }}
                >
                    <div className="custom-animated-pill" />
                    <DefaultTabBar
                        {...props}
                        className="bg-white-back w-full"
                    />
                </div>
            </div>
        ),
        [pillStyles],
    );

    return (
        <div>
            <Tabs
                activeKey={activeKey}
                onChange={setActiveKey}
                className="custom-settings-tab"
                renderTabBar={renderTabBar}
                items={items}
            />
        </div>
    );
};

export default Settings;
