import { Space, Table, Button } from "antd";
import { Edit, Trash2 } from "lucide-react";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import AddForm from "../../components/modals/AddForm";
import { useState } from "react";
import {
    useDeleteServiceMutation,
    useGetServicesDataQuery,
} from "../../features/management/services/servicesApi";
import { useSelector } from "react-redux";

// const data = [
//     {
//         key: "1",
//         service: (
//             <Image
//                 src={flowerProfile}
//                 width={50}
//                 alt="profile"
//                 className="!rounded-md !shadow-sm"
//             />
//         ),
//         name: "Nails Cleaning",
//         price: "120,000",
//         serviceId: "DB-200",
//     },
//     {
//         key: "2",
//         service: (
//             <Image
//                 src={flowerProfile}
//                 width={50}
//                 alt="profile"
//                 className="!rounded-md !shadow-sm"
//             />
//         ),
//         name: "Nails Cleaning",
//         price: "120,000",
//         serviceId: "DB-200",
//     },
//     {
//         key: "3",
//         service: (
//             <Image
//                 src={flowerProfile}
//                 width={50}
//                 alt="profile"
//                 className="!rounded-md !shadow-sm"
//             />
//         ),
//         name: "Nails Cleaning",
//         price: "120,000",
//         serviceId: "DB-200",
//     },
// ];

const Services = () => {
    const { token } = useSelector((state) => state?.auth);
    // console.log(token);
    const [searchText, setSearchText] = useState("");
    const { data: servicesData } = useGetServicesDataQuery();
    const [deleteService] = useDeleteServiceMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const handleEditBtn = (service) => {
        setSelectedService(service);
        setIsEdit(true);
        setIsFormOpen(true);
    };

    const deleteBtn = async (serviceId, name) => {
        if (window.confirm(`Are you sure to delete this ${name}?`)) {
            try {
                await deleteService({
                    id: serviceId,
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
            render: (_, member, index) => <p> {index + 1} </p>,
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
                    String(record.serviceCategory)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.price)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            },
        },
        {
            title: "description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Service-Category",
            dataIndex: "serviceCategory",
            key: "serviceCategory",
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
                        className="!editBtn"
                        onClick={() => handleEditBtn(row)}
                    >
                        <Edit size={18} />
                    </Button>
                    <Button
                        className="!deleteBtn"
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
            <SubHeaderSection setSearchText={setSearchText} title="Services" />

            <AddForm
                title="Services"
                isEditMode={isEdit}
                initialValues={selectedService}
                open={isFormOpen}
                onCancel={() => {
                    setIsFormOpen(false);
                    setSelectedService(null);
                    setIsEdit(false);
                }}
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
