import { Form, Input, Space } from "antd";
import { useEffect } from "react";

const ServiceForm = ({ form, isEdit, initialValue }) => {
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

            <Space className="w-full flex" size="large">
                <Item
                    label={
                        <label className="label-styling">
                            Service Price (MMK)
                        </label>
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
