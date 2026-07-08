import { Card, Space, Typography } from "antd";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

const DashboardCard = ({ title, value, icon, trending }) => {
    return (
        <Card className="shadow w-full">
            <Space vertical size="large">
                <Space size="middle">
                    <span className="me-4 text-2xl text-white bg-primary p-3 rounded-md">
                        {icon}
                    </span>
                    {/* <Statistic title={title} value={value} /> */}
                    {/* <TrendingDown /> */}

                    <Space
                        className={cn(
                            trending.includes("+")
                                ? "text-completed"
                                : "text-unavailable",
                        )}
                    >
                        {trending.includes("+") ? (
                            <TrendingUp />
                        ) : (
                            <TrendingDown />
                        )}
                        {trending}
                    </Space>
                </Space>
                <Space vertical>
                    <Typography.Title className="m-0!">
                        {value}
                    </Typography.Title>
                    <p>{title}</p>
                </Space>
            </Space>
        </Card>
    );
};

export default DashboardCard;
