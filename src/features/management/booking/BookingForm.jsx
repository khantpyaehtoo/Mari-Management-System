import { DatePicker, Form, Input } from "antd";

const BookingForm = ({ form }) => {
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
                label={<label className="label-styling">Service Name</label>}
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
                label={<label className="label-styling">Service Price</label>}
                name="price"
                rules={[
                    {
                        required: true,
                        message: "Please input price!",
                    },
                ]}
            >
                <Input placeholder="Service Price" className="!input-styling" />
            </Item>

            <Item
                label={<label className="label-styling">Customer Name</label>}
                name="customerName"
                rules={[
                    {
                        required: true,
                        message: "Please input customer name!",
                    },
                ]}
            >
                <Input placeholder="Customer Name" className="!input-styling" />
            </Item>

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
                <Input placeholder="Employee Name" className="!input-styling" />
            </Item>

            <Item
                label={<label className="label-styling">Booked Time</label>}
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

export default BookingForm;
