import { Card, Col, Row, Skeleton } from "antd"; // Added Skeleton here
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllServiceDataQuery,
    useGetCategoryDataQuery,
} from "./servicesApi";
import { cn } from "../../../lib/utils";
// import { X } from "lucide-react";
import { setMessage } from "../../../app/core/notiSlice";
import { useDispatch } from "react-redux";

const CategorySection = () => {
    const [searchText, setSearchText] = useState("");
    const [createCategory] = useCreateCategoryMutation();
    const dispatch = useDispatch();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const onCancel = () => {
        setIsFormOpen(false);
        setSelectedService(null);
        setIsEdit(false);
    };

    const { data: getAllCategory = [], isLoading } = useGetCategoryDataQuery();

    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async () => {
        if (!selectedService?.id) return;

        try {
            await deleteCategory({ id: selectedService?.id }).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Deleted successfully",
                }),
            );
        } catch (error) {
            console.error("Delete failed:", error);

            const errorMessage =
                error?.data?.message || "Delete failed occurred";
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMessage,
                }),
            );
        }
    };

    const filteredCategories = getAllCategory
        ?.map((cate) => ({
            id: cate?.id,
            key: cate?.name,
            title: cate?.name || "",
        }))
        ?.filter((item) => item.title.toLowerCase() !== "package");

    const categories = [
        {
            id: "all",
            key: "all-services",
            title: "All Services",
            isAll: true,
        },
        ...filteredCategories,
    ];

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
                {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
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
                    : categories?.map((item, index) => {
                          const isAllServices = item?.isAll;

                          return (
                              <Col span={6} key={item.id || index}>
                                  <Link
                                      to={
                                          isAllServices
                                              ? `/management/service/all`
                                              : `/management/service/${item.id}`
                                      }
                                  >
                                      <Card
                                          className={cn(
                                              "relative pt-6! min-h-32! rounded-xl! border-primary! border-2! duration-400! shadow-sm! hover:shadow-md!",
                                              isAllServices
                                                  ? "bg-primary! text-white! hover:bg-white! hover:text-primary!"
                                                  : "bg-white! text-primary! hover:bg-primary! hover:text-white!",
                                          )}
                                      >
                                          <h1 className="w-auto text-center text-base font-medium mt-2">
                                              {item?.title}
                                          </h1>
                                      </Card>
                                  </Link>
                              </Col>
                          );
                      })}
            </Row>
        </>
    );
};

export default CategorySection;
