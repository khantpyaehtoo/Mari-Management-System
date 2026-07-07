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
    // const [createCategoryInput, setCreateCategoryInput] = useState("");
    const [searchText, setSearchText] = useState("");
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
            id: 1,
            key: "all-services",
            title: "All Services",
        },
        {
            id: 2,
            key: "/basic-care",
            title: "Basic Care",
        },
        {
            id: 3,
            key: "/gel-polish",
            title: "Gel Polish Services",
        },
        {
            id: 4,
            key: "/nail-art",
            title: "Nail Art",
        },
        {
            id: 5,
            key: "/extension",
            title: "Extensions",
        },
        {
            id: 6,
            key: "/treatments",
            title: "Treatments and removal",
        },
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
                triggerCreate={createService}
                triggerEdit={editService}
            />

            <Row gutter={[16, 16]} className="mt-10!">
                {categories.map((item, index) => {
                    const isActiveState = item.title.includes("All Services");

                    return (
                        <Col span={6} key={index}>
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
                                        {item.title}
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
