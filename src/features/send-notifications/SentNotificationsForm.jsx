import { InboxOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Radio, Space, Upload } from "antd";

const NotiSendOptions = [
    { label: "Announcement", value: "announcement" },
    { label: "Promotion", value: "promotion" },
    { label: "Reminder", value: "reminder" },
    { label: "Alert", value: "alert" },
];

const SentNotificationsForm = () => {
    const [form] = Form.useForm();
    const { Dragger } = Upload;

    const onFinish = (values) => {
        console.log("Sent Notification Data:", values);
        form.resetFields();
    };

    return (
        <>
            <div className="p-6">
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item label="Image" name="image">
                        <Dragger className="w-full">
                            <div className="p-5">
                                <p className="ant-upload-drag-icon text-primary">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text text-sm">
                                    Click or drag file to this area to upload
                                </p>
                            </div>
                        </Dragger>
                    </Form.Item>
                    <Form.Item
                        label="Leave Type"
                        name="leave-type"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group
                            block
                            options={NotiSendOptions}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true }]}
                    >
                        <Input className="input-styling! bg-white! h-10 rounded-lg" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea
                            rows={4}
                            className="input-styling! bg-white! rounded-lg"
                        />
                    </Form.Item>
                    <Form.Item label="Send to">
                        <Checkbox.Group className="flex gap-3 flex-wrap">
                            {sendType.map((type, idx) => (
                                <Checkbox
                                    key={idx}
                                    className="completely-custom-checkbox"
                                    value={type.value}
                                >
                                    {type.label}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item className="mt-8 flex justify-end gap-3">
                        <Space>
                            <Button onClick={() => setDrawerPage("list")}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-primary border-primary"
                            >
                                Send
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SentNotificationsForm;
