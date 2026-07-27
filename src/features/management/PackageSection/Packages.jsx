import { Card, Col, Row, Skeleton } from "antd";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setMessage } from "../../../app/core/notifications/notiSlice";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import PackageCard from "./PackageCard";
import {
    useGetAllServiceDataQuery,
    useGetCategoryDataQuery,
} from "../services/servicesApi";
import {
    useCreatePackageMutation,
    useDeletePackageMutation,
    useRestorePackageMutation,
    useUpdatePackageMutation,
} from "./packageApi";
import { StarX } from "lucide-react";
import PackageConfirmModal from "./PackageConfirmModal";

const Packages = () => {
    const [searchText, setSearchText] = useState("");

    // State management for Create vs Edit modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const dispatch = useDispatch();

    const { data: servicesData = [], isLoading } = useGetAllServiceDataQuery();
    const { data: categoriesData = [] } = useGetCategoryDataQuery();

    const [createPackage] = useCreatePackageMutation();
    const [updatePackage] = useUpdatePackageMutation();

    const [restorePackage, { isLoading: isRestoring }] =
        useRestorePackageMutation();
    const [deletePackage, { isLoading: isDeleting }] =
        useDeletePackageMutation();

    const activeServiceNames = useMemo(() => {
        return servicesData
            ?.filter((s) => s?.enabled !== false && s?.package !== true)
            ?.map((s) => s?.name?.trim()?.toLowerCase());
    }, [servicesData]);

    const activePackages = useMemo(() => {
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

                    const isEnabled = item.enabled !== false;
                    const matchesSearch = item.name
                        ?.toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase());

                    const hasActiveServices = activeIncluded.length > 0;

                    return isEnabled && hasActiveServices && matchesSearch;
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

    const disabledPackagesCount = useMemo(() => {
        return (
            servicesData?.filter((item) => {
                if (!item || item.package !== true) return false;

                const activeIncluded =
                    item.includedServices?.filter((serviceName) =>
                        activeServiceNames?.includes(
                            serviceName?.trim()?.toLowerCase(),
                        ),
                    ) || [];

                const isDisabled = item.enabled === false;

                const hasNoActiveServices = activeIncluded.length === 0;

                return isDisabled || hasNoActiveServices;
            }).length || 0
        );
    }, [servicesData, activeServiceNames]);

    // Action buttons
    const handleActionClick = (actionType, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedPackage(item);

        if (actionType === "edit") {
            setIsEditOpen(true);
        } else {
            setDeleteModalOpen(true);
        }
    };

    const handleConfirmAction = async () => {
        if (!selectedPackage?.id) return;

        const isDisabled = selectedPackage.enabled === false;

        try {
            if (isDisabled) {
                await restorePackage(selectedPackage.id).unwrap();
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Package restored successfully",
                    }),
                );
            } else {
                await deletePackage(selectedPackage.id).unwrap();
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Package disabled successfully",
                    }),
                );
            }
            setDeleteModalOpen(false);
        } catch (error) {
            console.error(
                `${isDisabled ? "Restore" : "Disable"} package failed:`,
                error,
            );
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent:
                        error?.data?.message ||
                        `${isDisabled ? "Restore" : "Disable"} failed`,
                }),
            );
        }
    };

    // Close Handler for Modals
    const handleCancel = () => {
        setIsCreateOpen(false);
        setIsEditOpen(false);
        setSelectedPackage(null);
    };

    const handleCreatePackage = async (formValues) => {
        const rawServices = formValues.serviceIds || formValues.serviceId || [];
        const selectedServiceIds = rawServices
            .map((id) =>
                Number(typeof id === "object" ? id?.value || id?.id : id),
            )
            .filter(Boolean);

        const packageCategory = categoriesData.find(
            (c) => c.name?.toLowerCase() === "packages",
        );
        const targetCategoryId = packageCategory
            ? Number(packageCategory.id)
            : 6;

        const formattedPayload = {
            name: formValues.packageName || formValues.name,
            price: Number(formValues.packagePrice || formValues.price),
            categoryId: targetCategoryId,
            serviceIds: selectedServiceIds,
            enabled: true,
        };

        const result = await createPackage(formattedPayload).unwrap();
        handleCancel();
        return result;
    };

    const handleEditPackage = async (payload) => {
        const { id, body } = payload;

        const rawServices = body.serviceIds || body.serviceId || [];
        const selectedServiceIds = rawServices
            .map((serId) =>
                Number(
                    typeof serId === "object"
                        ? serId?.value || serId?.id
                        : serId,
                ),
            )
            .filter(Boolean);

        const packageCategory = categoriesData.find(
            (c) => c.name?.toLowerCase() === "packages",
        );
        const targetCategoryId = packageCategory
            ? Number(packageCategory.id)
            : 6;

        const formattedPayload = {
            id: id,
            body: {
                name: body.packageName || body.name,
                price: Number(body.packagePrice || body.price),
                categoryId: targetCategoryId,
                serviceIds: selectedServiceIds,
            },
        };

        const result = await updatePackage(formattedPayload).unwrap();
        handleCancel();
        return result;
    };

    return (
        <>
            <SubHeaderSection
                title="Packages"
                formType="Packages"
                subTitle="Create, customize, and optimize your packages. Easily manage pricing, duration, and staff assignments in one place."
                placeholderTitle="Search with package name..."
                setSearchText={setSearchText}
                searchText={searchText}
                triggerCreate={handleCreatePackage}
                triggerEdit={handleEditPackage}
                isOpen={isCreateOpen || isEditOpen}
                onOpen={() => {
                    if (!isEditOpen) {
                        setSelectedPackage(null);
                        setIsCreateOpen(true);
                    }
                }}
                isEdit={isEditOpen}
                initialValue={selectedPackage}
                onCancel={handleCancel}
            />

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
                ) : (
                    <>
                        <Col xs={24} sm={12} xl={6} className="flex">
                            <Link
                                to="/management/packages/disabled"
                                className="w-full"
                            >
                                <Card className="w-full min-h-65! flex items-center justify-center border-2! border-gray-400! border-dashed! rounded-xl! bg-gray-50! hover:bg-gray-100! transition-colors cursor-pointer shadow-sm hover:shadow-md">
                                    <h1 className="text-base font-semibold text-gray-600 flex justify-center items-center text-center">
                                        <StarX
                                            size={20}
                                            className="inline me-5"
                                        />
                                        Disabled Packages
                                    </h1>
                                    <div className="mt-3 flex justify-between items-baseline gap-4">
                                        <span className="text-gray-400 shrink-0">
                                            Disabled Items :
                                        </span>
                                        <span className="w-8 bg-gray-300 rounded-full text-center font-medium text-gray-600">
                                            {disabledPackagesCount}
                                        </span>
                                    </div>
                                </Card>
                            </Link>
                        </Col>

                        {activePackages.length === 0 ? (
                            <Col
                                xs={24}
                                sm={12}
                                xl={18}
                                className="flex items-center justify-center text-gray-400"
                            >
                                No active packages found.
                            </Col>
                        ) : (
                            activePackages.map((item) => (
                                <PackageCard
                                    key={item.id}
                                    item={item}
                                    handleActionClick={handleActionClick}
                                />
                            ))
                        )}
                    </>
                )}
            </Row>

            <PackageConfirmModal
                deleteModalOpen={deleteModalOpen}
                selectedPackage={selectedPackage}
                setDeleteModalOpen={setDeleteModalOpen}
                handleDisableConfirm={handleConfirmAction}
                isLoading={isDeleting || isRestoring}
            />
        </>
    );
};

export default Packages;
