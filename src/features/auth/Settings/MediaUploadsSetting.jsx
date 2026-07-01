import {
    InboxOutlined,
    PlusCircleOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Typography, Upload } from "antd";
import heroBanner1 from "../../../../public/asset/mediaHero1.jpg";
import trendingDesign from "../../../../public/asset/trending.jpg";
import { useState } from "react";

const { Dragger } = Upload;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const MediaUploadsSetting = ({ isUpdatingAdmin, uploadProps }) => {
    const [isHeroBannerFormOpen, setHeroBannerFormOpen] = useState(false);
    const [isTrendingFormOpen, setIsTrendingFormOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    return (
        <div className="space-y-10">
            <div className="mb-20!">
                <div className="flex justify-between items-center mb-10 mx-3 px-5">
                    <Typography.Title level={3} className="font-medium!">
                        Hero Banner & Promo Banner
                    </Typography.Title>
                    <Button
                        variant="solid"
                        icon={<PlusCircleOutlined />}
                        className="createFormBtn!"
                        onClick={() => setHeroBannerFormOpen(true)}
                    >
                        Add Banner
                    </Button>
                </div>
                <article className="grid-items-4 mx-5">
                    <div className="w-90 border border-primary rounded-2xl cursor-pointer overflow-hidden focus-within:bg-amber-300">
                        <img src={heroBanner1} />
                    </div>
                    <div className="w-90 border border-primary rounded-2xl cursor-pointer overflow-hidden focus-within:bg-amber-300">
                        <img src={heroBanner1} />
                    </div>
                    <div className="w-90 border border-primary rounded-2xl cursor-pointer overflow-hidden focus-within:bg-amber-300">
                        <img src={heroBanner1} />
                    </div>
                    <div className="w-90 border border-primary rounded-2xl cursor-pointer overflow-hidden focus-within:bg-amber-300">
                        <img src={heroBanner1} />
                    </div>
                </article>
                <Modal
                    open={isHeroBannerFormOpen}
                    onCancel={() => setHeroBannerFormOpen(false)}
                    className="w-[80%]!"
                    footer={null}
                >
                    <section className="flex gap-4 justify-between items-center mb-5 border-b border-gray-400 pt-5 pb-5">
                        <Space vertical>
                            <h1 className="font-bold text-xl">
                                Home Screen Banner
                            </h1>
                            <p className="w-[80%]">
                                Hero image displayed at the top of your
                                client-facing booking page
                            </p>
                        </Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<UploadOutlined />}
                            loading={isUpdatingAdmin}
                        >
                            Upload
                        </Button>
                    </section>
                    <section className="flex justify-between items-center mb-5 pb-5">
                        <Space vertical>
                            <h1 className="font-bold text-xl">Hero Banner</h1>
                            <p className="w-[80%] text-xs">
                                Shown full-width on the client booking home
                                screen. Use a high-quality lifestyle image of
                                your salon or nail work.
                            </p>
                        </Space>
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
                </Modal>
            </div>

            <div className="flex justify-between items-center mx-3 px-5">
                <Typography.Title level={3} className="font-medium!">
                    Trending Designs
                </Typography.Title>
                <Button
                    variant="solid"
                    icon={<PlusCircleOutlined />}
                    className="createFormBtn!"
                    onClick={() => setIsTrendingFormOpen(true)}
                >
                    Add Banner
                </Button>
            </div>
            <article className="grid lg:grid-cols-6 md:grid-cols-4 gap-4 ms-6">
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
                <div className="w-40 border border-primary rounded-2xl overflow-hidden">
                    <img src={trendingDesign} className="" />
                </div>
            </article>

            <Modal
                open={isTrendingFormOpen}
                onCancel={() => setIsTrendingFormOpen(false)}
                footer={null}
                className="w-[70%]!"
                listType="picture-card"
                onPreview={handlePreview}
            >
                <section className="rounded-2xl! mb-10!">
                    <section className="gap-4 flex justify-between items-center mx-10 mb-10! border-b border-gray-400 pt-5 pb-5">
                        <Space vertical>
                            <h1 className="font-bold text-xl">
                                Trending Nail Designs
                            </h1>
                            <p className="w-[80%]">
                                Upload photos that appear in the 'Trending this
                                season' carousel on your booking page
                            </p>
                        </Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<UploadOutlined />}
                            loading={isUpdatingAdmin}
                        >
                            Upload
                        </Button>
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
                    {previewImage && (
                        <Image
                            styles={{ root: { display: "none" } }}
                            preview={{
                                open: previewOpen,
                                onOpenChange: (visible) =>
                                    setPreviewOpen(visible),
                                afterOpenChange: (visible) =>
                                    !visible && setPreviewImage(""),
                            }}
                            src={previewImage}
                        />
                    )}
                </section>
            </Modal>
        </div>
    );
};

export default MediaUploadsSetting;
