import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Upload, Checkbox } from "antd";

const NotiSendOptions = [
    { label: "Announcement", value: "ANNOUNCEMENT" },
    { label: "Promotion", value: "PROMOTION" },
    { label: "Reminder", value: "REMINDER" },
    { label: "Alert", value: "ALERT" },
];

const SentNotificationsForm = ({ form, formType }) => {
    const { Dragger } = Upload;

    const sendType = [
        { label: "Staff", value: "STAFF" },
        { label: "Customer", value: "CUSTOMER" },
    ];

    const getInitialAudience = () => {
        if (formType === "To Customer") return ["CUSTOMER"];
        if (formType === "To Staff") return ["STAFF"];
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <>
            <div className="p-3">
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Image"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Dragger
                            className="w-full"
                            beforeUpload={() => false}
                            maxCount={1}
                        >
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
                        label="Notification Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: "Please select a type!",
                            },
                        ]}
                    >
                        <Radio.Group
                            block
                            options={NotiSendOptions}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <div className="flex flex-col gap-0.5 leading-tight">
                                <span className="font-medium text-gray-700 mb-1">
                                    Target Audience
                                </span>
                                <span className="text-xs text-gray-400 font-normal mb-1">
                                    <span className=" font-medium">
                                        Just Reminder :
                                    </span>{" "}
                                    ( You can select both when you want to send
                                    to both )
                                </span>
                            </div>
                        }
                        name="targetAudience"
                        initialValue={getInitialAudience()}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select at least one target audience!",
                            },
                        ]}
                    >
                        <Checkbox.Group className="flex gap-3 flex-wrap mb-1">
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

                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input a title!",
                            },
                        ]}
                    >
                        <Input className="input-styling! bg-white! h-10 rounded-lg" />
                    </Form.Item>

                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: "Please input a message!",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={2}
                            className="input-styling! bg-white! rounded-lg"
                        />
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SentNotificationsForm;
