import { Image, Space, Table } from "antd";
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
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-200">
                        <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100">
                        <Trash2 size={18} />
                    </button>
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
