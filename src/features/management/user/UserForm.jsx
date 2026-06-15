import { Form, Select, Space, Upload } from "antd";
import BasicFormInput from "../../../components/modals/BasicFormInput";
import { PlusOutlined } from "@ant-design/icons";
import defaultProfile from "../../../../public/flowerProfile.jpg";
// import { useCreateUserMutation } from "./userApi";

const UserForm = ({ form }) => {
    const { Item } = Form;

    const submitHandler = () => {
        const values = form.validateFields();
        // const { data, error } = useCreateUserMutation({ getUserData: values });
        console.log("form values", values);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        if (!e || e.length < 0) return defaultProfile;
        return e?.fileList;
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={submitHandler}
            autoComplete="off"
        >
            <BasicFormInput />
            <Space size="large" align="start">
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
                <Item
                    label={<label className="label-styling">Image</label>}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload listType="picture-card">
                        <button
                            style={{
                                color: "inherit",
                                cursor: "inherit",
                                border: 0,
                                background: "none",
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Item>
            </Space>
        </Form>
    );
};

export default UserForm;
