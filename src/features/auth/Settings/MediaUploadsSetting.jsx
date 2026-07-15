import { message } from "antd";
import { useState } from "react";

import HeroBannerSection from "./HeroBannerSection";
import TrendingUploadSection from "./TrendingUploadSection";
import {
    useDeleteHeroDesignMutation,
    useDeleteTrendingDesignMutation,
    useGetAllTrendingDesignQuery,
    useGetAllVendorDesignQuery,
    useTrendingUploadMutation,
    useVendorUploadMutation,
} from "./uploadApi";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const MediaUploadsSetting = () => {
    // Modal States
    const [isHeroBannerFormOpen, setHeroBannerFormOpen] = useState(false);
    const [isTrendingFormOpen, setIsTrendingFormOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const [fileList, setFileList] = useState([]); // for trending designs
    const [heroFileList, setHeroFileList] = useState([]); // for hero banners

    const { data: trendingDesignsData, isLoading: isFetchingDesigns } =
        useGetAllTrendingDesignQuery();

    const [trendingUpload, { isLoading: isUploadingTrending }] =
        useTrendingUploadMutation();

    const [deleteTrendingDesign] = useDeleteTrendingDesignMutation();

    const { data: vendorDesignData, isLoading: isVendorDesignLoading } =
        useGetAllVendorDesignQuery();

    const [vendorUpload, { isLoading: isUploadingHero }] =
        useVendorUploadMutation();

    const [deleteHeroDesign] = useDeleteHeroDesignMutation();

    // Image Preview Handling
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    // Handle File Change for Trending Upload
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    // Handle File Change for Hero Upload
    const handleHeroUploadChange = ({ fileList: newFileList }) => {
        setHeroFileList(newFileList);
    };

    // Handle Delete logic for Trending
    const handleTrendingDeleteBtn = async (id) => {
        try {
            await deleteTrendingDesign(id).unwrap();
            message.success("Deleted successfully!");
        } catch (error) {
            message.error(
                error?.data?.message || "Failed to delete the design.",
            );
            console.error("Delete Error:", error);
        }
    };

    // Handle Submit for Trending Upload
    const handleTrendingSubmit = async () => {
        if (fileList.length === 0) {
            message.warning("Choose the picture first.");
            return;
        }

        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("designImage", file.originFileObj);
        });

        try {
            await trendingUpload(formData).unwrap();
            message.success("Trending design uploaded successfully!");
            setFileList([]); // reset file list
            setIsTrendingFormOpen(false); // close modal
        } catch (error) {
            message.error(
                error?.data?.message || "Something went wrong during upload.",
            );
            console.error(error);
        }
    };

    // Handle Submit for Hero Banner Upload
    const handleHeroSubmit = async () => {
        if (heroFileList.length === 0) {
            message.warning("Choose the picture first.");
            return;
        }

        const formData = new FormData();
        formData.append("bannerImage", heroFileList[0].originFileObj);

        try {
            await vendorUpload(formData).unwrap();
            message.success("Hero banner uploaded successfully!");
            setHeroFileList([]); // reset hero file list
            setHeroBannerFormOpen(false); // close modal
        } catch (error) {
            message.error(
                error?.data?.message ||
                    "Something went wrong during hero upload.",
            );
            console.error(error);
        }
    };

    // Handle Delete logic for Announcement Section
    const handleAnnouncementDeleteBtn = async (id) => {
        try {
            await deleteHeroDesign(id).unwrap();
            message.success("Deleted successfully!");
        } catch (error) {
            message.error(
                error?.data?.message || "Failed to delete the design.",
            );
            console.error("Delete Error:", error);
        }
    };

    return (
        <div className="space-y-10">
            <div className="mb-20!">
                {/* Hero Banner Component */}
                <HeroBannerSection
                    isHeroBannerFormOpen={isHeroBannerFormOpen}
                    setHeroBannerFormOpen={setHeroBannerFormOpen}
                    isVendorDesignLoading={isVendorDesignLoading}
                    vendorDesignData={vendorDesignData}
                    heroFileList={heroFileList}
                    handleHeroUploadChange={handleHeroUploadChange}
                    handlePreview={handlePreview}
                    isUploadingHero={isUploadingHero}
                    handleHeroBannerSubmit={handleHeroSubmit}
                    onDelete={handleAnnouncementDeleteBtn}
                />
            </div>

            {/* Trending Design Component */}
            <TrendingUploadSection
                isFetchingDesigns={isFetchingDesigns}
                setIsTrendingFormOpen={setIsTrendingFormOpen}
                trendingDesignsData={trendingDesignsData}
                isTrendingFormOpen={isTrendingFormOpen}
                fileList={fileList}
                setFileList={setFileList}
                isUploadingTrending={isUploadingTrending}
                handleTrendingSubmit={handleTrendingSubmit}
                handleUploadChange={handleUploadChange}
                handlePreview={handlePreview}
                previewImage={previewImage}
                setPreviewOpen={setPreviewOpen}
                previewOpen={previewOpen}
                setPreviewImage={setPreviewImage}
                onDelete={handleTrendingDeleteBtn}
            />
        </div>
    );
};

export default MediaUploadsSetting;
