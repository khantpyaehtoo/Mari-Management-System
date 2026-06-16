import { Form, Input, InputNumber, Select } from "antd";
import { useGetServicesDataQuery } from "./servicesApi";

const ServiceForm = ({ form }) => {
    const { Item } = Form;
    const { TextArea } = Input;

    const { data: seriveData, isLoading } = useGetServicesDataQuery;

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

            <Item
                label={
                    <label className="label-styling">Service Category</label>
                }
                name="serviceCategory"
                // rules={[
                //     {
                //         required: true,
                //         message: "Please input Category!",
                //     },
                // ]}
            >
                <Select
                    placeholder="Select a category"
                    loading={isLoading}
                    options={seriveData}
                />
            </Item>

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
