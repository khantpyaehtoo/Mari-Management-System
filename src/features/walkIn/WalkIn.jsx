import { Grid, Table, Button, Space, Tag } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import TableHeaderSection from "../../components/tableHeaderSection/TableHeaderSection";
import { EyeOutlined } from "@ant-design/icons";
import WalkInDetailModal from "./WalkInDetailModal";
import { useGetWalkinDataQuery } from "./walkInApi";

const { useBreakpoint } = Grid;

const renderLists = ["All"];

const WalkIn = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedWalkin, setSelectedWalkin] = useState(null);
    const [isDetailFormOpen, setIsDetailFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: walkInData = [] } = useGetWalkinDataQuery();

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const handleViewDetail = (record) => {
        console.log(record);
        setSelectedWalkin(record);
        setIsDetailFormOpen(true);
    };

    const statusCounts = useMemo(() => {
        return {
            All: walkInData?.length,
        };
    }, [walkInData]);

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <SubHeaderSection
                title="Walk In"
                subTitle="View and manage customers who visited without a booking."
                setSearchText={setSearchText}
                placeholderTitle="Search ..."
            />

            <TableHeaderSection
                renderlists={renderLists}
                statusCounts={statusCounts}
            />

            <div className="table-wrapper">
                <Table
                    columns={column}
                    dataSource={walkInData?.content || []}
                    bordered
                    scroll={{ x: scrollX }}
                    pagination={{
                        current: currentPage,
                        onChange: handlePageChange,
                        size: "large",
                        pageSize: 3,
                    }}
                />
            </div>

            {selectedWalkin && (
                <WalkInDetailModal
                    selectedWalkin={selectedWalkin}
                    isOpen={isDetailFormOpen}
                    onClose={() => setIsDetailFormOpen(false)}
                />
            )}
        </>
    );
};

export default WalkIn;
