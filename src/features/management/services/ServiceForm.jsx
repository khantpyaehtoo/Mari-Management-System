import { Form, Input, InputNumber, Select, Space, Button } from "antd";
import { useGetServicesDataQuery } from "./servicesApi";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";

const ServiceForm = ({ form }) => {
    const { Item } = Form;
    const { TextArea } = Input;

    const { data: seriveData, isLoading } = useGetServicesDataQuery();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Form form={form} layout="vertical" autoComplete="off">
            <Item
                label={<label className="label-styling">Service Name</label>}
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input service name!",
                    },
                ]}
            >
                <Input placeholder="Service name" className="!input-styling" />
            </Item>

            <Item
                label={<label className="label-styling">Service Price</label>}
                name="price"
                rules={[
                    {
                        required: true,
                        message: "Please input price!",
                    },
                ]}
            >
                <InputNumber
                    placeholder="Service Price"
                    className="!input-styling"
                />
            </Item>

            <Space align="center" size="medium">
                <Item
                    label={
                        <label className="label-styling">
                            Service Category
                        </label>
                    }
                    name="categoryName"
                >
                    <Select
                        placeholder="Select a category"
                        loading={isLoading}
                        options={seriveData?.map((item) => ({
                            value: item.id || item.categoryName,
                            label: item.categoryName,
                        }))}
                        className="!w-100"
                    />
                </Item>

                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mt-1 !h-10"
                >
                    <PlusCircleFilled />
                </Button>
            </Space>

            {isOpen && (
                <Item
                    label={
                        <label className="label-styling">Category Name</label>
                    }
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Please input new Category name!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Category name"
                        className="!input-styling"
                    />
                </Item>
            )}

            <Item
                label={
                    <label className="label-styling">
                        Service duration (minutes)
                    </label>
                }
                name="durationInMinutes"
                rules={[
                    {
                        required: true,
                        message: "Please input duration!",
                    },
                ]}
            >
                <InputNumber
                    placeholder="Service Duration"
                    className="!input-styling"
                    // type="number"
                />
            </Item>

            <Item
                label={<label className="label-styling">Description</label>}
                name="description"
            >
                <TextArea
                    placeholder="Service description"
                    className="!input-styling"
                    rows={4}
                />
            </Item>
        </Form>
    );
};

export default ServiceForm;
