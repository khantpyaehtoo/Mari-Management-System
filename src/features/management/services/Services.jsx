import { Space, Table, Button } from "antd";
import { Edit, Trash2 } from "lucide-react";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useState } from "react";
import {
    useDeleteServiceMutation,
    useGetServicesDataQuery,
} from "./servicesApi";
import { useSelector } from "react-redux";

const Services = () => {
    const { token } = useSelector((state) => state?.auth);
    const [searchText, setSearchText] = useState("");
    const { data: servicesData } = useGetServicesDataQuery();
    const [deleteService] = useDeleteServiceMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const onCancel = () => {
        setIsFormOpen(false);
        setSelectedService(null);
        setIsEdit(false);
    };

    const handleEditBtn = (service) => {
        setSelectedService(service);
        setIsEdit(true);
        setIsFormOpen(true);
    };

    const deleteBtn = async (id, name) => {
        if (window.confirm(`Are you sure to delete this ${name}?`)) {
            try {
                await deleteService({
                    id,
                    token,
                }).unwrap();
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Something went wrong while deleting!");
            }
        }
    };

    const columns = [
        {
            title: "No.",
            render: (_, value, index) => <p> {index + 1} </p>,
        },
        {
            title: "Service Name",
            dataIndex: "name",
            key: "name",
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return (
                    String(record.name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.categoryName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.price)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Service-Category",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Service-Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Service-Duration",
            dataIndex: "durationInMinutes",
            key: "durationInMinutes",
        },
        {
            title: "Action",
            key: "action",
            render: (row) => (
                <Space>
                    <Button
                        className="editBtn!"
                        onClick={() => handleEditBtn(row)}
                    >
                        <Edit size={18} />
                    </Button>
                    <Button
                        className="deleteBtn!"
                        onClick={() => deleteBtn(row.id, row.name)}
                    >
                        <Trash2 size={18} />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <SubHeaderSection
                title="Services"
                setSearchText={setSearchText}
                isOpen={isFormOpen}
                isEdit={isEdit}
                initialValue={selectedService}
                onCancel={onCancel}
                subTitle="Manage your elite staff to unlock peak operational efficiency."
            />

            <div className="table-wrapper">
                <Table
                    columns={columns}
                    dataSource={servicesData}
                    rowKey={(record) => record?.id}
                />
            </div>
        </div>
    );
};

export default Services;
