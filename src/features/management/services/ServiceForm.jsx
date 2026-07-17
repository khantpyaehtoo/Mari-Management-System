import { Form, Input, Space } from "antd";
import { useEffect } from "react";

const ServiceForm = ({ form, isEdit, initialValue }) => {
    const { Item } = Form;

    useEffect(() => {
        if (isEdit && initialValue) {
            form.setFieldsValue({
                name: initialValue.name,
                price: initialValue.price?.toString().replace(/[^0-8]/g, ""),
                durationInMinutes: initialValue.durationInMinutes,
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
                <Input
                    placeholder={
                        isEdit && initialValue?.name
                            ? initialValue.name
                            : "Service name"
                    }
                    className="input-styling!"
                />
            </Item>

            <Space className="w-full flex" size="large">
                <Item
                    label={
                        <label className="label-styling">Service Price</label>
                    }
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Please input service price!",
                        },
                    ]}
                >
                    <Input
                        placeholder={
                            isEdit && initialValue?.price
                                ? `${initialValue.price} MMK`
                                : "Enter the Service price"
                        }
                        className="input-styling!"
                    />
                </Item>

                <Item
                    label={
                        <label className="label-styling">Time Duration</label>
                    }
                    name="durationInMinutes"
                    rules={[
                        {
                            required: true,
                            message: "Need time duration!",
                        },
                    ]}
                >
                    <Input
                        placeholder={
                            isEdit &&
                            (initialValue?.durationInMinutes ||
                                initialValue?.duration)
                                ? `${initialValue.durationInMinutes} mins`
                                : "Time Duration (e.g. 50 mins)"
                        }
                        className="input-styling!"
                    />
                </Item>
            </Space>
        </Form>
    );
};

export default ServiceForm;
