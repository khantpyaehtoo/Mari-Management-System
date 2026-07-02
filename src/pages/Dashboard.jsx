import { Flex, Radio, Space, Typography } from "antd";
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
        </Flex>
    );
};

export default Dashboard;
