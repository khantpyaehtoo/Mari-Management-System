import { Card, Col, Flex, Radio, Row, Space, Table, Typography } from "antd";
import DashboardCard from "../components/dashboard/DashboardCard";
import { WeeklyBarChart } from "../components/dashboard/WeeklyBarChart";
import {
    ApartmentOutlined,
    IdcardOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { YearlyLineChart } from "../components/dashboard/YearlyLineChart";
import { useState } from "react";
import ServicePieChart from "../components/dashboard/ServicePieChart";
import BookingCard from "../components/dashboard/BookingCard";

const dashboardCardItem = [
    {
        icon: <UserOutlined />,
        trending: "+20% last month",
        title: "Total Bookings This Month",
        value: "1.1K",
    },
    {
        icon: <ApartmentOutlined />,
        trending: "+20% last month",
        title: "Total Revenue This Month",
        value: "467k",
    },
    {
        icon: <IdcardOutlined />,
        trending: "-20% last month",
        title: "Today Active Staff",
        value: "20",
    },
    {
        icon: <UnorderedListOutlined />,
        trending: "+20% last month",
        title: "Total Customers",
        value: "2,000",
    },
];

const dummyData = [
    {
        key: "1",
        employeeInfo: "ST-0042",
        name: "Phyu Phyu",
        count: "115",
        rating: "4.5",
        revenue: "200,000",
        commission: "20000",
    },
];
const column = [
    {
        title: "Employee Info",
        dataIndex: "employeeInfo",
        key: "employeeInfo",
    },
    {
        title: "Services Completed",
        dataIndex: "count",
        key: "count",
    },
    {
        title: "Client Rating",
        dataIndex: "rating",
        key: "rating",
    },
    {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
    },
    {
        title: "Commission",
        dataIndex: "commission",
        key: "commission",
    },
];

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

const Dashboard = () => {
    const [viewType, setViewType] = useState("weekly");

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
                        />
                    ))}
                </div>
            </section>

            <section className="mt-10 mb-10 px-10">
                <div className="flex justify-start items-center! mb-6!">
                    <Space size="large">
                        <Typography.Title
                            level={3}
                            className="text-xl! font-medium!"
                        >
                            Weekly Bookings & Cancellations
                        </Typography.Title>
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
                    <Table columns={column} dataSource={dummyData} />
                </div>
            </section>

            <section className="mt-10 mx-10">
                <Row gutter={24}>
                    <Col md={12} lg={12}>
                        <section>
                            <Card>
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
                        </section>
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
