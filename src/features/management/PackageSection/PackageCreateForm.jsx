import { Form, Input, InputNumber, Select, Space, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useGetPackageDataQuery } from "./packageApi";

const PackageCreateForm = ({ form }) => {
    const { Item } = Form;
    const { TextArea } = Input;

    const { data: packageData, isLoading } = useGetPackageDataQuery();
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
                <Input placeholder="Service name" className="input-styling!" />
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
                    className="input-styling!"
                />
            </Item>

            {!isOpen ? (
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
                            options={Array.from(
                                new Set(
                                    packageData
                                        ?.map((item) => item.categoryName)
                                        .filter(Boolean),
                                ),
                            ).map((category) => ({
                                value: category,
                                label: category,
                            }))}
                            className="w-100!"
                        />
                    </Item>

                    <Button
                        onClick={() => setIsOpen(true)}
                        className="mt-1 h-10!"
                    >
                        <PlusCircleFilled />
                    </Button>
                </Space>
            ) : (
                <Item
                    label={
                        <label className="label-styling">Category Name</label>
                    }
                    name="categoryName"
                    rules={[
                        {
                            required: true,
                            message: "Please input new Category name!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Category name"
                        className="input-styling!"
                        suffix={
                            <Button
                                type="text"
                                size="small"
                                onClick={() => setIsOpen(false)}
                            >
                                X
                            </Button>
                        }
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
                    className="input-styling!"
                    // type="number"
                />
            </Item>

            <Item
                label={<label className="label-styling">Description</label>}
                name="description"
            >
                <TextArea
                    placeholder="Service description"
                    className="input-styling!"
                    rows={4}
                />
            </Item>
        </Form>
    );
};

export default PackageCreateForm;
