import { Card, Col, Row, Skeleton } from "antd"; // Added Skeleton here
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    useCreateServiceMutation,
    useGetCategoryDataQuery,
    useUpdateServiceMutation,
} from "./servicesApi";
import { cn } from "../../../lib/utils";

const Services = () => {
    const [searchText, setSearchText] = useState("");
    const [createService] = useCreateServiceMutation();
    const [editService] = useUpdateServiceMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const onCancel = () => {
        setIsFormOpen(false);
        setSelectedService(null);
        setIsEdit(false);
    };

    const { data: getAllCategory = [], isLoading } = useGetCategoryDataQuery();

    const categories = getAllCategory
        ?.map((cate) => ({
            id: cate?.id,
            key: cate?.name,
            title: cate?.name || "",
        }))
        ?.filter((item) => item.title.toLowerCase() !== "package");

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
                triggerCreate={createService}
                triggerEdit={editService}
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
                          const isActiveState =
                              item.title.includes("All Services");

                          return (
                              <Col span={6} key={item.id || index}>
                                  <Link to={`/management/service/${item.id}`}>
                                      <Card
                                          className={cn(
                                              "relative pt-6! min-h-32! rounded-xl! border-primary! border-2! duration-400! shadow-sm! hover:shadow-md!",
                                              isActiveState
                                                  ? "bg-white! text-primary! hover:bg-primary! hover:text-white!"
                                                  : "bg-primary! text-white! hover:bg-white! hover:text-primary!",
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

export default Services;
