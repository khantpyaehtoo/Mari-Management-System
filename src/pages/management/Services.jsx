import { Image, Space, Table, Button } from "antd";
import { Edit, Trash2 } from "lucide-react";
import flowerProfile from "../../../public/flowerProfile.jpg";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useState } from "react";
// import { useState } from "react";

const data = [
    {
        key: "1",
        service: (
            <Image
                src={flowerProfile}
                width={50}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        name: "Nails Cleaning",
        price: "120,000",
        serviceId: "DB-200",
    },
    {
        key: "2",
        service: (
            <Image
                src={flowerProfile}
                width={50}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        name: "Nails Cleaning",
        price: "120,000",
        serviceId: "DB-200",
    },
    {
        key: "3",
        service: (
            <Image
                src={flowerProfile}
                width={50}
                alt="profile"
                className="!rounded-md !shadow-sm"
            />
        ),
        name: "Nails Cleaning",
        price: "120,000",
        serviceId: "DB-200",
    },
];

const Services = () => {
    const [searchText, setSearchText] = useState("");

    // const [isFormOpen, setIsFormOpen] = useState(false);
    // const [isEdit, setIsEdit] = useState(null);

    // const handleEditBtn = (id) => {
    //     setIsEdit(null);
    //     setIsFormOpen(true);
    // };
    const columns = [
        {
            title: "Service",
            dataIndex: "service",
            key: "service",
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                    String(record.service)
                        .toLowerCase()
                        .includes(value.toLowerCase) ||
                    String(record.name)
                        .toLowerCase()
                        .includes(value.toLowerCase) ||
                    String(record.serviceId)
                        .toLowerCase()
                        .includes(value.toLowerCase)
                );
            },
        },
        {
            title: "Service Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "serviceId",
            dataIndex: "serviceId",
            key: "serviceId",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Space>
                    <Button
                        className="!editBtn"
                        // onClick={(e) => handleEditBtn(e.target.value)}
                    >
                        <Edit size={18} />
                    </Button>
                    <Button
                        className="!deleteBtn"
                        // onClick={(e) => console.log("clicked", e)}
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
                title={"Services"}
            />
            <div className="table-wrapper">
                <Table columns={columns} dataSource={data} />
                {console.log(data)}
            </div>
        </div>
    );
};

export default Services;
