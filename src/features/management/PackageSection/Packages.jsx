import { Link } from "react-router-dom";
// import ServiceHeader from "./ServiceHeader";
import { Button, Card, Col, Modal, Row } from "antd";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
// import {
// useCreatePackageMutation,
// useUpdatePackageMutation,
// } from "../services/servicesApi";
import PackageForm from "./PackageForm";
import PackageDeleteModal from "./PackageDeleteModal";
import { useGetPackageDataQuery } from "./packageApi";

const mockPackages = [
    {
        id: "pkg-1",
        name: "Hello Package",
        price: "5000 mmk",
        duration: "50 mins",
    },
    {
        id: "pkg-2",
        name: "Standard Package",
        price: "12000 mmk",
        duration: "90 mins",
    },
    {
        id: "pkg-3",
        name: "Premium Package",
        price: "25000 mmk",
        duration: "120 mins",
    },
    {
        id: "pkg-4",
        name: "VIP Express",
        price: "40000 mmk",
        duration: "45 mins",
    },
];

const Packages = () => {
    const [searchText, setSearchText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // const [createPackage] = useCreatePackageMutation();
    // const [editPackage] = useUpdatePackageMutation();
    const { data: packagesData } = useGetPackageDataQuery();
    const packages = packagesData;

    const searchPackages = useMemo(() => {
        const sourceData = packages || mockPackages;

        return (
            sourceData?.filter((item) => {
                if (!item || !item.name) return false;

                return item.name
                    .toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
            }) || []
        );
    }, [searchText, packages]);

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

    return (
        <>
            <SubHeaderSection
                title="Packages"
                subTitle="Create, customize, and optimize your packages. Easily manage pricing, duration, and staff assignments in one place."
                placeholderTitle="Search the category name"
                setSearchText={setSearchText}
                searchText={searchText}
                // triggerCreate={createPackage}
                // triggerEdit={editPackage}
            />

            {/* Main Cards Grid */}
            <Row gutter={[16, 16]} className="mt-10!">
                {searchPackages.map((item) => (
                    <Col key={item.id} xs={24} sm={12} xl={6} className="flex">
                        <Link
                            to={`/packages/${item.id}`}
                            className="block no-underline"
                        >
                            <Card className="border! border-gray-300! rounded-xl! hover:shadow-md transition-shadow">
                                <h1 className="text-xl mb-5 font-semibold">
                                    {item.name}
                                </h1>
                                <div className="grid-items-2 mb-5 flex justify-between">
                                    <div>
                                        <p className="text-gray-500">
                                            Service price:{" "}
                                        </p>
                                        <p className="my-2 text-gray-500">
                                            Duration:{" "}
                                        </p>
                                    </div>
                                    <div className="text-right font-medium">
                                        <p>{item.price}</p>
                                        <p className="my-2">{item.duration}</p>
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
                        </Link>
                    </Col>
                ))}
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
                onCancel={() => setEditModalOpen(false)}
                footer={null}
            >
                <PackageForm isEditing={editModalOpen} />
            </Modal>
        </>
    );
};

export default Packages;
