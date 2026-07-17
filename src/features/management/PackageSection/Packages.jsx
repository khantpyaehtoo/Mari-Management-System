import { Button, Card, Col, Modal, Row, Skeleton } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../app/core/notiSlice";
import PackageForm from "./PackageForm";
import PackageDeleteModal from "./PackageDeleteModal";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import {
    useGetAllServiceDataQuery,
    useGetCategoryDataQuery,
} from "../services/servicesApi";
import {
    useCreatePackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
} from "./packageApi";

const Packages = () => {
    const [searchText, setSearchText] = useState("");
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const dispatch = useDispatch();

    const { data: servicesData = [], isLoading } = useGetAllServiceDataQuery();

    const [createPackage] = useCreatePackageMutation();
    const [updatePackage] = useUpdatePackageMutation();
    const [deletePackage, { isLoading: isDeleting }] =
        useDeletePackageMutation();

    const { data: categoriesData = [] } = useGetCategoryDataQuery();

    const searchPackages = useMemo(() => {
        return (
            servicesData?.filter((item) => {
                if (!item) return false;
                const isPackage = item.package === true;
                const matchesSearch = item.name
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                return isPackage && matchesSearch;
            }) || []
        );
    }, [searchText, servicesData]);

    // Handling Action Buttons
    const handleActionClick = (actionType, item, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedPackage(item);
        if (actionType === "edit") {
            setEditModalOpen(true);
        } else {
            setDeleteModalOpen(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedPackage?.id) return;
        try {
            await deletePackage({ id: selectedPackage.id }).unwrap();
            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Package deleted successfully",
                }),
            );
            setDeleteModalOpen(false);
        } catch (error) {
            console.error("Delete package failed:", error);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: error?.data?.message || "Delete failed",
                }),
            );
        }
    };

    // Close Modal
    const handleCancel = () => {
        setCreateModalOpen(false);
        setEditModalOpen(false);
        setSelectedPackage(null);
    };

    // CREATE API CALL
    const handleCreatePackage = async (formValues) => {
        try {
            const selectedServiceIds =
                formValues.serviceId?.map((id) => Number(id)).filter(Boolean) ||
                [];

            const packageCategory = categoriesData.find(
                (c) => c.name?.toLowerCase() === "packages",
            );
            const targetCategoryId = packageCategory
                ? Number(packageCategory.id)
                : 6;

            const formattedPayload = {
                name: formValues.packageName,
                price: Number(formValues.packagePrice),
                categoryId: targetCategoryId,
                serviceIds: selectedServiceIds,
            };

            console.log("Sending Payload to Backend:", formattedPayload);
            await createPackage(formattedPayload).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Package created successfully",
                }),
            );
            setCreateModalOpen(false);
        } catch (error) {
            console.error("Create package failed:", error);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: error?.data?.message || "Create failed",
                }),
            );
        }
    };

    // EDIT API CALL
    const handleEditPackage = async (formValues) => {
        try {
            if (!selectedPackage?.id) return;

            const selectedServiceIds =
                formValues.serviceId?.map((id) => Number(id)).filter(Boolean) ||
                [];

            const packageCategory = categoriesData.find(
                (c) => c.name?.toLowerCase() === "packages",
            );
            const targetCategoryId = packageCategory
                ? Number(packageCategory.id)
                : 6;

            const formattedPayload = {
                id: selectedPackage.id,
                body: {
                    name: formValues.packageName,
                    price: Number(formValues.packagePrice),
                    categoryId: targetCategoryId,
                    serviceIds: selectedServiceIds,
                },
            };

            console.log("Sending Update Payload to Backend:", formattedPayload);
            await updatePackage(formattedPayload).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Package updated successfully",
                }),
            );
            setEditModalOpen(false);
        } catch (error) {
            console.error("Update package failed:", error);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: error?.data?.message || "Update failed",
                }),
            );
        }
    };

    return (
        <>
            <SubHeaderSection
                title="Packages"
                subTitle="Create, customize, and optimize your packages. Easily manage pricing, duration, and staff assignments in one place."
                placeholderTitle="Search package name..."
                setSearchText={setSearchText}
                searchText={searchText}
                triggerCreate={() => setCreateModalOpen(true)}
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
                ) : searchPackages.length === 0 ? (
                    <Col span={24} className="text-center text-gray-400 mt-10">
                        No packages found.
                    </Col>
                ) : (
                    searchPackages.map((item) => (
                        <Col
                            key={item.id}
                            xs={24}
                            sm={12}
                            xl={6}
                            className="flex"
                        >
                            <Card className="w-full border border-gray-200! rounded-xl shadow-xs hover:shadow-md transition-all duration-300 bg-white">
                                {/* Header Section */}
                                <h1 className="text-lg font-bold text-gray-800 mb-4 line-clamp-1">
                                    {item.name}
                                </h1>

                                {/* Details Section */}
                                <div className="space-y-3 mb-6 text-sm">
                                    {/* Includes Services Row */}
                                    <div className="flex justify-between items-start gap-4">
                                        <span className="text-gray-400 shrink-0">
                                            Includes Services:
                                        </span>
                                        <span
                                            className="text-right font-semibold text-primary wrap-break-words max-w-[65%] line-clamp-2"
                                            title={
                                                item.includedServices &&
                                                item.includedServices.length > 0
                                                    ? item.includedServices.join(
                                                          ", ",
                                                      )
                                                    : "No services"
                                            }
                                        >
                                            {item.includedServices &&
                                            item.includedServices.length > 0
                                                ? item.includedServices.join(
                                                      ", ",
                                                  )
                                                : "No services"}
                                        </span>
                                    </div>

                                    {/* Package Price Row */}
                                    <div className="flex justify-between items-baseline gap-4">
                                        <span className="text-gray-400 shrink-0">
                                            Package price:
                                        </span>
                                        <span className="text-right font-medium text-gray-600">
                                            {Number(
                                                item.price,
                                            ).toLocaleString()}{" "}
                                            MMK
                                        </span>
                                    </div>

                                    {/* Duration Row */}
                                    <div className="flex justify-between items-baseline gap-4">
                                        <span className="text-gray-400 shrink-0">
                                            Duration:
                                        </span>
                                        <span className="text-right font-medium text-gray-600">
                                            {item.durationInMinutes ||
                                                item.duration ||
                                                0}{" "}
                                            mins
                                        </span>
                                    </div>
                                </div>

                                {/* Actions Section */}
                                <div className="flex gap-2 w-full mt-auto pt-2 border-t border-gray-100">
                                    <Button
                                        onClick={(e) =>
                                            handleActionClick("edit", item, e)
                                        }
                                        className="bg-primary! hover:bg-primary-hover! text-white border-none flex-1 h-9 flex items-center justify-center rounded-lg font-medium transition-colors"
                                    >
                                        <Edit size={14} className="mr-1.5" />{" "}
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={(e) =>
                                            handleActionClick("delete", item, e)
                                        }
                                        className="border border-red-200! text-red-500 hover:text-white! hover:bg-red-500! flex-1 h-9 flex items-center justify-center rounded-lg font-medium transition-colors"
                                    >
                                        <Trash2 size={14} className="mr-1.5" />{" "}
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            <PackageDeleteModal
                deleteModalOpen={deleteModalOpen}
                selectedPackage={selectedPackage}
                setDeleteModalOpen={setDeleteModalOpen}
                handleDeleteConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
            />

            {/* CREATE PACKAGE MODAL */}
            <Modal
                open={createModalOpen}
                title={
                    <h1 className="text-2xl text-primary mb-3">
                        Create Package
                    </h1>
                }
                onCancel={handleCancel}
                footer={null}
                destroyOnHidden
            >
                <PackageForm
                    isEditing={false}
                    handleCancel={handleCancel}
                    servicesData={servicesData}
                    triggerAction={handleCreatePackage}
                />
            </Modal>

            {/* EDIT PACKAGE MODAL */}
            <Modal
                open={editModalOpen}
                title={
                    <h1 className="text-2xl text-primary mb-3">Edit Package</h1>
                }
                onCancel={handleCancel}
                footer={null}
                destroyOnHidden
            >
                <PackageForm
                    isEditing={true}
                    handleCancel={handleCancel}
                    initialValues={selectedPackage}
                    servicesData={servicesData}
                    triggerAction={handleEditPackage}
                />
            </Modal>
        </>
    );
};

export default Packages;
