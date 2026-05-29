import { Flex, Typography, Col, Row } from "antd";
import DashboardCard from "../components/DashboardCard";
import {
    ApartmentOutlined,
    IdcardOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";

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
            <Title className="p-3 border-b-1" level={3}>
                Dashboard
            </Title>

            <section className="space-y-6 w-full px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <section className="mt-20">
                <h2>Revenue</h2>
            </section>
        </Flex>
    );
};

export default Dashboard;
