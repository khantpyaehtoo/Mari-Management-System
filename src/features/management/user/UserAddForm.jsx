import { Form, Input, Select } from "antd";

const UserAddForm = () => {
    const [form] = Form.useForm();
    const { Item } = Form;

    // const handleChange = (value) => {
    //     console.log(`selected ${value}`);
    // };

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
                name="username"
                label={<label className="label-styling">Username</label>}
                rules={[
                    { required: true, message: `Please input the username` },
                ]}
            >
                <Input placeholder={"username"} className="!input-styling" />
            </Item>
            <Item
                name="fullname"
                label={<label className="label-styling">Full Name</label>}
                rules={[
                    { required: true, message: `Please input the fullname` },
                ]}
            >
                <Input placeholder={"fullname"} className="!input-styling" />
            </Item>
            <Item
                name="email"
                label={<label className="label-styling">Email</label>}
                rules={[{ required: true, message: `Please input the Email` }]}
            >
                <Input
                    suffix="@gmail.com"
                    placeholder={"email"}
                    className="!input-styling"
                />
            </Item>
            <Item
                name="phoneNumber"
                label={<label className="label-styling">Phone Number</label>}
                rules={[
                    {
                        required: true,
                        message: `Please input the Phone Number`,
                    },
                ]}
            >
                <Input
                    prefix="+95"
                    placeholder={"Phone Number"}
                    className="!input-styling"
                />
            </Item>
            <Item
                name="password"
                label={<label className="label-styling">Password</label>}
                rules={[
                    { required: true, message: `Please input the password` },
                ]}
            >
                <Input placeholder={"password"} className="!input-styling" />
            </Item>
            <Item
                name="gender"
                label={<label className="label-styling">Gender</label>}
                rules={[
                    { required: true, message: `Please input the username` },
                ]}
            >
                <Select
                    defaultValue="gender"
                    style={{ width: 120 }}
                    // onChange={handleChange}
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

export default UserAddForm;
