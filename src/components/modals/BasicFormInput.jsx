import { DatePicker, Form, Input, Space } from "antd";

const BasicFormInput = ({ title }) => {
    const { Item } = Form;

    return (
        <>
            <Item
                name="fullName"
                label={
                    <label className="label-styling">{title} Full Name</label>
                }
                rules={[
                    {
                        required: true,
                        message: `Please input the name`,
                    },
                ]}
            >
                <Input
                    placeholder={"Enter the name"}
                    className="input-styling!"
                    autoComplete="one-time-code"
                />
            </Item>

            <Space size="small" align="center">
                <Item
                    name="phoneNumber"
                    label={
                        <label className="label-styling">
                            {title} Phone No.
                        </label>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Please input the Phone Number",
                        },
                    ]}
                >
                    <Input
                        prefix={<span className="font-medium me-2">+95</span>}
                        placeholder={"Phone Number"}
                        className="input-styling!"
                        autoComplete="one-time-code"
                    />
                </Item>

                <Item
                    name="dateOfBirth"
                    label={
                        <label className="label-styling">
                            {title} Date of Birth
                        </label>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Please input the Date of Birth",
                        },
                    ]}
                >
                    <DatePicker className="input-styling!" />
                </Item>
            </Space>

            <Item
                name="email"
                label={<label className="label-styling">{title} Email</label>}
                rules={[{ required: true, message: `Please input the Email` }]}
            >
                <Input
                    placeholder={"example@gmail.com"}
                    className="input-styling!"
                    autoComplete="one-time-code"
                />
            </Item>
        </>
    );
};

export default BasicFormInput;
