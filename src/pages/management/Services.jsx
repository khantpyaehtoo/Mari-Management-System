import { Space, Table, Button } from "antd";
import { Edit, Trash2 } from "lucide-react";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
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
    const { data: servicesData, isError } = useGetServicesDataQuery();
    const [deleteService] = useDeleteServiceMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(null);

    const handleEditBtn = (serviceId) => {
        setIsEdit(null);
        setIsFormOpen(false);
        if (serviceId) {
            try {
                setIsEdit("Edit");
                setIsFormOpen(true);
            } catch (error) {
                console.log("something went wrong!", isError?.message || error);
            } finally {
                setIsFormOpen(!isFormOpen);
            }
        }
    };

    const deleteBtn = async (serviceId, name) => {
        setIsEdit(null);
        setIsFormOpen(false);
        if (window.confirm(`Are you sure to delete this ${name}`)) {
            try {
                const deleteFunc = await deleteService({
                    id: serviceId,
                    token,
                });
                return deleteFunc;
            } catch (error) {
                console.log("something went wrong!", isError?.message || error);
            } finally {
                setIsFormOpen(!isFormOpen);
            }
        }
        try {
            if (serviceId) {
                setIsEdit("Edit");
                setIsFormOpen(true);
            } else {
                console.log(isError);
            }
        } catch (error) {
            console.log("something went wrong!", error);
        } finally {
            setIsFormOpen(!isFormOpen);
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
                        .includes(value.toLowerCase) ||
                    String(record.serviceCategory)
                        .toLowerCase()
                        .includes(value.toLowerCase) ||
                    String(record.price)
                        .toLowerCase()
                        .includes(value.toLowerCase)
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
                        onClick={() => handleEditBtn(row.id)}
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
            <SubHeaderSection
                setSearchText={setSearchText}
                title={!isEdit ? "Services" : isEdit}
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
