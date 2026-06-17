import { DatePicker, Form, Input } from "antd";

const CalendarForm = ({ form }) => {
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
            <Item
                label={<label className="label-styling">Name</label>}
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input service name!",
                    },
                ]}
            >
                <Input placeholder="Service name" className="!input-styling" />
            </Item>
            <Item
                label={<label className="label-styling">Attendance</label>}
                rules={[
                    {
                        type: "object",
                        required: true,
                        message: "Please Select time",
                    },
                ]}
                name="date-picker"
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Item>
        </Form>
    );
};

export default CalendarForm;
