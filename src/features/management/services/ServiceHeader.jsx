import {
    ArrowLeftOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceForm from "./ServiceForm";

const ServiceHeader = ({
    title,
    searchText,
    setSearchText,
    isEdit,
    isOpen,
    initialValue,
    onCancel,
    triggerCreate,
}) => {
    const nav = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEdit && initialValue) {
            form.setFieldsValue({
                "service-name": initialValue?.name,
                price: initialValue?.price,
                "time-duration": initialValue?.duration,
            });
        } else {
            form.resetFields();
        }
    }, [isEdit, initialValue, form]);

    const handleCancel = () => {
        form.resetFields();
        if (onCancel) onCancel();
    };

    return (
        <>
            <Space vertical className="w-full!">
                {/* Back Button */}
                <Button
                    onClick={() =>
                        nav("/management/service", { replace: true })
                    }
                    className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-xl! group"
                >
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                    {title}
                </Button>

                {/* Search and Create Section */}
                <div className="border-b-2 border-gray-300 py-10 px-3 w-full flex items-center gap-4">
                    <Input
                        value={searchText}
                        placeholder={`Search ${title}`}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                        prefix={<SearchOutlined className="px-3" />}
                        size="large"
                    />

                    <Button
                        variant="solid"
                        icon={<PlusCircleOutlined />}
                        className="createFormBtn!"
                        onClick={triggerCreate}
                    >
                        Create {title}
                    </Button>
                </div>

                {/* Shared Modal for Create and Edit */}
                <Modal
                    title={
                        <h1 className="mt-4 mb-2 uppercase text-3xl font-semibold text-primary">
                            {isEdit
                                ? `Edit "${initialValue?.name || "Service"}"` // 👈 initialValue ကို သုံးမယ်
                                : `Create New ${title}`}
                        </h1>
                    }
                    open={isOpen}
                    onCancel={handleCancel}
                    destroyOnHidden={true}
                    forceRender={false}
                    footer={null}
                >
                    <ServiceForm
                        handleCancel={handleCancel}
                        isModalVisible={isOpen}
                        form={form}
                        isEdit={isEdit}
                        title={title}
                        selectedService={initialValue}
                    />
                </Modal>
            </Space>
        </>
    );
};

export default ServiceHeader;
