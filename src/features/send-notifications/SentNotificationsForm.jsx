import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Upload, Checkbox, Image } from "antd";
import { useState } from "react";
import { Trash2 } from "lucide-react";

const NotiSendOptions = [
    { label: "Announcement", value: "ANNOUNCEMENT" },
    { label: "Promotion", value: "PROMOTION" },
    { label: "Reminder", value: "REMINDER" },
    { label: "Alert", value: "ALERT" },
];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const SentNotificationsForm = ({ form, formType }) => {
    const { Dragger } = Upload;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const formImages = Form.useWatch("image", form) || [];

    const sendType = [
        { label: "Staff", value: "STAFF" },
        { label: "Customer", value: "CUSTOMER" },
    ];

    const getInitialAudience = () => {
        if (formType === "To Customer") return "CUSTOMER";
        if (formType === "To Staff") return "STAFF";
        return "BOTH";
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview && file.originFileObj) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleUploadChange = async ({ fileList: newFileList }) => {
        const updatedFiles = await Promise.all(
            newFileList.map(async (file) => {
                if (!file.url && !file.preview && file.originFileObj) {
                    file.preview = await getBase64(file.originFileObj);
                }
                return file;
            }),
        );

        form.setFieldsValue({ image: updatedFiles });
    };

    const handleRemoveFile = (fileToRemove) => {
        const currentFiles = form.getFieldValue("image") || [];
        const updated = currentFiles.filter(
            (item) => item.uid !== fileToRemove.uid,
        );
        form.setFieldsValue({ image: updated });
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    return (
        <div className="p-3">
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <div className="space-y-3">
                        <Dragger
                            beforeUpload={() => false}
                            maxCount={1}
                            fileList={formImages}
                            onChange={handleUploadChange}
                            showUploadList={false}
                            className="border-dashed border-pink-300 hover:border-pink-400 rounded-xl bg-pink-50/20"
                        >
                            <div className="py-10 flex flex-col items-center justify-center">
                                <p className="text-3xl text-pink-300 mb-2">
                                    <InboxOutlined />
                                </p>
                                <p className="text-gray-600 text-sm font-medium">
                                    Click or drag file to this area to upload
                                </p>
                            </div>
                        </Dragger>

                        {formImages.map((file) => (
                            <div
                                key={file.uid || file.name}
                                className="flex items-center justify-between p-2.5 border border-gray-200 rounded-xl bg-white shadow-sm mt-2"
                            >
                                <div
                                    className="flex items-center gap-3 cursor-pointer overflow-hidden"
                                    onClick={() => handlePreview(file)}
                                >
                                    <img
                                        src={file.url || file.preview}
                                        alt={file.name}
                                        className="w-12 h-10 object-cover rounded-md shrink-0"
                                    />
                                    <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(file)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Lightbox Preview Modal */}
                    {previewImage && (
                        <div style={{ display: "none" }}>
                            <Image
                                preview={{
                                    open: previewOpen,
                                    onOpenChange: (visible) =>
                                        setPreviewOpen(visible),
                                    afterOpenChange: (visible) =>
                                        !visible && setPreviewImage(""),
                                }}
                                src={previewImage}
                            />
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label="Notification Type"
                    name="type"
                    rules={[
                        { required: true, message: "Please select a type!" },
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
                                <span className="font-medium">Reminder:</span>{" "}
                                You can check both boxes to send to both groups.
                            </span>
                        </div>
                    }
                    name="targetAudience"
                    initialValue={getInitialAudience(formType)}
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select at least one target audience!",
                        },
                    ]}
                    getValueProps={(value) => {
                        if (value === "BOTH") {
                            return { value: ["STAFF", "CUSTOMER"] };
                        }
                        if (typeof value === "string") {
                            return { value: [value] };
                        }
                        return { value: value || [] };
                    }}
                    getValueFromEvent={(checkedValues) => {
                        if (
                            checkedValues.includes("STAFF") &&
                            checkedValues.includes("CUSTOMER")
                        ) {
                            return "BOTH";
                        }
                        if (checkedValues.length === 1) {
                            return checkedValues[0];
                        }
                        return null;
                    }}
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
                        { required: true, message: "Please input a title!" },
                    ]}
                >
                    <Input className="input-styling! bg-white! h-10 rounded-lg" />
                </Form.Item>

                <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                        { required: true, message: "Please input a message!" },
                    ]}
                >
                    <Input.TextArea
                        rows={2}
                        className="input-styling! bg-white! rounded-lg"
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SentNotificationsForm;
