import { Form } from "antd";
import BasicFormInput from "../../../components/modals/BasicFormInput";

const StaffForm = ({ form }) => {
    return (
        <Form form={form} layout="vertical" autoComplete="off">
            <BasicFormInput title="Staff's" />
        </Form>
    );
};

export default StaffForm;
