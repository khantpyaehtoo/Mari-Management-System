import { Form } from "antd";
import BasicFormInput from "../../../components/modals/BasicFormInput";

const StaffForm = ({ form }) => {
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
            <BasicFormInput title="Staff's" />
        </Form>
    );
};

export default StaffForm;
