import { Card, Col, Row, Skeleton } from "antd";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../app/core/notifications/notiSlice";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useGetAllServiceDataQuery } from "../services/servicesApi";
import { useRestorePackageMutation } from "./packageApi";
import PackageCard from "./PackageCard";
import PackageConfirmModal from "./PackageConfirmModal";

const DisabledPackage = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [enableModalOpen, setEnableModalOpen] = useState(false);

    const { data: servicesData = [], isLoading } = useGetAllServiceDataQuery();

    const [restorePackage, { isLoading: isRestoring }] =
        useRestorePackageMutation();

    //  Active Services
    const activeServiceNames = useMemo(() => {
        return servicesData
            ?.filter((s) => s?.enabled !== false && s?.package !== true)
            ?.map((s) => s?.name?.trim()?.toLowerCase());
    }, [servicesData]);

    // Disabled Packages ( Disabled  + Active Service )
    const disabledPackages = useMemo(() => {
        return (
            servicesData
                ?.filter((item) => {
                    if (!item || item.package !== true) return false;

                    const activeIncluded =
                        item.includedServices?.filter((serviceName) =>
                            activeServiceNames?.includes(
                                serviceName?.trim()?.toLowerCase(),
                            ),
                        ) || [];

                    const isDisabled = item.enabled === false;
                    const hasNoActiveServices = activeIncluded.length === 0;

                    const matchesSearch = item.name
                        ?.toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase());

                    return (isDisabled || hasNoActiveServices) && matchesSearch;
                })
                ?.map((pkg) => {
                    const filteredServices = pkg.includedServices?.filter(
                        (serviceName) =>
                            activeServiceNames?.includes(
                                serviceName?.trim()?.toLowerCase(),
                            ),
                    );

                    return {
                        ...pkg,
                        includedServices: filteredServices,
                    };
                }) || []
        );
    }, [searchText, servicesData, activeServiceNames]);

    // Action Logic (Restore/Enable)
    const handleActionClick = (actionType, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedPackage(item);
        setEnableModalOpen(true);
    };

    const handleEnableConfirm = async () => {
        if (!selectedPackage?.id) return;

        try {
            await restorePackage(selectedPackage.id).unwrap();

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
                            isDisabledView={true}
                            handleActionClick={handleActionClick}
                        />
                    ))
                )}
            </Row>

            {/* Restore Confirm Modal */}
            <PackageConfirmModal
                deleteModalOpen={enableModalOpen}
                selectedPackage={selectedPackage}
                setDeleteModalOpen={setEnableModalOpen}
                handleDisableConfirm={handleEnableConfirm}
                isLoading={isRestoring}
            />
        </div>
    );
};

export default DisabledPackage;
