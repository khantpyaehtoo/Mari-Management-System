import { Card, Col, Row } from "antd";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    useCreateServiceMutation,
    useUpdateServiceMutation,
} from "./servicesApi";
import { cn } from "../../../lib/utils";
// import { useSelector } from "react-redux";

const Services = () => {
    // const { token } = useSelector((state) => state?.auth);
    const [createCategoryInput, setCreateCategoryInput] = useState("");
    // const nav = useNavigate();

    // const { data: servicesData } = useGetServicesDataQuery();
    // const [deleteService] = useDeleteServiceMutation();
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

    // const handleEditBtn = (service) => {
    //     setSelectedService(service);
    //     setIsEdit(true);
    //     setIsFormOpen(true);
    // };

    // const deleteBtn = async (id, name) => {
    //     if (window.confirm(`Are you sure to delete this ${name}?`)) {
    //         try {
    //             await deleteService({
    //                 id,
    //                 token,
    //             }).unwrap();
    //         } catch (error) {
    //             console.error("Delete failed:", error);
    //             alert("Something went wrong while deleting!");
    //         }
    //     }
    // };

    const categories = [
        {
            key: "category-packages",
            title: "Packages",
        },
        {
            key: "all-services",
            title: "All Services",
        },
        {
            key: "/basic-care",
            title: "Basic Care",
        },
        {
            key: "/gel-polish",
            title: "Gel Polish Services",
        },
        {
            key: "/nail-art",
            title: "Nail Art",
        },
        {
            key: "/extension",
            title: "Extensions",
        },
        {
            key: "/treatments",
            title: "Treatments and removal",
        },
    ];
    return (
        <>
            <SubHeaderSection
                title="Services"
                btnTitle="Category"
                subTitle="Create, customize, and optimize your service catalog. Easily manage pricing, duration, and staff assignments in one place."
                placeholderTitle="Write the category name"
                setCreateCategoryInput={setCreateCategoryInput}
                createCategoryInput={createCategoryInput}
                isOpen={isFormOpen}
                isEdit={isEdit}
                initialValue={selectedService}
                onCancel={onCancel}
                triggerCreate={createService}
                triggerEdit={editService}
            />

            <Row gutter={[16, 16]} className="mt-10!">
                {categories.map((item, index) => (
                    <Col span={6} key={index}>
                        <Link to={item.key}>
                            <Card
                                className={cn(
                                    item.title.includes("Packages") ||
                                        item.title.includes("All Services")
                                        ? "bg-white! text-primary! hover:bg-primary! hover:text-white!"
                                        : "bg-primary! text-white! hover:bg-white! hover:text-primary!",
                                    "pt-6! min-h-30! rounded-xl! border-primary! border-2! duration-400! shadow-sm! hover:shadow-md!",
                                )}
                            >
                                <h1 className="w-auto text-center text-base">
                                    {item.title}
                                </h1>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Services;
