import { Card, Col, Row, Skeleton } from "antd";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    useCreateCategoryMutation,
    useGetCategoryDataQuery,
    useGetAllServiceDataQuery,
} from "./servicesApi";
import { cn } from "../../../lib/utils";
import { Trash } from "lucide-react";

const CategorySection = () => {
    const [searchText, setSearchText] = useState("");
    const [createCategory] = useCreateCategoryMutation();

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

    const isLoading = isCategoryLoading || isServiceLoading;

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
                                            "group relative pt-6! min-h-32! rounded-xl! border-primary! border-2! duration-400! shadow-sm! hover:shadow-md!",
                                            isAllServices
                                                ? "bg-primary! text-white! hover:bg-white! hover:text-primary!"
                                                : isDeleted
                                                  ? "border-gray-400! border-dashed text-base! font-semibold text-gray-600! hover:bg-gray-100!"
                                                  : "bg-white! text-primary! hover:bg-primary! hover:text-white!",
                                        )}
                                    >
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
