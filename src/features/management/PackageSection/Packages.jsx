import { Button, Card, Col, Modal, Row, Skeleton } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import PackageForm from "./PackageForm";
import PackageDeleteModal from "./PackageDeleteModal";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useGetAllServiceDataQuery } from "../services/servicesApi";
import {
    useCreatePackageMutation,
    useUpdatePackageMutation,
} from "./packageApi";

const Packages = () => {
    const [searchText, setSearchText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const { data: servicesData = [], isLoading } = useGetAllServiceDataQuery();

    const [createPackage] = useCreatePackageMutation();
    const [updatePackage] = useUpdatePackageMutation();

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

    const handleDeleteConfirm = () => {
        console.log("Deleting package:", selectedPackage?.id);
        setDeleteModalOpen(false);
    };

    const handleCancel = () => {
        setEditModalOpen(false);
    };

    return (
        <>
            <SubHeaderSection
                title="Packages"
                subTitle="Create, customize, and optimize your packages. Easily manage pricing, duration, and staff assignments in one place."
                placeholderTitle="Search package name..."
                setSearchText={setSearchText}
                searchText={searchText}
                triggerCreate={createPackage}
                triggerEdit={updatePackage}
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
                            <Card className="w-full border! border-gray-300! rounded-xl! hover:shadow-md transition-shadow">
                                <h1 className="text-xl mb-5 font-semibold">
                                    {item.name}
                                </h1>
                                <div className="grid-items-2 mb-5 flex justify-between">
                                    <div>
                                        <p className="text-gray-500">
                                            Package price:{" "}
                                        </p>
                                        <p className="my-2 text-gray-500">
                                            Duration:{" "}
                                        </p>
                                    </div>
                                    <div className="text-right font-medium">
                                        <p>{item.price} MMK</p>
                                        <p className="my-2">
                                            {item.durationInMinutes ||
                                                item.duration}{" "}
                                            mins
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

            <PackageDeleteModal
                deleteModalOpen={deleteModalOpen}
                selectedPackage={selectedPackage}
                setDeleteModalOpen={setDeleteModalOpen}
                handleDeleteConfirm={handleDeleteConfirm}
            />

            <Modal
                open={editModalOpen}
                title={
                    <h1 className="text-2xl text-primary mb-3">
                        {selectedPackage ? "Edit Package" : "Create Package"}
                    </h1>
                }
                onCancel={handleCancel}
                footer={null}
            >
                <PackageForm
                    isEditing={editModalOpen}
                    handleCancel={handleCancel}
                    initialValues={selectedPackage}
                    servicesData={servicesData}
                />
            </Modal>
        </>
    );
};

export default Packages;
