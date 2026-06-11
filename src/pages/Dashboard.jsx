import { Flex, Typography } from "antd";
import DashboardCard from "../components/main/DashboardCard";
import {
    ApartmentOutlined,
    IdcardOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { MonthlyChart } from "../components/main/MonthlyChart";
import { CalendarCard } from "../components/main/CalendarCard";

const dashboardCardItem = [
    {
        icon: <UserOutlined />,
        title: "Total User",
        value: "400",
    },
    {
        icon: <ApartmentOutlined />,
        title: "Total Services",
        value: "35",
    },
    {
        icon: <IdcardOutlined />,
        title: "Total Staff",
        value: "20",
    },
    {
        icon: <UnorderedListOutlined />,
        title: "Total Booking",
        value: "2,000",
    },
];
const Dashboard = () => {
    const { Title } = Typography;
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
                <div className="grid-items">
                    <MonthlyChart />
                    <div className="h-[200px]">
                        <CalendarCard />
                    </div>
                </div>
            </section>
        </Flex>
    );
};

export default Dashboard;
