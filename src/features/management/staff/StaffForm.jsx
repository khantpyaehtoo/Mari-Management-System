import { Form, Select } from "antd";
import BasicFormInput from "../../../components/modals/BasicFormInput";

const StaffForm = ({ form }) => {
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
            <BasicFormInput />
            <Item
                name="gender"
                label={<label className="label-styling">Gender</label>}
                rules={[
                    { required: true, message: `Please input the username` },
                ]}
            >
                <Select
                    initialvalues={"gender"}
                    style={{ width: 120 }}
                    // onChange={(e) => e.target.value}
                    options={[
                        { value: "female", label: "Female" },
                        { value: "male", label: "Male" },
                        {
                            value: "gender",
                            label: "Gender",
                            disabled: true,
                        },
                    ]}
                />
            </Item>
        </Form>
    );
};

export default StaffForm;
