import { Image, Space, Table, Button } from "antd";
import { Edit, Trash2 } from "lucide-react";
import flowerProfile from "../../../public/flowerProfile.jpg";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";

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
    const columns = [
        {
            title: "Service",
            dataIndex: "service",
            key: "service",
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
                    <Button className="!editBtn">
                        <Edit size={18} />
                    </Button>
                    <Button
                        className="!deleteBtn"
                        onClick={(e) => console.log("clicked", e)}
                    >
                        <Trash2 size={18} />
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <SubHeaderSection title={"Services"} />

            <div className="table-wrapper">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Services;
