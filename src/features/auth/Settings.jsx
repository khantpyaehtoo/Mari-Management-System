import { Tabs, Form, Typography, App, Skeleton } from "antd";
import { UserOutlined, LockOutlined, SoundOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    useChangePasswordMutation,
    useUpdateAdminDataMutation,
    useGetSettingsQuery,
} from "./authApi";
import { setMessage } from "../../app/core/notiSlice";
import SecuritySettings from "./Settings/SecuritySettings";
import AccountSettings from "./Settings/AccountSettings";
import MediaUploadsSetting from "./Settings/MediaUploadsSetting";

const { Title, Text } = Typography;

const Settings = () => {
    const dispatch = useDispatch();

    const { data: adminData, isLoading } = useGetSettingsQuery();
    const [updateAdminData, { isLoading: isUpdatingAdmin }] =
        useUpdateAdminDataMutation();
    const [changePassword, { isLoading: isChangingPassword }] =
        useChangePasswordMutation();

    const containerRef = useRef(null);
    const [pillStyles, setPillStyles] = useState({ width: 0, left: 0 });
    const [activeKey, setActiveKey] = useState("1");

    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();

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
                fullName: adminData.fullName || "Admin",
                email: adminData.email || "admin@gmail.com",
                phone: adminData.phone || "(+95) 9 956 145 223",
            });
        }
    }, [adminData, form]);

    const onFinishAccount = useCallback(
        async (values) => {
            try {
                await updateAdminData({ adminData: values }).unwrap();
                message.success("Account settings updated successfully!");
            } catch (error) {
                message.error(
                    error?.data?.message || "Failed to update account settings",
                );
            }
        },
        [updateAdminData, message],
    );

    const onFinishPassword = useCallback(
        async (values) => {
            try {
                await changePassword({
                    updatePasswords: {
                        oldPassword: values.currentPassword,
                        newPassword: values.newPassword,
                    },
                }).unwrap();
                message.success("Password changed successfully!");
                passwordForm.resetFields();
            } catch (error) {
                message.error(
                    error?.data?.message || "Failed to change password",
                );
            }
        },
        [changePassword, message, passwordForm],
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

    const renderSkeleton = () => (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col items-center lg:w-1/4 pt-4">
                <Skeleton.Avatar active size={140} shape="circle" />
                <Skeleton.Button active size="small" className="mt-4 w-32" />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Skeleton.Button
                        active
                        size="small"
                        className="mb-2 w-20"
                    />
                    <Skeleton.Input active block size="large" />
                </div>
                <div>
                    <Skeleton.Button
                        active
                        size="small"
                        className="mb-2 w-28"
                    />
                    <Skeleton.Input active block size="large" />
                </div>
                <div>
                    <Skeleton.Button
                        active
                        size="small"
                        className="mb-2 w-24"
                    />
                    <Skeleton.Input active block size="large" />
                </div>
                <div>
                    <Skeleton.Button
                        active
                        size="small"
                        className="mb-2 w-16"
                    />
                    <Skeleton.Input active block size="large" />
                </div>
            </div>
        </div>
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
                children: isLoading ? (
                    renderSkeleton()
                ) : (
                    <AccountSettings
                        adminData={adminData}
                        form={form}
                        onFinishAccount={onFinishAccount}
                        isUpdatingAdmin={isUpdatingAdmin}
                    />
                ),
            },
            {
                key: "2",
                label: (
                    <span className="flex items-center gap-2">
                        <SoundOutlined />
                        Media & Uploads
                    </span>
                ),
                children: <MediaUploadsSetting uploadProps={uploadProps} />,
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
                    <SecuritySettings
                        isChangingPassword={isChangingPassword}
                        onFinishPassword={onFinishPassword}
                        passwordForm={passwordForm}
                    />
                ),
            },
        ],
        [
            isLoading,
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
                <div className="mb-2 px-3 py-3">
                    <Title level={2} className="text-primary!">
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
                        className="bg-white-back w-full!"
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
