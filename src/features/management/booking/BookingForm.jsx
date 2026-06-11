import { Form, Input, Select } from "antd";

const BookingForm = ({ form }) => {
    const { Item } = Form;
    return (
        <Form
            form={form}
            layout="vertical"
            // onFinish={submitHandler}
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
                <Input placeholder={"email"} className="!input-styling" />
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

export default BookingForm;
