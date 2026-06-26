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
        serviceName: "Deep Tissue Massage",
        staffName: "Sarah Jenkins",
        date: "2026-06-25",
        startedTime: "10:00 AM",
        totalTime: "60 mins",
        baseAmount: 85.0,
    },
    {
        key: "2",
        walkInId: "CUST-084",
        serviceName: "Premium Haircut & Styling",
        staffName: "Marcus Vance",
        date: "2026-06-25",
        startedTime: "11:30 AM",
        totalTime: "45 mins",
        baseAmount: 50.0,
    },
    {
        key: "3",
        walkInId: "CUST-112",
        serviceName: "Gel Manicure & Pedicure",
        staffName: "Elena Rostova",
        date: "2026-06-26",
        startedTime: "01:00 PM",
        totalTime: "90 mins",
        baseAmount: 75.0,
    },
    {
        key: "4",
        walkInId: "CUST-023",
        serviceName: "Hydrating Facial Treatment",
        staffName: "Sarah Jenkins",
        date: "2026-06-26",
        startedTime: "03:00 PM",
        totalTime: "75 mins",
        baseAmount: 110.0,
        extraCharges: 5.0,
    },
    {
        key: "5",
        walkInId: "CUST-057",
        serviceName: "Beard Trim & Hot Towel Shave",
        staffName: "Marcus Vance",
        date: "2026-06-27",
        startedTime: "09:15 AM",
        totalTime: "30 mins",
        baseAmount: 103.0,
        extraCharges: 10.0,
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
                dataIndex: "serviceName",
                key: "serviceName",
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
                dataIndex: "totalTime",
                key: "totalTime",
            },
            {
                title: "Total Amount",
                key: "totalAmount",
                render: (_, record) => {
                    const total =
                        record.baseAmount + (record.extraCharges || 0);
                    return (
                        <Space>
                            <span>{total.toFixed(2)}</span>
                            {record.extraCharges > 0 && (
                                <Tag color="green" variant="filled">
                                    +{record.extraCharges.toFixed(2)} Extra
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
                                    {selectedWalkin.serviceName} (
                                    {selectedWalkin.totalTime})
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Base Amount :{" "}
                                    </span>
                                    {selectedWalkin.baseAmount}
                                </li>
                                {selectedWalkin.extraCharges > 0 && (
                                    <li>
                                        <span className="font-semibold">
                                            Extra Amount :{" "}
                                        </span>
                                        {selectedWalkin.extraCharges}
                                    </li>
                                )}
                            </ul>
                            <Flex
                                justify="space-between"
                                className="p-3! font-semibold!"
                            >
                                <h3>Total Amount</h3>
                                <h3>
                                    {selectedWalkin.baseAmount +
                                        (selectedWalkin.extraCharges || 0)}{" "}
                                </h3>
                            </Flex>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default WalkIn;
