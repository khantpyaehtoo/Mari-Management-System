import { DownOutlined } from "@ant-design/icons";
import { DatePicker, Form, Select } from "antd";
const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const CalendarForm = ({ form }) => {
    const { Item } = Form;
    const submitHandler = () => {
        const values = form.validateFields();
        console.log("form values", values);
    };

    const handleChange = (value) => {
        console.log(`Selected: ${value} ${value.length}`);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={submitHandler}
            autoComplete="off"
        >
            <Item
                label={<label className="label-styling">Employee Name</label>}
                name="employeeName"
                rules={[
                    {
                        required: true,
                        message: "Please input employee name!",
                    },
                ]}
            >
                <Select
                    mode="multiple"
                    size="medium"
                    placeholder="Please select"
                    // defaultValue={["a10", "c12"]}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    options={options}
                    suffixIcon={<DownOutlined />}
                />
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
