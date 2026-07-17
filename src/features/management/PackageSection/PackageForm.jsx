import { Form, Input, Select, Space, Button } from "antd";
import { useEffect } from "react";
import { useGetAllServiceDataQuery } from "../services/servicesApi";

const PackageForm = ({
    isEditing,
    handleCancel,
    triggerAction,
    initialValues,
}) => {
    // Initialize the form instance locally inside the component
    const [form] = Form.useForm();

    const { data: allService = [], isLoading } = useGetAllServiceDataQuery();

    // Map your dropdown options safely
    const serviceOptions = allService
        ?.filter((service) => service && service.package !== true) // Show only pure services
        ?.map((service) => ({
            value: service.id,
            label: service.name,
        }));

    // Automatically pre-fill the form values when editing
    useEffect(() => {
        if (isEditing && initialValues) {
            // Find the IDs of the included services by matching their names
            const preSelectedServiceIds =
                allService
                    ?.filter((service) =>
                        initialValues.includedServices?.includes(service.name),
                    )
                    ?.map((service) => service.id) || [];

            form.setFieldsValue({
                packageName: initialValues.name,
                packagePrice: initialValues.price,
                packageDuration:
                    initialValues.durationInMinutes || initialValues.duration,
                serviceId: preSelectedServiceIds,
            });
        } else {
            form.resetFields();
        }
    }, [isEditing, initialValues, allService, form]);

    const onFinish = (values) => {
        if (triggerAction) {
            triggerAction(values);
        }
    };

    // Calculate total price dynamically when services are selected
    const handleValuesChange = (changedValues, allValues) => {
        if (changedValues.serviceId) {
            const selectedIds = allValues.serviceId || [];

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
                label="Select Services"
                name="serviceId"
                rules={[
                    { required: true, message: "Please select a service" },
                    {
                        validator: (_, value) => {
                            if (!value || value.length < 2) {
                                return Promise.reject(
                                    new Error(
                                        "A package must contain at least 2 services.",
                                    ),
                                );
                            }
                            if (value.length > 3) {
                                return Promise.reject(
                                    new Error(
                                        "A package can contain a maximum of 3 services.",
                                    ),
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Select
                    mode="multiple"
                    placeholder="Select 2 to 3 services."
                    className="input-styling!"
                    options={serviceOptions}
                    loading={isLoading}
                    allowClear
                    maxCount={3}
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

            <Space className="w-full flex" size="large">
                <Form.Item
                    label="Package Price"
                    name="packagePrice"
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <Input className="input-styling!" type="number" />
                </Form.Item>
                <Form.Item
                    label="Package Duration (mins)"
                    name="packageDuration"
                    rules={[
                        { required: true, message: "Please enter duration" },
                    ]}
                >
                    <Input className="input-styling!" type="number" />
                </Form.Item>
            </Space>

            <div className="flex justify-end items-center gap-3 mt-6">
                <Button onClick={handleCancel} className="p-5! rounded-lg!">
                    Cancel
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="p-5! rounded-lg! text-white! bg-primary!"
                >
                    {isEditing ? "Save Changes" : "Create Package"}
                </Button>
            </div>
        </Form>
    );
};

export default PackageForm;
