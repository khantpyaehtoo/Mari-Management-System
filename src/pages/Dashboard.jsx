import {
    Avatar,
    Card,
    Col,
    Flex,
    Radio,
    Row,
    Space,
    Table,
    Typography,
} from "antd";
import DashboardCard from "../components/dashboard/DashboardCard";
import {
    DollarOutlined,
    IdcardOutlined,
    SlidersOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { YearlyLineChart } from "../components/dashboard/YearlyLineChart";
import { useState } from "react";
import ServicePieChart from "../components/dashboard/ServicePieChart";
import BookingCard from "../components/dashboard/BookingCard";
import {
    useGetDashBoardCardStatsQuery,
    useGetStaffPerformQuery,
} from "../components/dashboard/dashboardApi";
import WeeklyBarChart from "../components/dashboard/WeeklyBarChart";

const radioBtnOptions = [
    {
        label: "Weekly",
        value: "weekly",
    },
    {
        label: "Monthly",
        value: "monthly",
    },
];

const IMAGE_BASE_URL = import.meta.env.VITE_BASE_API;

const Dashboard = () => {
    const [viewType, setViewType] = useState("weekly");

    const { data: cardDatas, isLoading } = useGetDashBoardCardStatsQuery();
    const { data: staffPerformData = [] } = useGetStaffPerformQuery();

    const dashboardCardItem = [
        {
            icon: <SlidersOutlined />,
            trending:
                cardDatas?.bookingsGrowthPercentage !== undefined
                    ? `${cardDatas.bookingsGrowthPercentage >= 0 ? "+" : ""}${cardDatas.bookingsGrowthPercentage}% last month`
                    : "Loading...",
            title: "Total Bookings This Month",
            value: cardDatas?.totalBookings?.toLocaleString() ?? "0",
        },
        {
            icon: <DollarOutlined />,
            trending:
                cardDatas?.revenueGrowthPercentage !== undefined
                    ? `${cardDatas.revenueGrowthPercentage >= 0 ? "+" : ""}${cardDatas.revenueGrowthPercentage}% last month`
                    : "Loading...",
            title: "Total Revenue This Month",
            value:
                cardDatas?.totalRevenue !== undefined
                    ? `${cardDatas.totalRevenue.toLocaleString()} MMK`
                    : "0 MMK",
        },
        {
            icon: <IdcardOutlined />,
            trending:
                cardDatas?.staffGrowthPercentage !== undefined
                    ? `${cardDatas.staffGrowthPercentage >= 0 ? "+" : ""}${cardDatas.staffGrowthPercentage}% last month`
                    : "Loading...",
            title: "Today Active Staff",
            value: cardDatas?.todayActiveStaff?.toString() ?? "0",
        },
        {
            icon: <UserOutlined />,
            trending:
                cardDatas?.customersGrowthPercentage !== undefined
                    ? `${cardDatas.customersGrowthPercentage >= 0 ? "+" : ""}${cardDatas.customersGrowthPercentage}% last month`
                    : "Loading...",
            title: "Total Customers",
            value: cardDatas?.totalCustomers?.toLocaleString() ?? "0",
        },
    ];

    const column = [
        {
            title: "Employee Info",
            dataIndex: "staffName",
            key: "staffName",
            render: (text, record) => (
                <Space>
                    <Avatar src={`${IMAGE_BASE_URL}/${record?.profileImage}`} />
                    <div>
                        <div className="font-medium">{text}</div>
                        <div className="text-xs text-gray-400">
                            {record.staffCode}
                        </div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Services Completed",
            dataIndex: "completedJobsCount",
            key: "completedJobsCount",
        },
        {
            title: "Client Rating",
            dataIndex: "ratingAverage",
            key: "ratingAverage",
            render: (rating) => `⭐ ${rating}`,
        },
        {
            title: "Revenue",
            dataIndex: "totalRevenue",
            key: "totalRevenue",
            render: (val) => (
                <>
                    {val.toLocaleString()} <small>MMK</small>
                </>
            ),
        },
        {
            title: "Commission",
            dataIndex: "totalCommission",
            key: "totalCommission",
            render: (val) => (
                <>
                    {val.toLocaleString()} <small>MMK</small>
                </>
            ),
        },
    ];

    return (
        <Flex vertical>
            <section className="space-y-6 w-full px-10">
                <div className="grid-items-4">
                    {dashboardCardItem.map((item, key) => (
                        <DashboardCard
                            key={key}
                            trending={item.trending}
                            icon={item.icon}
                            title={item.title}
                            value={item.value}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            </section>

            <section className="mt-10 mb-10 px-10">
                <div className="flex justify-end items-center! mb-6!">
                    <Space size="large">
                        <Radio.Group
                            options={radioBtnOptions}
                            optionType="button"
                            buttonStyle="solid"
                            onChange={(e) => setViewType(e.target.value)}
                            value={viewType}
                        />
                    </Space>
                </div>
                {viewType === "weekly" ? (
                    <WeeklyBarChart />
                ) : (
                    <YearlyLineChart />
                )}
            </section>

            <section className="space-y-6 w-full px-10">
                <div className="mb-6!">
                    <Space vertical size="small">
                        <Typography.Title
                            level={3}
                            className="text-xl! font-medium!"
                        >
                            Nail Artist’s Performance (Monthly)
                        </Typography.Title>
                        <p className="text-gray-600">
                            Track completed bookings, customer ratings, and
                            overall performance.
                        </p>
                    </Space>
                </div>
                <div className="table-wrapper">
                    <Table
                        columns={column}
                        dataSource={staffPerformData}
                        rowKey="staffId"
                    />
                </div>
            </section>

            <section className="mt-10 mx-10">
                <Row gutter={24}>
                    <Col md={12} lg={12}>
                        <Card className="shadow-md">
                            <Space vertical size="small">
                                <Typography.Title
                                    level={3}
                                    className="text-xl! font-medium!"
                                >
                                    Revenue by Services
                                </Typography.Title>
                                <p className="text-gray-600">This month</p>
                            </Space>
                            <ServicePieChart />
                        </Card>
                    </Col>
                    <Col md={12} lg={12}>
                        <BookingCard />
                    </Col>
                </Row>
            </section>
        </Flex>
    );
};

export default Dashboard;
