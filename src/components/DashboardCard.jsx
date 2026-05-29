import { Card, Space, Statistic } from "antd";

const DashboardCard = ({ title, value, icon }) => {
    return (
        <Card className="shadow w-full">
            <Space size="middle">
                <span className="me-4 text-2xl">{icon}</span>
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
};

export default DashboardCard;
