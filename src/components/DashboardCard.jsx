import { Card, Space, Statistic } from "antd";

const DashboardCard = ({ title, value, icon }) => {
    return (
        <Card className="w-80">
            <Space>
                <span>{icon}</span>
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
};

export default DashboardCard;
