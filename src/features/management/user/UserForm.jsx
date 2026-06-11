import { Form, Select } from "antd";
import BasicFormInput from "../../../components/modals/BasicFormInput";
// import { useCreateUserMutation } from "./userApi";

const UserForm = ({ form }) => {
    const { Item } = Form;

    const submitHandler = () => {
        const values = form.validateFields();
        // const { data, error } = useCreateUserMutation({ getUserData: values });
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
                initialValue={"female"}
            >
                <Select
                    style={{ width: 120 }}
                    // onChange={handleChange}
                    options={[
                        { value: "female", label: "Female" },
                        { value: "male", label: "Male" },
                        {
                            label: "Gender",
                            disabled: true,
                        },
                    ]}
                />
            </Item>
        </Form>
    );
};

export default UserForm;
