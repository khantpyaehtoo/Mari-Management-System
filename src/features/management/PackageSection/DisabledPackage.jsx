import { Card, Col, Row, Skeleton } from "antd";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../app/core/notiSlice";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useGetAllServiceDataQuery } from "../services/servicesApi";
import { useUpdatePackageMutation } from "./packageApi";
import PackageCard from "./PackageCard";
import PackageDeleteModal from "./PackageDeleteModal";

const DisabledPackage = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [enableModalOpen, setEnableModalOpen] = useState(false);

    const { data: servicesData = [], isLoading } = useGetAllServiceDataQuery();
    const [updatePackage, { isLoading: isUpdating }] =
        useUpdatePackageMutation();

    const disabledPackages = useMemo(() => {
        return (
            servicesData?.filter((item) => {
                if (!item) return false;
                const isPackage = item.package === true;
                const isDisabled = item.enabled === false;
                const matchesSearch = item.name
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

                return isPackage && isDisabled && matchesSearch;
            }) || []
        );
    }, [searchText, servicesData]);

    // 3. Action Logic (Restore/Enable)
    const handleActionClick = (actionType, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedPackage(item);
        setEnableModalOpen(true);
    };

    const handleEnableConfirm = async () => {
        if (!selectedPackage?.id) return;
        try {
            await updatePackage({
                id: selectedPackage.id,
                body: {
                    name: selectedPackage.name,
                    price: Number(selectedPackage.price),
                    categoryId: selectedPackage.categoryId,
                    serviceIds: selectedPackage.serviceIds,
                    enabled: true,
                },
            }).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Package restored successfully",
                }),
            );
            setEnableModalOpen(false);
        } catch (error) {
            console.error("Restore package failed:", error);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: error?.data?.message || "Restore failed",
                }),
            );
        }
    };

    return (
        <div>
            <SubHeaderSection
                title="Disabled Packages"
                subTitle="View and restore packages that have been disabled from your active catalog."
                placeholderTitle="Search disabled package name..."
                setSearchText={setSearchText}
                searchText={searchText}
                showBackButton={true}
                backToPath="/management/packages"
                backText="Active Packages"
            />

            {/* Content Section */}
            <Row gutter={[16, 16]} className="mt-10!">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Col
                            key={`skeleton-${index}`}
                            xs={24}
                            sm={12}
                            xl={6}
                            className="flex"
                        >
                            <Card className="w-full border! border-gray-200! rounded-xl!">
                                <Skeleton
                                    active
                                    paragraph={{ rows: 3 }}
                                    title={{ width: "80%" }}
                                />
                            </Card>
                        </Col>
                    ))
                ) : disabledPackages.length === 0 ? (
                    <Col span={24} className="text-center text-gray-400 mt-10">
                        No disabled packages found.
                    </Col>
                ) : (
                    disabledPackages.map((item) => (
                        <PackageCard
                            key={item.id}
                            item={item}
                            isDisabledMode={true}
                            handleActionClick={handleActionClick}
                        />
                    ))
                )}
            </Row>

            {/* Restore Confirm Modal */}
            <PackageDeleteModal
                deleteModalOpen={enableModalOpen}
                selectedPackage={selectedPackage}
                setDeleteModalOpen={setEnableModalOpen}
                handleDisableConfirm={handleEnableConfirm}
                isLoading={isUpdating}
            />
        </div>
    );
};

export default DisabledPackage;
