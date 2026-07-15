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

const IMAGE_BASE_URL = "http://192.168.0.183:8080";

const TrendingUploadSection = ({
    isFetchingDesigns,
    setIsTrendingFormOpen,
    trendingDesignsData,
    isTrendingFormOpen,
    setFileList,
    isUploadingTrending,
    handleTrendingSubmit,
    fileList,
    handleUploadChange,
    handlePreview,
    previewImage,
    setPreviewOpen,
    previewOpen,
    setPreviewImage,
    onDelete,
}) => {
    const { Dragger } = Upload;

    // console.log("Trending Designs Data:", trendingDesignsData);

    return (
        <>
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

            <article className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ms-6">
                {isFetchingDesigns ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full border border-gray-200 rounded-2xl overflow-hidden aspect-9/16 flex items-center justify-center bg-gray-50"
                        >
                            <Skeleton.Node
                                active
                                style={{ width: 200, height: 400 }}
                            />
                        </div>
                    ))
                ) : trendingDesignsData && trendingDesignsData.length > 0 ? (
                    trendingDesignsData.map((design) => {
                        const imgPath =
                            design?.imageUrl ||
                            design?.url ||
                            design?.designImage;

                        const fullImgUrl = `${IMAGE_BASE_URL}${imgPath}`;

                        return (
                            <div
                                key={design.id}
                                className="w-full border border-primary rounded-2xl overflow-hidden aspect-9/16 relative group cursor-pointer"
                            >
                                <Image
                                    src={fullImgUrl}
                                    className="w-full h-full object-cover"
                                    alt="Trending Nail Design"
                                />

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onDelete) onDelete(design.id);
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
                        No trending designs found.
                    </p>
                )}
            </article>

            {/* Modal Box */}
            <Modal
                open={isTrendingFormOpen}
                onCancel={() => {
                    setIsTrendingFormOpen(false);
                    setFileList([]);
                }}
                footer={null}
                className="w-[70%]!"
            >
                <section className="rounded-2xl! mb-10!">
                    <section className="gap-4 flex justify-between items-center mt-4 mb-5 border-b border-gray-400 pt-5 pb-5">
                        <Space vertical>
                            <h1 className="font-bold text-xl">
                                Trending Nail Designs
                            </h1>
                            <p className="w-[80%] text-sm text-gray-500">
                                Upload photos that appear in the 'Trending this
                                season' carousel on your booking page
                            </p>
                        </Space>
                        <Button
                            type="primary"
                            icon={<UploadOutlined />}
                            loading={isUploadingTrending}
                            onClick={handleTrendingSubmit}
                        >
                            Upload
                        </Button>
                    </section>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Design Image
                        </label>
                        <Dragger
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false}
                            listType="picture"
                            maxCount={6}
                            onPreview={handlePreview}
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
                    </div>

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
        </>
    );
};

export default TrendingUploadSection;
