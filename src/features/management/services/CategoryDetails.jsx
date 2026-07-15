import { Button, Card, Col, Row, Skeleton } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetAllServiceDataQuery,
    useGetCategoryDataQuery,
} from "./servicesApi";
import ServiceDeleteModal from "./ServiceDeleteModal";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";

const CategoryDetails = () => {
    const [searchText, setSearchText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const { id } = useParams();

    const { data: getAllCategory = [], isLoading: isCategoryLoading } =
        useGetCategoryDataQuery();

    const { data: allServices = [], isLoading: isServicesLoading } =
        useGetAllServiceDataQuery();

    const currentCategory = useMemo(() => {
        return getAllCategory?.find(
            (cate) => cate?.id?.toString() === id?.toString(),
        );
    }, [getAllCategory, id]);

    const searchService = useMemo(() => {
        return (
            allServices?.filter((item) => {
                if (!item) return false;

                const matchesCategory =
                    item.categoryId?.toString() === id?.toString();
                const isNotPackage = item.package === false;
                const matchesSearch = item.name
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

                return matchesCategory && isNotPackage && matchesSearch;
            }) || []
        );
    }, [allServices, id, searchText]);

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

    const handleDeleteConfirm = () => {
        console.log("Deleting package:", selectedService?.id);
        setDeleteModalOpen(false);
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
                subTitle="Manage all services under this category"
                formType="Services"
                btnTitle="Services"
                placeholderTitle="Search service name..."
                showBackButton={true}
                searchText={searchText}
                setSearchText={setSearchText}
                isEdit={editModalOpen}
                isOpen={editModalOpen || createModalOpen}
                initialValue={editModalOpen ? selectedService : null}
                onCancel={handleModalCancel}
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
                ) : searchService.length === 0 ? (
                    <Col span={24} className="text-center text-gray-400 mt-10">
                        No services found in this category.
                    </Col>
                ) : (
                    searchService.map((item) => (
                        <Col
                            key={item.id}
                            xs={24}
                            sm={12}
                            xl={6}
                            className="flex"
                        >
                            <Card className="w-full border! border-gray-300! rounded-xl! hover:shadow-md transition-shadow">
                                <h1 className="text-xl mb-5 font-semibold">
                                    {item.name}
                                </h1>
                                <div className="grid-items-2 mb-5 flex justify-between">
                                    <div>
                                        <p className="text-gray-500">
                                            Service price:
                                        </p>
                                        <p className="my-2 text-gray-500">
                                            Duration:
                                        </p>
                                    </div>
                                    <div className="text-right font-medium">
                                        {/* API ကလာတဲ့ key name တွေနဲ့ ချိတ်ဆက်ပြသခြင်း */}
                                        <p>{item.price} MMK</p>
                                        <p className="my-2">
                                            {item.durationInMinutes} mins
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full mt-4">
                                    <Button
                                        onClick={(e) =>
                                            handleActionClick("edit", item, e)
                                        }
                                        className="bg-primary! text-white flex-1 min-w-17.5 flex items-center justify-center"
                                    >
                                        <Edit size={14} className="mr-1" /> Edit
                                    </Button>
                                    <Button
                                        onClick={(e) =>
                                            handleActionClick("delete", item, e)
                                        }
                                        className="border! border-red-500! text-red-500 hover:text-white! hover:bg-red-500! flex-1 min-w-21.25 flex items-center justify-center"
                                    >
                                        <Trash2 size={14} className="mr-1" />{" "}
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        </Col>
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
