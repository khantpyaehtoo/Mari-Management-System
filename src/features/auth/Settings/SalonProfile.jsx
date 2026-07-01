import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Upload } from "antd";

const SalonProfile = ({ isUpdatingAdmin }) => {
    return (
        <Card className="shadow-sm w-full lg:w-[70%] rounded-2xl!">
            <section className="flex flex-col border-b-black sm:flex-row gap-4 justify-between items-start sm:items-center mb-10!">
                <Card.Meta
                    title="Salon Identity"
                    description="Your public-facing name & logo"
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<UploadOutlined />}
                    loading={isUpdatingAdmin}
                >
                    Upload
                </Button>
            </section>
            <Form layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mx-10">
                    <Form.Item label="Salon Logo" valuePropName="fileList">
                        <Upload
                            beforeUpload={() => false}
                            showUploadList={false}
                            className="w-full"
                        >
                            <button
                                style={{
                                    color: "inherit",
                                    cursor: "pointer",
                                    background: "none",
                                }}
                                type="button"
                                className="w-50 h-33 border-2 border-black border-dotted rounded-2xl mt-3"
                            >
                                <CloudUploadOutlined className="text-2xl" />
                                <div style={{ marginTop: 8 }}>Upload Logo</div>
                            </button>
                            <p className="mt-5 text-center md:text-left">
                                PNG, SVG
                            </p>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Salon Name" name="name">
                        <Input
                            className="input-styling!"
                            placeholder="Enter the Salon Name"
                        />
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
};

export default SalonProfile;
