import { Flex, Radio, Space, Table, Typography } from "antd";
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

const dashboardCardItem = [
    {
        icon: <UserOutlined />,
        title: "Total Booking",
        value: "1.1K",
    },
    {
        icon: <ApartmentOutlined />,
        title: "Total Revenue",
        value: "467k",
    },
    {
        icon: <IdcardOutlined />,
        title: "Total Staff",
        value: "20",
    },
    {
        icon: <UnorderedListOutlined />,
        title: "Total Customer",
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

const Dashboard = () => {
    const { Title } = Typography;
    const [viewType, setViewType] = useState("weekly");

    return (
        <Flex vertical>
            <Title className="title-style" level={3}>
                Dashboard
            </Title>

            <section className="space-y-6 w-full px-10">
                <div className="grid-items-4">
                    {dashboardCardItem.map((item, key) => (
                        <DashboardCard
                            key={key}
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
        </Flex>
    );
};

export default Dashboard;
