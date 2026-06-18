import { Form, Input, Space } from "antd";

const BasicFormInput = () => {
    const { Item } = Form;

    return (
        <>
            <Item
                name="username"
                label={<label className="label-styling">Username</label>}
                rules={[
                    { required: true, message: `Please input the username` },
                ]}
            >
                <Input
                    placeholder={"username"}
                    className="!input-styling"
                    autoComplete="one-time-code"
                />
            </Item>
            <Item
                name="fullname"
                label={<label className="label-styling">Full Name</label>}
                rules={[
                    { required: true, message: `Please input the fullname` },
                ]}
            >
                <Input
                    placeholder={"fullname"}
                    className="!input-styling"
                    autoComplete="one-time-code"
                />
            </Item>
            <Item
                name="email"
                label={<label className="label-styling">Email</label>}
                rules={[{ required: true, message: `Please input the Email` }]}
            >
                <Input
                    placeholder={"email"}
                    className="!input-styling"
                    autoComplete="one-time-code"
                />
            </Item>

            <Space size="large" align="start">
                <Item
                    name="phoneNumber"
                    label={
                        <label className="label-styling">Phone Number</label>
                    }
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
                        autoComplete="one-time-code"
                    />
                </Item>
                <Item
                    hasFeedback
                    name="password"
                    label={<label className="label-styling">Password</label>}
                    rules={[
                        {
                            required: true,
                            message: `Please input the password`,
                        },
                        {
                            min: 8,
                            message: "Password must be at least 8 characters",
                        },
                    ]}
                >
                    <Input.Password
                        placeholder={"password"}
                        className="!input-styling"
                        autoComplete="one-time-code"
                    />
                </Item>
            </Space>
        </>
    );
};

export default BasicFormInput;
