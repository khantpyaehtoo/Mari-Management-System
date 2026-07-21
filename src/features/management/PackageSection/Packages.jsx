import { Card, Col, Row, Skeleton } from "antd";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // Route ပြောင်းရန် Link ထည့်ပါ
import { setMessage } from "../../../app/core/notiSlice";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import PackageCard from "./PackageCard";
import PackageDeleteModal from "./PackageDeleteModal";
import {
    useGetAllServiceDataQuery,
    useGetCategoryDataQuery,
} from "../services/servicesApi";
import {
    useCreatePackageMutation,
    useUpdatePackageMutation,
} from "./packageApi";
import { StarX } from "lucide-react";

const Packages = () => {
    const [searchText, setSearchText] = useState("");

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const dispatch = useDispatch();

    const { data: servicesData = [], isLoading } = useGetAllServiceDataQuery();
    const { data: categoriesData = [] } = useGetCategoryDataQuery();

    const [createPackage] = useCreatePackageMutation();
    const [updatePackage, { isLoading: isUpdating }] =
        useUpdatePackageMutation();

    const activePackages = useMemo(() => {
        return (
            servicesData?.filter((item) => {
                if (!item) return false;
                const isPackage = item.package === true;
                const isEnabled = item.enabled !== false;
                const matchesSearch = item.name
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

                return isPackage && isEnabled && matchesSearch;
            }) || []
        );
    }, [searchText, servicesData]);

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

    const handleDeleteConfirm = async () => {
        if (!selectedPackage?.id) return;
        try {
            await updatePackage({
                id: selectedPackage.id,
                body: {
                    name: selectedPackage.name,
                    price: Number(selectedPackage.price),
                    categoryId: selectedPackage.categoryId,
                    serviceIds: selectedPackage.serviceIds,
                    enabled: false,
                },
            }).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Package disabled successfully",
                }),
            );
            setDeleteModalOpen(false);
        } catch (error) {
            console.error("Disable package failed:", error);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: error?.data?.message || "Disable failed",
                }),
            );
        }
    };

    // Close Handler for AddForm Edit Modal
    const handleCancel = () => {
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

        return await createPackage(formattedPayload).unwrap();
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

        return await updatePackage(formattedPayload).unwrap();
    };

    return (
        <>
            <SubHeaderSection
                title="Packages"
                subTitle="Create, customize, and optimize your packages. Easily manage pricing, duration, and staff assignments in one place."
                placeholderTitle="Search package name..."
                setSearchText={setSearchText}
                searchText={searchText}
                triggerCreate={handleCreatePackage}
                triggerEdit={handleEditPackage}
                isOpen={isEditOpen}
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
                                            0
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

            <PackageDeleteModal
                deleteModalOpen={deleteModalOpen}
                selectedPackage={selectedPackage}
                setDeleteModalOpen={setDeleteModalOpen}
                handleDisableConfirm={handleDeleteConfirm}
                isLoading={isUpdating}
            />
        </>
    );
};

export default Packages;
