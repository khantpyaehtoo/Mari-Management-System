import { Form, Input } from "antd";

const ServiceForm = ({ form }) => {
    const { Item } = Form;
    const submitHandler = () => {
        const values = form.validateFields();
        console.log("form values", values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={submitHandler}
            autoComplete="off"
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
                <Input placeholder="Service Price" className="!input-styling" />
            </Item>
        </Form>
    );
};

export default ServiceForm;
