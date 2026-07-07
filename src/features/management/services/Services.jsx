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
                subTitle="Create, customize, and optimize your service catalog. Easily manage pricing, duration, and staff assignments in one place."
                btnTitle="All Services"
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
                            <Link to={item.key}>
                                <Card
                                    className={cn(
                                        "relative pt-6! min-h-32! rounded-xl! border-primary! border-2! duration-400! shadow-sm! hover:shadow-md!",
                                        isActiveState
                                            ? "bg-white! text-primary! hover:bg-primary! hover:text-white!"
                                            : "bg-primary! text-white! hover:bg-white! hover:text-primary!",
                                    )}
                                >
                                    {!isActiveState ? (
                                        <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white shadow-inner z-10 hover:bg-primary" />
                                    ) : (
                                        <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-primary shadow-inner z-10 hover:bg-white hover:text-primary" />
                                    )}

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
