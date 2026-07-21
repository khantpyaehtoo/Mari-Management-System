import { Button, Card, Col, Row, Skeleton } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useGetAllServiceDataQuery,
    useGetCategoryDataQuery,
    useUpdateServiceMutation,
} from "./servicesApi";
import ServiceDeleteModal from "./ServiceDeleteModal";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../app/core/notiSlice";
import CategoryCard from "./CategoryCard";

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

    const { data: getAllCategory = [], isLoading: isCategoryLoading } =
        useGetCategoryDataQuery();

    const { data: allServices = [], isLoading: isServicesLoading } =
        useGetAllServiceDataQuery();

    const [createServiceTrigger] = useCreateServiceMutation();
    const [editServiceTrigger] = useUpdateServiceMutation();
    const [deleteService] = useDeleteServiceMutation();

    // Intercept and format for Creating a Service
    const handleCreateService = async (formValues) => {
        const formattedPayload = {
            name: formValues.name,
            price: Number(formValues.price),
            durationInMinutes: formValues.durationInMinutes,
            categoryId: isAllMode ? Number(formValues.categoryId) : Number(id),
        };
        return await createServiceTrigger(formattedPayload).unwrap();
    };

    // Intercept and format for Updating a Service
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
        return await editServiceTrigger(formattedPayload).unwrap();
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

    const currentCategory = useMemo(() => {
        if (isAllMode) return { name: "All Services" };
        return getAllCategory?.find(
            (cate) => cate?.id?.toString() === id?.toString(),
        );
    }, [getAllCategory, id, isAllMode]);

    const searchService = useMemo(() => {
        return (
            allServices?.filter((item) => {
                if (!item) return false;

                const matchesCategory =
                    isAllMode || item.categoryId?.toString() === id?.toString();
                const isNotPackage = item.package === false;
                const matchesSearch = item.name
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

                return matchesCategory && isNotPackage && matchesSearch;
            }) || []
        );
    }, [allServices, id, isAllMode, searchText]);

    const handleActionClick = (actionType, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedService(item);
        if (actionType === "edit") {
            setEditModalOpen(true);
        } else {
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

    return (
        <>
            <SubHeaderSection
                title={
                    isCategoryLoading
                        ? "Loading..."
                        : currentCategory?.name || "Category Details"
                }
                subTitle={
                    isAllMode
                        ? "Manage all services across all categories"
                        : "Manage all services under this category"
                }
                formType="Services"
                btnTitle="Services"
                placeholderTitle="Search service name..."
                showBackButton={true}
                categories={getAllCategory}
                isAllMode={isAllMode}
                searchText={searchText}
                setSearchText={setSearchText}
                isEdit={editModalOpen}
                isOpen={editModalOpen || createModalOpen}
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
                        {isAllMode
                            ? "No services found."
                            : "No services found in this category."}
                    </Col>
                ) : (
                    searchService.map((item) => (
                        <CategoryCard
                            item={item}
                            handleActionClick={handleActionClick}
                        />
                    ))
                )}
            </Row>

            <ServiceDeleteModal
                deleteModalOpen={deleteModalOpen}
                selectedService={selectedService}
                setDeleteModalOpen={setDeleteModalOpen}
                handleDeleteConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default CategoryDetails;
