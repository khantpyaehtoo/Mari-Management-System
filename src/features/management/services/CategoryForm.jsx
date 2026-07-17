import { Form, Input } from "antd";

const CategoryForm = ({ form }) => {
    const { Item } = Form;
    return (
        <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            className="mt-5!"
        >
            <Item
                label={<label className="label-styling">Category Name</label>}
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
        </Form>
    );
};

export default CategoryForm;
