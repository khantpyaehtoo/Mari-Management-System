import { Card, Col, Row, Skeleton, Modal } from "antd";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useGetAllServiceDataQuery,
    useGetCategoryDataQuery,
    useRestoreServiceMutation,
    useUpdateServiceMutation,
} from "./servicesApi";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../app/core/notifications/notiSlice";
import CategoryCard from "./CategoryCard";
import ServiceConfirmationModal from "./ServiceConfirmationModal";

const CategoryDetails = () => {
    const [searchText, setSearchText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const token = useSelector((state) => state?.authSlice?.token);
    const dispatch = useDispatch();
    const { id } = useParams();

    const isAllMode = id === "all";
    const isDeletedMode = id === "deleted";

    const { data: getAllCategory = [], isLoading: isCategoryLoading } =
        useGetCategoryDataQuery();

    const { data: allServices = [], isLoading: isServicesLoading } =
        useGetAllServiceDataQuery();

    const [createServiceTrigger] = useCreateServiceMutation();
    const [editServiceTrigger] = useUpdateServiceMutation();
    const [restoreService] = useRestoreServiceMutation();
    const [deleteService] = useDeleteServiceMutation();

    const handleCreateService = async (formValues) => {
        const formattedPayload = {
            name: formValues.name,
            price: Number(formValues.price),
            durationInMinutes: formValues.durationInMinutes,
            categoryId:
                isAllMode || isDeletedMode
                    ? Number(formValues.categoryId)
                    : Number(id),
        };
        const res = await createServiceTrigger(formattedPayload).unwrap();
        handleModalCancel();
        return res;
    };

    const handleEditService = async ({ id: serviceId, body, token }) => {
        const formattedPayload = {
            id: serviceId,
            token,
            body: {
                name: body.name,
                price: Number(body.price),
                durationInMinutes: body.durationInMinutes,
                categoryId: body.categoryId
                    ? Number(body.categoryId)
                    : Number(selectedService?.categoryId),
            },
        };
        const res = await editServiceTrigger(formattedPayload).unwrap();
        handleModalCancel();
        return res;
    };

    const handleDeleteConfirm = async () => {
        if (!selectedService?.id) return;

        try {
            await deleteService({ id: selectedService.id, token }).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Deleted successfully",
                }),
            );

            setDeleteModalOpen(false);
        } catch (error) {
            console.error("Delete failed:", error);

            let errorMessage = error?.data?.message || "Delete failed occurred";
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMessage,
                }),
            );
        }
    };

    const handleRestoreConfirm = async ({ serviceId, categoryId }) => {
        if (!serviceId) return;

        try {
            // Restore API
            await restoreService({
                id: serviceId,
                categoryId: Number(categoryId),
                token,
            }).unwrap();

            if (
                categoryId &&
                Number(categoryId) !== Number(selectedService?.categoryId)
            ) {
                await editServiceTrigger({
                    id: serviceId,
                    token,
                    body: {
                        name: selectedService?.name,
                        price: Number(selectedService?.price),
                        durationInMinutes: selectedService?.durationInMinutes,
                        categoryId: Number(categoryId),
                    },
                }).unwrap();
            }

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent:
                        "Service restored and moved to new category successfully",
                }),
            );

            setDeleteModalOpen(false);
        } catch (error) {
            console.error("Restore failed:", error);
            let errorMessage =
                error?.data?.message || "Restore failed occurred";
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMessage,
                }),
            );
        }
    };

    // Set Category Title dynamically
    const currentCategory = useMemo(() => {
        if (isAllMode) return { name: "All Services" };
        if (isDeletedMode) return { name: "Deleted Services" };

        return getAllCategory?.find(
            (cate) => cate?.id?.toString() === id?.toString(),
        );
    }, [getAllCategory, id, isAllMode, isDeletedMode]);

    // Active (enabled === true)
    const activeCategoryIds = useMemo(() => {
        return (
            getAllCategory
                ?.filter((cate) => cate?.enabled !== false)
                ?.map((cate) => cate?.id?.toString()) || []
        );
    }, [getAllCategory]);

    // Filter services based on active mode (All, Deleted, or Specific Category)
    const searchService = useMemo(() => {
        return (
            allServices?.filter((item) => {
                if (!item) return false;

                const isNotPackage = item.package === false;

                // Category match logic: All/Deleted modes allow all categories
                const matchesCategory =
                    isAllMode ||
                    isDeletedMode ||
                    item.categoryId?.toString() === id?.toString();

                // Check enabled status
                const matchesStatus = isDeletedMode
                    ? item.enabled === false
                    : item.enabled === true;

                const hasActiveCategory = activeCategoryIds.includes(
                    item.categoryId?.toString(),
                );

                const matchesSearch = item.name
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

                return (
                    matchesCategory &&
                    isNotPackage &&
                    matchesStatus &&
                    hasActiveCategory &&
                    matchesSearch
                );
            }) || []
        );
    }, [
        allServices,
        id,
        isAllMode,
        isDeletedMode,
        searchText,
        activeCategoryIds,
    ]);

    const handleActionClick = (actionType, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedService(item);

        if (actionType === "edit") {
            setEditModalOpen(true);
        } else {
            if (!isDeletedMode) {
                const activePackages =
                    allServices?.filter(
                        (pkg) =>
                            pkg?.package === true && pkg?.enabled !== false,
                    ) || [];

                const blockedPackages = activePackages.filter((pkg) =>
                    pkg?.includedServices?.some(
                        (serviceName) =>
                            serviceName?.trim()?.toLowerCase() ===
                            item?.name?.trim()?.toLowerCase(),
                    ),
                );

                if (blockedPackages.length > 0) {
                    const packageNames = blockedPackages
                        .map((p) => p.name)
                        .join(", ");

                    Modal.error({
                        title: `Cannot Delete "${item?.name}"`,
                        okText: "Understand",
                        okButtonProps: {
                            type: "primary",
                            className:
                                "bg-pink-500! hover:bg-pink-600! font-medium rounded-lg px-4",
                        },
                        content: (
                            <div className="mt-3 space-y-2 font-montserrat">
                                <p className="text-sm text-gray-600 font-medium">
                                    This service is currently used in active
                                    package(s):{" "}
                                    <span className="font-bold text-red-500">
                                        {packageNames}
                                    </span>
                                    .
                                </p>
                                <p className="text-xs text-gray-500">
                                    Please remove this service from the
                                    package(s) or disable the package first.
                                </p>
                            </div>
                        ),
                    });
                    return;
                }
            }

            setDeleteModalOpen(true);
        }
    };

    const handleModalCancel = () => {
        setEditModalOpen(false);
        setCreateModalOpen(false);
        setTimeout(() => {
            setSelectedService(null);
        }, 300);
    };

    const isLoading = isCategoryLoading || isServicesLoading;

    // Helper for empty list message
    const getEmptyMessage = () => {
        if (isDeletedMode) return "No deleted services found.";
        if (isAllMode) return "No services found.";
        return "No services found in this category.";
    };

    // Helper for sub-header subtitle
    const getSubTitle = () => {
        if (isDeletedMode)
            return "Manage all soft-deleted or inactive services";
        if (isAllMode) return "Manage all services across all categories";
        return "Manage all services under this category";
    };

    return (
        <>
            <SubHeaderSection
                title={
                    isCategoryLoading
                        ? "Loading..."
                        : currentCategory?.name || "Category Details"
                }
                subTitle={getSubTitle()}
                formType="Services"
                btnTitle="Services"
                placeholderTitle="Search service name..."
                backText="All Categories"
                showBackButton={true}
                categories={getAllCategory?.filter(
                    (cate) => cate?.enabled !== false,
                )}
                isAllMode={isAllMode || isDeletedMode}
                searchText={searchText}
                setSearchText={setSearchText}
                isEdit={editModalOpen}
                isOpen={editModalOpen || createModalOpen}
                onOpen={() => {
                    if (!editModalOpen) {
                        setSelectedService(null);
                        setCreateModalOpen(true);
                    }
                }}
                initialValue={editModalOpen ? selectedService : null}
                onCancel={handleModalCancel}
                triggerCreate={handleCreateService}
                triggerEdit={handleEditService}
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
                ) : searchService.length === 0 ? (
                    <Col span={24} className="text-center text-gray-400 mt-10">
                        {getEmptyMessage()}
                    </Col>
                ) : (
                    searchService.map((item) => (
                        <CategoryCard
                            key={item.id}
                            item={item}
                            categories={getAllCategory}
                            handleActionClick={handleActionClick}
                            isDeletedMode={isDeletedMode}
                        />
                    ))
                )}
            </Row>

            <ServiceConfirmationModal
                deleteModalOpen={deleteModalOpen}
                selectedService={selectedService}
                setDeleteModalOpen={setDeleteModalOpen}
                handleDeleteConfirm={handleDeleteConfirm}
                handleRestoreConfirm={handleRestoreConfirm}
                categories={getAllCategory?.filter(
                    (cate) => cate?.enabled !== false,
                )}
                isDeletedMode={isDeletedMode}
            />
        </>
    );
};

export default CategoryDetails;
