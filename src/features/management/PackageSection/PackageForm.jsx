import { Form, Input, Select, Space, Button } from "antd";
import { useGetAllServiceDataQuery } from "../services/servicesApi";

const PackageForm = ({ form, isEditing, handleCancel, onSubmit }) => {
    const onFinish = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
    };

    const { data: allService, isLoading } = useGetAllServiceDataQuery();

    const serviceOptions = allService?.map((service) => ({
        value: service.id,
        label: service.name,
    }));

    const handleValuesChange = (changedValues) => {
        if (changedValues.serviceId) {
            const selectedIds = changedValues.serviceId;

            const totalPrice = allService
                ?.filter((service) => selectedIds.includes(service.id))
                ?.reduce((sum, service) => sum + Number(service.price || 0), 0);

            form.setFieldsValue({
                packagePrice: totalPrice > 0 ? totalPrice : undefined,
            });
        }
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onValuesChange={handleValuesChange}
        >
            <Form.Item
                label="Service Name"
                name="serviceId"
                rules={[{ required: true, message: "Please select a service" }]}
            >
                <Select
                    mode="multiple"
                    placeholder="Please select services."
                    className="input-styling!"
                    options={serviceOptions}
                    loading={isLoading}
                    allowClear
                />
            </Form.Item>

            <Form.Item
                label="Package Name"
                name="packageName"
                rules={[
                    { required: true, message: "Please enter package name" },
                ]}
            >
                <Input className="input-styling!" />
            </Form.Item>

            <Space>
                <Form.Item
                    label="Package Price"
                    name="packagePrice"
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <Input className="input-styling!" type="number" />
                </Form.Item>
                <Form.Item
                    label="Package Duration"
                    name="packageDuration"
                    rules={[
                        { required: true, message: "Please enter duration" },
                    ]}
                >
                    <Input className="input-styling!" />
                </Form.Item>
            </Space>

            <div className="flex justify-end items-center gap-3">
                {isEditing && (
                    <>
                        <Button
                            onClick={handleCancel}
                            className="p-5! rounded-lg!"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="p-5! rounded-lg! text-white!"
                        >
                            Save
                        </Button>
                    </>
                )}
            </div>
        </Form>
    );
};

export default PackageForm;
