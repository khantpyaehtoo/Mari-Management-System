import {
    InboxOutlined,
    PlusCircleOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {
    Button,
    Modal,
    Skeleton,
    Space,
    Typography,
    Upload,
    Image,
} from "antd";
import { Trash2 } from "lucide-react";

const IMAGE_BASE_URL = import.meta.env.VITE_BASE_API;

const HeroBannerSection = ({
    isHeroBannerFormOpen,
    setHeroBannerFormOpen,
    isVendorDesignLoading,
    vendorDesignData,
    handleHeroBannerSubmit,
    heroFileList,
    handleHeroUploadChange,
    handlePreview,
    isUploadingHero,
    onDelete,
}) => {
    const { Dragger } = Upload;

    return (
        <>
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

            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-5">
                {isVendorDesignLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full border border-gray-200 overflow-hidden rounded-xl aspect-video flex items-center justify-center bg-gray-50"
                        >
                            <Skeleton.Node
                                active
                                style={{ width: 400, height: 400 }}
                            />
                        </div>
                    ))
                ) : vendorDesignData && vendorDesignData.length > 0 ? (
                    vendorDesignData.map((item) => {
                        console.log(
                            `Banner ID ${item.id} path:`,
                            item?.bannerImage,
                        );
                        const imgPath = item?.bannerImage || item?.url;
                        console.log(imgPath);
                        const fullImgUrl = `${IMAGE_BASE_URL}${imgPath}`;
                        return (
                            <div
                                key={item.id}
                                className="w-full border border-primary rounded-2xl cursor-pointer overflow-hidden relative group focus-within:bg-amber-300 aspect-video"
                            >
                                <Image
                                    src={fullImgUrl}
                                    className="w-full h-full object-cover"
                                    alt="Hero Banner"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onDelete) onDelete(item.id);
                                        }}
                                        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="col-span-full text-gray-500 text-center py-5">
                        No banners found.
                    </p>
                )}
            </article>

            <Modal
                open={isHeroBannerFormOpen}
                onCancel={() => setHeroBannerFormOpen(false)}
                className="w-[80%]!"
                footer={null}
            >
                <section className="flex gap-4 justify-between items-center mb-5 border-b border-gray-400 mt-5 pt-5 pb-5">
                    <Space vertical>
                        <h1 className="font-bold text-2xl">
                            Home Screen Banner
                        </h1>
                    </Space>
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        loading={isUploadingHero}
                        onClick={handleHeroBannerSubmit}
                    >
                        Upload
                    </Button>
                </section>
                <section className="flex justify-between items-center mb-5 pb-5">
                    <Space vertical>
                        <h1 className="font-bold text-xl">Hero Banner</h1>
                        <p className="w-[80%] text-xs">
                            Shown full-width on the client booking home screen.
                            Use a high-quality lifestyle image of your salon or
                            nail work.
                        </p>
                    </Space>
                    <div className="border border-gray-300 px-3 py-2 rounded-md">
                        16:5 — 1600 × 500px
                    </div>
                </section>

                <Dragger
                    className="h-125! w-full max-w-100!"
                    fileList={heroFileList}
                    onChange={handleHeroUploadChange}
                    beforeUpload={() => false}
                    listType="picture"
                    maxCount={1}
                    onPreview={handlePreview}
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
        </>
    );
};

export default HeroBannerSection;
