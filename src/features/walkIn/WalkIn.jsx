import { Grid, Table, Button, Space, Tag } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import TableHeaderSection from "../../components/tableHeaderSection/TableHeaderSection";
import { EyeOutlined } from "@ant-design/icons";
import WalkInDetailModal from "./WalkInDetailModal";
import { useGetWalkinDataQuery } from "./walkInApi";
import { useDebounce } from "../../lib/hooks/useDebounce";

const { useBreakpoint } = Grid;

const renderLists = ["All"];

const WalkIn = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedWalkin, setSelectedWalkin] = useState(null);
    const [isDetailFormOpen, setIsDetailFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearchText = useDebounce(searchText, 500);
    const { data: walkInData = [], isLoading } = useGetWalkinDataQuery({
        page: currentPage - 1,
        size: 10,
        search: debouncedSearchText ? debouncedSearchText.trim() : undefined,
    });

    const screens = useBreakpoint();
    const scrollX = screens.xs ? undefined : "1500";

    const handleViewDetail = (record) => {
        setSelectedWalkin(record);
        setIsDetailFormOpen(true);
    };

    const sortedWalkInData = useMemo(() => {
        const rawData = walkInData?.content || walkInData || [];
        return [...rawData].sort((a, b) => {
            const dateTimeA = new Date(`${a.date} ${a.startTime}`);
            const dateTimeB = new Date(`${b.date} ${b.startTime}`);
            return dateTimeB - dateTimeA;
        });
    }, [walkInData]);

    const statusCounts = useMemo(() => {
        return {
            All: walkInData?.numberOfElements,
        };
    }, [walkInData]);

    const column = useMemo(
        () => [
            {
                title: "No.",
                render: (_, __, index) => (
                    <p>{(currentPage - 1) * 5 + index + 1}</p>
                ),
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
                dataIndex: "startTime",
                key: "startTime",
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
                    const totalAmount =
                        record.totalAmountDisplay ||
                        `${record.totalAmount} MMK`;
                    const extraAmount = record.extraAmount || 0;

                    return (
                        <Space>
                            <span>{totalAmount}</span>
                            {extraAmount > 0 && (
                                <Tag color="green" variant="filled">
                                    +{extraAmount} MMK Extra
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
        [currentPage],
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (value) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    return (
        <>
            <SubHeaderSection
                title="Walk In"
                subTitle="View and manage customers who visited without a booking."
                setSearchText={handleSearchChange}
                placeholderTitle="Search ..."
            />

            <TableHeaderSection
                renderlists={renderLists}
                statusCounts={statusCounts}
            />

            <div className="table-wrapper">
                <Table
                    columns={column}
                    dataSource={sortedWalkInData}
                    loading={isLoading}
                    rowKey="id"
                    bordered
                    scroll={{ x: scrollX }}
                    pagination={{
                        current: currentPage,
                        onChange: handlePageChange,
                        size: "large",
                        pageSize: 5,
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
