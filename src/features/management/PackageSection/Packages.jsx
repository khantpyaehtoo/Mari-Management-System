import { Link } from "react-router-dom";
// import ServiceHeader from "./ServiceHeader";
import { Button, Card, Col, Modal, Row, Space, Typography } from "antd";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
    useCreatePackageMutation,
    useUpdatePackageMutation,
} from "../services/servicesApi";

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

    // Track the entire object instead of just the ID to make it easy to display in modals
    const [selectedPackage, setSelectedPackage] = useState(null);

    const [createPackage] = useCreatePackageMutation();
    const [editPackage] = useUpdatePackageMutation();

    const handleActionClick = (actionType, item, e) => {
        e.preventDefault();
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
                btnTitle="Packages"
                subTitle="Create, customize, and optimize your packages. Easily manage pricing, duration, and staff assignments in one place."
                placeholderTitle="Search the category name"
                setSearchText={setSearchText}
                searchText={searchText}
                triggerCreate={createPackage}
                triggerEdit={editPackage}
            />

            {/* <ServiceHeader title="Packages" /> */}

            {/* Main Cards Grid */}
            <Row gutter={[16, 16]} className="mt-10!">
                {mockPackages.map((item) => (
                    <Col key={item.id} span={6}>
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
                                <Space size="middle">
                                    <Button
                                        onClick={(e) =>
                                            handleActionClick("edit", item, e)
                                        }
                                        className="bg-primary! text-white"
                                    >
                                        <Edit
                                            size={14}
                                            className="inline mr-1"
                                        />{" "}
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={(e) =>
                                            handleActionClick("delete", item, e)
                                        }
                                        className="border! border-red-500! text-red-500 hover:text-white! hover:bg-red-500!"
                                    >
                                        <Trash2
                                            size={14}
                                            className="inline mr-1"
                                        />{" "}
                                        Delete
                                    </Button>
                                </Space>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

            <Modal
                open={deleteModalOpen}
                title={selectedPackage?.name || "Delete Package"}
                onCancel={() => setDeleteModalOpen(false)}
                footer={null}
            >
                <Typography.Title level={4} className="mt-4!">
                    Are you sure you want to delete this package?
                </Typography.Title>
                <Space className="my-4 w-full justify-end">
                    <Button
                        onClick={() => setDeleteModalOpen(false)}
                        className="bg-gray-100!"
                    >
                        <CloseCircleOutlined size={14} /> Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        className="bg-red-500! text-white! border-red-500!"
                    >
                        <Trash2 size={14} /> Delete
                    </Button>
                </Space>
            </Modal>

            <Modal
                open={editModalOpen}
                title={
                    <h1>
                        {selectedPackage ? "Edit Package" : "Create Package"}
                    </h1>
                }
                onCancel={() => setEditModalOpen(false)}
                footer={null}
            >
                <p className="py-4">
                    Editing settings for:
                    <strong>{selectedPackage?.name}</strong>
                </p>
            </Modal>
        </>
    );
};

export default Packages;
