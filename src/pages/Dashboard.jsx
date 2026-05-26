import { Flex, Space } from "antd";
import DashboardCard from "../components/DashboardCard";
import { UserOutlined } from "@ant-design/icons";

const dashboardCardItem = [
    {
        icon: <UserOutlined />,
        title: "Total User",
        value: "400",
    },
    {
        title: "Total Services",
        value: "35",
    },
    {
        title: "Total Staff",
        value: "20",
    },
    {
        title: "Total Booking",
        value: "2,000",
    },
];
const Dashboard = () => {
    return (
        <Flex vertical>
            <Space>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 px-10 py-8">
                    {dashboardCardItem.map((item, key) => (
                        <DashboardCard
                            key={key}
                            icon={item.icon}
                            title={item.title}
                            value={item.value}
                        />
                    ))}
                </div>
            </Space>
            <Space className="mt-20">
                <h2>Revenue</h2>
            </Space>
        </Flex>
    );
};

export default Dashboard;
