import { Button, Card, Col, Row } from "antd";
import ServiceHeader from "./ServiceHeader";
import { Edit, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetServicesDataQuery } from "./servicesApi";
import ServiceDeleteModal from "./ServiceDeleteModal";

const mockPackages = [
    {
        id: "pkg-1",
        name: "Hello Service",
        price: "5000 mmk",
        duration: "50 mins",
    },
    {
        id: "pkg-2",
        name: "Standard Service",
        price: "12000 mmk",
        duration: "90 mins",
    },
    {
        id: "pkg-3",
        name: "Premium Service",
        price: "25000 mmk",
        duration: "120 mins",
    },
    {
        id: "pkg-4",
        name: "VIP Service",
        price: "40000 mmk",
        duration: "45 mins",
    },
];

const AllServices = () => {
    const [searchText, setSearchText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const { data: servicesData } = useGetServicesDataQuery();
    const service = servicesData;

    const searchService = useMemo(() => {
        const sourceData = service || mockPackages;

        return (
            sourceData?.filter((item) => {
                if (!item || !item.name) return false;

                return item.name
                    .toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
            }) || []
        );
    }, [searchText, service]);

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
    return (
        <>
            <ServiceHeader
                title="Services"
                selectedService={selectedService}
                isEdit={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                setSearchText={setSearchText}
                searchText={searchText}
            />

            <Row gutter={[16, 16]} className="mt-10!">
                {searchService.map((item) => (
                    <Col key={item.id} xs={24} sm={12} xl={6} className="flex">
                        <Link
                            to={`/service/${item.id}`}
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

            <ServiceDeleteModal
                deleteModalOpen={deleteModalOpen}
                selectedService={selectedService}
                setDeleteModalOpen={setDeleteModalOpen}
                handleDeleteConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default AllServices;
