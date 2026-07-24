import { Card, Col, Row, Skeleton, Modal } from "antd";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryDataQuery,
    useGetAllServiceDataQuery,
} from "./servicesApi";
import { cn } from "../../../lib/utils";
import { Trash, X } from "lucide-react";
import { setMessage } from "../../../app/core/notifications/notiSlice";
import { useDispatch } from "react-redux";

const CategorySection = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation(); // 2. Delete Mutation Hook

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const onCancel = () => {
        setIsFormOpen(false);
        setSelectedService(null);
        setIsEdit(false);
    };

    const { data: getAllCategory = [], isLoading: isCategoryLoading } =
        useGetCategoryDataQuery();
    const { data: getAllServices = [], isLoading: isServiceLoading } =
        useGetAllServiceDataQuery();

    console.log(getAllCategory);

    const isLoading = isCategoryLoading || isServiceLoading;

    const handleDeleteCategory = (e, category) => {
        e.preventDefault();
        e.stopPropagation();

        const relatedServices = getAllServices.filter((service) => {
            const isIdMatch =
                service?.categoryId !== undefined &&
                category?.id !== undefined &&
                String(service.categoryId) === String(category.id);

            const isNameMatch =
                service?.categoryName &&
                category?.title &&
                service.categoryName.trim().toLowerCase() ===
                    category.title.trim().toLowerCase();

            return (isIdMatch || isNameMatch) && service?.enabled !== false;
        });

        Modal.confirm({
            title: `Delete "${category.title}" Category?`,
            icon: null,
            okText: "Delete",
            cancelText: "Cancel",
            okButtonProps: {
                danger: true,
                type: "primary",
                className:
                    "bg-red-500 hover:bg-red-600! font-medium rounded-lg px-4",
            },

            cancelButtonProps: {
                className:
                    "border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg px-4",
            },

            content: (
                <div className="mt-3 space-y-2">
                    <p className="text-sm text-gray-600 font-medium font-montserrat">
                        Deleting this category will also affect the following (
                        {relatedServices.length}) service(s) and move them to{" "}
                        <span className="text-red-500 font-bold font-montserrat">
                            "Deleted Services"
                        </span>
                        .
                    </p>

                    {relatedServices.length > 0 && (
                        <div className="bg-white-back border-2 border-gray-200 rounded-lg p-4 max-h-36 overflow-y-auto mt-3">
                            <p className="text-xs font-bold text-gray-500 mb-1">
                                Affected Services:
                            </p>
                            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                                {relatedServices.map((s) => (
                                    <li key={s.id}>{s.name || s.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ),
            async onOk() {
                try {
                    await deleteCategory(category.id).unwrap();
                    dispatch(
                        setMessage({
                            message: "Category deleted successfully!",
                            type: "success",
                        }),
                    );
                } catch (err) {
                    dispatch(
                        setMessage({
                            message:
                                err?.data?.message ||
                                "Failed to delete category.",
                            type: "error",
                        }),
                    );
                }
            },
        });
    };

    const categories = useMemo(() => {
        const activeServices = getAllServices.filter((item) => {
            const isNotPackage = item?.package !== true;
            const isEnabled = item?.enabled === true;
            return isNotPackage && isEnabled;
        });

        const deletedServices = getAllServices.filter((item) => {
            const isNotPackage = item?.package !== true;
            const isDeleted = item?.enabled === false;
            return isNotPackage && isDeleted;
        });

        const filteredCategories = getAllCategory
            ?.filter((cate) => cate?.name?.toLowerCase() !== "package")
            ?.map((cate) => {
                const serviceCount = activeServices.filter((service) => {
                    const isIdMatch =
                        service?.categoryId !== undefined &&
                        cate?.id !== undefined &&
                        String(service.categoryId) === String(cate.id);

                    const isNameMatch =
                        service?.categoryName &&
                        cate?.name &&
                        service.categoryName.trim().toLowerCase() ===
                            cate.name.trim().toLowerCase();

                    return isIdMatch || isNameMatch;
                }).length;

                return {
                    id: cate?.id,
                    key: cate?.name,
                    title: cate?.name || "",
                    count: serviceCount,
                };
            });

        const allList = [
            {
                id: "all",
                key: "all-services",
                title: "All Services",
                isAll: true,
                count: activeServices.length,
            },
            ...filteredCategories,
            {
                id: "deleted",
                key: "deleted-services",
                title: "Deleted Services",
                isDeleted: true,
                count: deletedServices.length,
            },
        ];

        if (!searchText.trim()) return allList;

        return allList.filter((item) =>
            item.title?.toLowerCase().includes(searchText.toLowerCase()),
        );
    }, [getAllCategory, getAllServices, searchText]);

    return (
        <>
            <SubHeaderSection
                title="Category"
                subTitle="Create, customize, and optimize your service catalog. Easily manage pricing, duration, and staff assignments in one place."
                btnTitle="Category"
                placeholderTitle="Search the category name"
                setSearchText={setSearchText}
                searchText={searchText}
                isOpen={isFormOpen}
                isEdit={isEdit}
                initialValue={selectedService}
                onCancel={onCancel}
                triggerCreate={createCategory}
            />

            <Row gutter={[16, 16]} className="mt-10!">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Col span={6} key={`skeleton-${index}`}>
                            <Card className="pt-6! min-h-32! rounded-xl! border-2! border-gray-100!">
                                <Skeleton
                                    active
                                    paragraph={{
                                        rows: 1,
                                        width: "90%",
                                    }}
                                    title={false}
                                    className="flex justify-center mt-2"
                                />
                            </Card>
                        </Col>
                    ))
                ) : categories.length === 0 ? (
                    <Col span={24} className="text-center text-gray-400 mt-10">
                        No categories found.
                    </Col>
                ) : (
                    categories.map((item, index) => {
                        const isAllServices = item?.isAll;
                        const isDeleted = item?.isDeleted;

                        const getTargetLink = () => {
                            if (isAllServices) return "/management/service/all";
                            if (isDeleted) return "/management/service/deleted";
                            return `/management/service/${item.id}`;
                        };

                        return (
                            <Col span={6} key={item.id || index}>
                                <Link to={getTargetLink()}>
                                    <Card
                                        className={cn(
                                            "group relative! pt-6! min-h-32! rounded-xl! border-primary! border-2! duration-400! shadow-sm! hover:shadow-md! ",
                                            isAllServices
                                                ? "bg-primary! text-white! hover:bg-white! hover:text-primary!"
                                                : isDeleted
                                                  ? "border-gray-400! border-dashed text-base! font-semibold text-gray-600! hover:bg-gray-100!"
                                                  : "bg-white! text-primary! hover:bg-primary! hover:text-white!",
                                        )}
                                    >
                                        {!isAllServices && !isDeleted && (
                                            <button
                                                type="button"
                                                onClick={(e) =>
                                                    handleDeleteCategory(
                                                        e,
                                                        item,
                                                    )
                                                }
                                                className="absolute top-2 right-2 z-20 p-1 text-white hover:text-red-500 transition-colors rounded-full hover:bg-gray-100"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}

                                        <div className="flex items-center justify-center gap-2">
                                            <h1 className="flex items-center gap-1.5 text-base font-medium">
                                                {isDeleted && (
                                                    <Trash className="w-4 h-4" />
                                                )}
                                                {item?.title}
                                            </h1>
                                            <span
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300",
                                                    isAllServices
                                                        ? "bg-white text-primary group-hover:bg-primary! group-hover:text-white!"
                                                        : isDeleted
                                                          ? "bg-gray-200! text-gray-400 text-center! group-hover:bg-gray-300!"
                                                          : "bg-primary! text-white! group-hover:bg-white! group-hover:text-primary!",
                                                )}
                                            >
                                                {item?.count || 0}
                                            </span>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    })
                )}
            </Row>
        </>
    );
};

export default CategorySection;
