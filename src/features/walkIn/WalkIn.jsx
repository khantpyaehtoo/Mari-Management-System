import { Grid, Table, Button, Modal, Space, Tag, Typography, Flex } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import TableHeaderSection from "../../components/tableHeaderSection/TableHeaderSection";
import { EyeOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const renderLists = ["All"];

const WalkInDummyData = [
    {
        key: "1",
        walkInId: "CUST-001",
        staffName: "Sarah Jenkins",
        date: "2026-06-25",
        startedTime: "10:00 AM",
        services: [
            {
                name: "Deep Tissue Massage",
                duration: 60,
                baseAmount: 85.0,
                extraCharges: 0,
            },
            {
                name: "Hydrating Facial",
                duration: 45,
                baseAmount: 50.0,
                extraCharges: 15.0,
            },
        ],
    },
    {
        key: "2",
        walkInId: "CUST-084",
        staffName: "Marcus Vance",
        date: "2026-06-25",
        startedTime: "11:30 AM",
        services: [
            {
                name: "Hydrating Facial",
                duration: 45,
                baseAmount: 50.0,
                extraCharges: 0,
            },
        ],
    },
    {
        key: "3",
        walkInId: "CUST-112",
        staffName: "Elena Rostova",
        date: "2026-06-26",
        startedTime: "01:00 PM",
        services: [
            {
                name: "Gel Manicure",
                duration: 45,
                baseAmount: 35.0,
                extraCharges: 0,
            },
            {
                name: "Gel Pedicure",
                duration: 45,
                baseAmount: 40.0,
                extraCharges: 0,
            },
        ],
    },
    {
        key: "4",
        walkInId: "CUST-023",
        staffName: "Sarah Jenkins",
        date: "2026-06-26",
        startedTime: "03:00 PM",
        services: [
            {
                name: "Hydrating Facial Treatment",
                duration: 75,
                baseAmount: 110.0,
                extraCharges: 5.0,
            },
        ],
    },
    {
        key: "5",
        walkInId: "CUST-057",
        staffName: "Marcus Vance",
        date: "2026-06-27",
        startedTime: "09:15 AM",
        services: [
            {
                name: "Beard Trim & Hot Towel Shave",
                duration: 30,
                baseAmount: 103.0,
                extraCharges: 10.0,
            },
        ],
    },
    {
        key: "6",
        walkInId: "CUST-144",
        staffName: "Elena Rostova",
        date: "2026-06-27",
        startedTime: "11:00 AM",
        services: [
            {
                name: "Hair Coloring (Balayage)",
                duration: 120,
                baseAmount: 150.0,
                extraCharges: 25.0,
            },
            {
                name: "Premium Haircut & Styling",
                duration: 45,
                baseAmount: 50.0,
                extraCharges: 0,
            },
        ],
    },
    {
        key: "7",
        walkInId: "CUST-201",
        staffName: "Sarah Jenkins",
        date: "2026-06-28",
        startedTime: "02:30 PM",
        services: [
            {
                name: "Aromatherapy Body Scrub",
                duration: 60,
                baseAmount: 95.0,
                extraCharges: 0,
            },
        ],
    },
    {
        key: "8",
        walkInId: "CUST-099",
        staffName: "Marcus Vance",
        date: "2026-06-28",
        startedTime: "04:00 PM",
        services: [
            {
                name: "Express Facial",
                duration: 30,
                baseAmount: 40.0,
                extraCharges: 5.0,
            },
            {
                name: "Eyebrow Threading & Wax",
                duration: 15,
                baseAmount: 20.0,
                extraCharges: 0,
            },
        ],
    },
];

const WalkIn = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedWalkin, setSelectedWalkin] = useState(null);
    const [isDetailFormOpen, setIsDetailFormOpen] = useState(false);

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const handleViewDetail = (record) => {
        console.log(record);
        setSelectedWalkin(record);
        setIsDetailFormOpen(true);
    };

    const column = useMemo(
        () => [
            {
                title: "No.",
                render: (_, __, index) => <p>{index + 1}</p>,
            },
            {
                title: "WalkIn Id",
                dataIndex: "walkInId",
                key: "walkInId",
            },
            {
                title: "Service Name",
                dataIndex: "services",
                key: "serviceName",
                render: (services) => (
                    <section className="max-w-100 overflow-x-auto whitespace-nowrap p-3">
                        {services.map((svc, i) => (
                            <span key={i}>
                                {svc.name}
                                {i < services.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </section>
                ),
                filteredValue: searchText ? [searchText] : null,
                onFilter: (value, record) =>
                    String(record.staffName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.serviceName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.startedTime)
                        .toLowerCase()
                        .includes(value.toLowerCase()),
            },
            {
                title: "Staff Name",
                dataIndex: "staffName",
                key: "staffName",
            },
            {
                title: "Date",
                dataIndex: "date",
                key: "date",
            },
            {
                title: "Started Time",
                dataIndex: "startedTime",
                key: "startedTime",
            },
            {
                title: "Total Time",
                dataIndex: "services",
                key: "totalTime",
                render: (services) => {
                    const totalTime = services.reduce(
                        (sum, s) => sum + s.duration,
                        0,
                    );
                    return <span>{totalTime}</span>;
                },
            },
            {
                title: "Total Amount",
                dataIndex: "services",
                key: "totalAmount",
                render: (services) => {
                    const totalAmount = services.reduce(
                        (sum, s) => sum + s.baseAmount + (s.extraCharges || 0),
                        0,
                    );
                    const totalExtraAmount = services.reduce(
                        (sum, s) => sum + (s.extraCharges || 0),
                        0,
                    );

                    return (
                        <Space>
                            <span>{totalAmount}</span>
                            {totalExtraAmount > 0 && (
                                <Tag color="green" variant="filled">
                                    +{totalExtraAmount} Extra
                                </Tag>
                            )}
                        </Space>
                    );
                },
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    <Button
                        className="border-primary! rounded-2xl! hover:bg-primary! hover:text-white!"
                        onClick={() => handleViewDetail(record)}
                    >
                        <EyeOutlined /> View
                    </Button>
                ),
            },
        ],
        [searchText],
    );

    const totalTime = selectedWalkin?.services.reduce(
        (sum, s) => sum + s.duration,
        0,
    );

    const totalAmount = selectedWalkin?.services.reduce(
        (sum, s) => sum + s.baseAmount + (s.extraCharges || 0),
        0,
    );
    const totalBaseAmount = selectedWalkin?.services.reduce(
        (sum, s) => sum + s.baseAmount,
        0,
    );
    const totalExtraAmount = selectedWalkin?.services.reduce(
        (sum, s) => sum + (s.extraCharges || 0),
        0,
    );

    return (
        <>
            <SubHeaderSection
                title="Walk In"
                subTitle="View and manage customers who visited without a booking."
                setSearchText={setSearchText}
                placeholderTitle="Search ..."
            />
            <TableHeaderSection renderlists={renderLists} />
            <div className="table-wrapper">
                <Table
                    columns={column}
                    dataSource={WalkInDummyData}
                    bordered
                    scroll={{ x: scrollX }}
                />
            </div>
            {selectedWalkin && (
                <Modal
                    title={<h1>WalkIn Overview</h1>}
                    open={isDetailFormOpen}
                    onCancel={() => setIsDetailFormOpen(false)}
                    onOk={() => setIsDetailFormOpen(false)}
                >
                    <div className="w-full">
                        <Space vertical className="w-full py-4">
                            <p>
                                <span className="font-semibold">
                                    WalkIn ID :
                                </span>{" "}
                                {selectedWalkin.walkInId}
                            </p>
                            <p>
                                <span className="font-semibold">Date :</span>{" "}
                                {selectedWalkin.date}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Staff Name :
                                </span>{" "}
                                {selectedWalkin.staffName}
                            </p>
                        </Space>
                        <div className="w-full border-gray-400 border p-4 rounded-xl">
                            <Typography.Title
                                level={3}
                                className="font-montserrat! font-medium! text-primary!"
                            >
                                Details
                            </Typography.Title>
                            <ul className="border-b border-b-gray-400 px-7 pb-4 flex flex-col list-disc marker:text-primary marker:text-2xl">
                                <li>
                                    <span className="font-semibold">
                                        Started Time :
                                    </span>{" "}
                                    {selectedWalkin.startedTime}
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Service Name :{" "}
                                    </span>
                                    {selectedWalkin?.services.map((svc, i) => (
                                        <span key={i}>
                                            {svc.name}
                                            {i <
                                            selectedWalkin?.services.length - 1
                                                ? ", "
                                                : ""}
                                        </span>
                                    ))}
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Duration :{" "}
                                    </span>
                                    {totalTime} mins
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Base Amount :{" "}
                                    </span>
                                    {totalBaseAmount} mmk
                                </li>

                                {totalExtraAmount ? (
                                    <li>
                                        <span className="font-semibold">
                                            Extra Amount :{" "}
                                        </span>
                                        {totalExtraAmount} mmk
                                    </li>
                                ) : (
                                    ""
                                )}
                            </ul>
                            <Flex
                                justify="space-between"
                                className="p-3! font-semibold!"
                            >
                                <h3>Total Amount</h3>
                                <h3>{totalAmount} mmk</h3>
                            </Flex>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default WalkIn;
