import { Form, Input, Select, Space } from "antd";
import { useEffect } from "react";

const ServiceForm = ({
    form,
    isEdit,
    initialValue,
    categories = [],
    isAllMode = false,
}) => {
    const { Item } = Form;

    useEffect(() => {
        if (isEdit && initialValue) {
            form.setFieldsValue({
                name: initialValue?.name,
                price: initialValue.price
                    ? String(initialValue.price).replace(/[^0-9]/g, "")
                    : "",
                durationInMinutes:
                    initialValue.durationInMinutes ||
                    initialValue.duration ||
                    "",
                categoryId: initialValue.categoryId || undefined,
            });
        } else {
            form.resetFields();
        }
    }, [isEdit, initialValue, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            className="mt-5!"
        >
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

            {/* All Services mode ဖြစ်နေရင် သို့မဟုတ် Edit လုပ်ချိန်မှာ Category ရွေးဖို့ Dropdown ပြပေးပါမည် */}
            {(isAllMode || isEdit) && (
                <Item
                    label={<label className="label-styling">Category</label>}
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: "Please select a category!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a category"
                        className="h-10!"
                        options={categories?.map((cat) => ({
                            label: cat.name,
                            value: cat.id,
                        }))}
                    />
                </Item>
            )}

            <Space className="w-full flex" size="large">
                <Item
                    label={
                        <label className="label-styling">
                            Service Price (MMK)
                        </label>
                    }
                    name="price"
                    className="w-full"
                    rules={[
                        {
                            required: true,
                            message: "Please input service price!",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Enter the Service price"
                        className="input-styling!"
                    />
                </Item>

                <Item
                    label={
                        <label className="label-styling">
                            Time Duration (mins)
                        </label>
                    }
                    name="durationInMinutes"
                    className="w-full"
                    rules={[
                        {
                            required: true,
                            message: "Need time duration!",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Time Duration (e.g. 50)"
                        className="input-styling!"
                    />
                </Item>
            </Space>
        </Form>
    );
};

export default ServiceForm;
