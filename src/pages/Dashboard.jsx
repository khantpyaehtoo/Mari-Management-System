import { Flex, Space } from "antd";
import DashboardCard from "../components/DashboardCard";

const dashboardCardItem = [
    {
        title: "A",
        value: "20",
    },
    {
        title: "B",
        value: "20",
    },
    {
        title: "C",
        value: "20",
    },
    {
        title: "D",
        value: "20",
    },
];
const Dashboard = () => {
    return (
        <Flex vertical>
            <Space>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 px-10 py-8 ">
                    {dashboardCardItem.map((item, key) => (
                        <DashboardCard
                            key={key}
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
