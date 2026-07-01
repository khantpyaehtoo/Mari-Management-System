import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Upload } from "antd";

const { Dragger } = Upload;

const MediaUploadsSetting = ({ isUpdatingAdmin, uploadProps }) => {
    return (
        <div className="space-y-10">
            {[1, 2, 3].map((index) => (
                <Card key={index} className="shadow-sm rounded-2xl! mb-10!">
                    <section className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-10! border-b border-gray-400 pb-5">
                        <Card.Meta
                            title="Home Screen Banner"
                            description="Hero image displayed at the top of your client-facing booking page"
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
                    <section className="flex justify-between items-center pb-5">
                        <Card.Meta
                            title="Hero Banner"
                            description="Shown full-width on the client booking home screen. Use a high-quality lifestyle image of your salon or nail work."
                        />
                        <div className="border border-gray-300 px-3 py-2 rounded-md">
                            16:5 — 1600 × 500px
                        </div>
                    </section>
                    <Dragger
                        {...uploadProps}
                        className="h-125! w-full max-w-100!"
                    >
                        <div className="p-5 md:p-15">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                        </div>
                    </Dragger>
                </Card>
            ))}
        </div>
    );
};

export default MediaUploadsSetting;
