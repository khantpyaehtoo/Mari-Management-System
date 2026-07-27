import { Form, Input, Select, Space } from "antd";
import { useEffect } from "react";
import { useGetAllServiceDataQuery } from "../services/servicesApi";

const PackageForm = ({ form: externalForm, isEdit, initialValue }) => {
    const [internalForm] = Form.useForm();
    const form = externalForm || internalForm;

    const { data: allService = [], isLoading } = useGetAllServiceDataQuery();

    const selectedServiceIds = Form.useWatch("serviceId", form) || [];

    // Map service options safely
    const serviceOptions = allService
        ?.filter(
            (service) =>
                service &&
                service.package !== true &&
                service.enabled !== false,
        )
        ?.map((service) => {
            const isMaxReached = selectedServiceIds.length >= 3;
            const isSelected = selectedServiceIds.includes(service.id);

            return {
                value: service.id,
                label: `${service.name} (${service.price ? `${service.price} mmk` : ""})`,
                disabled: isMaxReached && !isSelected,
            };
        });

    // Automatically pre-fill form values when editing
    useEffect(() => {
        if (isEdit && initialValue) {
            let preSelectedServiceIds = [];

            const activeServices =
                allService?.filter(
                    (s) => s && s.enabled !== false && s.package !== true,
                ) || [];
            const activeServiceIds = activeServices.map((s) => s.id);

            if (Array.isArray(initialValue.serviceIds)) {
                preSelectedServiceIds = initialValue.serviceIds.filter((id) =>
                    activeServiceIds.includes(id),
                );
            } else if (Array.isArray(initialValue.services)) {
                preSelectedServiceIds = initialValue.services
                    .filter((s) => activeServiceIds.includes(s.id))
                    .map((s) => s.id);
            } else if (Array.isArray(initialValue.includedServices)) {
                preSelectedServiceIds = activeServices
                    ?.filter((service) =>
                        initialValue.includedServices?.includes(service.name),
                    )
                    ?.map((service) => service.id);
            }

            // Active Selected Services Price/Duration
            const selectedServices = activeServices.filter((service) =>
                preSelectedServiceIds.includes(service.id),
            );
            const totalPrice = selectedServices.reduce(
                (sum, service) => sum + Number(service.price || 0),
                0,
            );
            const totalDuration = selectedServices.reduce(
                (sum, service) =>
                    sum +
                    Number(service.durationInMinutes || service.duration || 0),
                0,
            );

            form.setFieldsValue({
                packageName: initialValue.name || initialValue.packageName,
                packagePrice:
                    initialValue.price ||
                    initialValue.packagePrice ||
                    (totalPrice > 0 ? totalPrice : undefined),
                packageDuration: totalDuration > 0 ? totalDuration : undefined,
                serviceId: preSelectedServiceIds,
            });
        } else if (!isEdit) {
            form.resetFields();
        }
    }, [isEdit, initialValue, allService, form]);

    // Total Services
    const handleValuesChange = (changedValues, allValues) => {
        if (changedValues.serviceId) {
            const currentSelectedIds = allValues.serviceId || [];

            const selectedServices = allService?.filter((service) =>
                currentSelectedIds.includes(service.id),
            );

            const totalPrice = selectedServices?.reduce(
                (sum, service) => sum + Number(service.price || 0),
                0,
            );

            const totalDuration = selectedServices?.reduce(
                (sum, service) =>
                    sum +
                    Number(service.durationInMinutes || service.duration || 0),
                0,
            );

            form.setFieldsValue({
                packagePrice: totalPrice > 0 ? totalPrice : undefined,
                packageDuration: totalDuration > 0 ? totalDuration : undefined,
            });
        }
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={handleValuesChange}>
            <Form.Item
                label="Select Services"
                name="serviceId"
                rules={[
                    { required: true, message: "Please select services" },
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
                <Input
                    className="input-styling!"
                    placeholder="Enter package name"
                />
            </Form.Item>

            <Space className="w-full flex" size="large">
                <Form.Item
                    label="Package Price"
                    name="packagePrice"
                    className="w-full"
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <Input
                        className="input-styling!"
                        type="number"
                        placeholder="0.00"
                    />
                </Form.Item>
                <Form.Item
                    label="Package Duration (mins)"
                    name="packageDuration"
                    className="w-full"
                >
                    <Input
                        className="input-styling!"
                        type="number"
                        placeholder="0"
                        disabled
                    />
                </Form.Item>
            </Space>
        </Form>
    );
};

export default PackageForm;
