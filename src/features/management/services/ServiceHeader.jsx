import {
    ArrowLeftOutlined,
    PlusCircleOutlined,
    // PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceForm from "./ServiceForm";

const ServiceHeader = ({
    title,
    isEdit,
    setEditModalOpen,
    setSearchText,
    searchText,
    selectedService,
}) => {
    const nav = useNavigate();
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

    const isModalVisible = isCreateFormOpen || isEdit;

    const handleCancel = () => {
        setIsCreateFormOpen(false);
        setEditModalOpen(false);
    };

    const [form] = Form.useForm();

    useEffect(() => {
        if (isEdit && selectedService) {
            form.setFieldsValue({
                "service-name": selectedService.name,
                price: selectedService.price,
                "time-duration": selectedService.duration,
            });
        } else {
            form.resetFields();
        }
    }, [isEdit, selectedService, form]);

    return (
        <>
            <Space vertical size="large" className="w-full!">
                <Button
                    onClick={() =>
                        nav("/management/service", { replace: true })
                    }
                    className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-xl! group"
                >
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                    {title}
                </Button>

                <Space
                    size="large"
                    className="border-b-2 border-gray-300 py-10 px-3 w-full"
                >
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
                        onClick={() => setIsCreateFormOpen(true)}
                        value={isCreateFormOpen}
                    >
                        Create {title}
                    </Button>
                </Space>

                <ServiceForm
                    handleCancel={handleCancel}
                    isModalVisible={isModalVisible}
                    form={form}
                    isEdit={isEdit}
                    title={title}
                    selectedService={selectedService}
                />
            </Space>
        </>
    );
};

export default ServiceHeader;
