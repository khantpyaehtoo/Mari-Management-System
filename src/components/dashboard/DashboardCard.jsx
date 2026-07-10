import { Card, Space, Typography } from "antd";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

const DashboardCard = ({ title, value, icon, trending }) => {
    const isPositive = trending.startsWith("+");
    const isNegative = trending.startsWith("-");
    const isLoading = trending === "Loading...";

    return (
        <Card className="shadow w-full">
            <Space vertical size="large" className="w-full">
                <Space
                    size="middle"
                    className="w-full justify-between items-center"
                >
                    <span className="text-2xl text-white bg-primary p-3 rounded-md flex items-center justify-center">
                        {icon}
                    </span>

                    <div
                        className={cn(
                            "flex items-center gap-1 text-sm font-medium",
                            isPositive && "text-completed",
                            isNegative && "text-unavailable",
                            !isPositive && !isNegative && "text-gray-400",
                        )}
                    >
                        {!isLoading &&
                            (isPositive ? (
                                <TrendingUp size={16} />
                            ) : isNegative ? (
                                <TrendingDown size={16} />
                            ) : (
                                <Minus size={16} />
                            ))}
                        <span>{trending}</span>
                    </div>
                </Space>

                <Space vertical size={0}>
                    <Typography.Title level={2} className="m-0! font-semibold">
                        {value}
                    </Typography.Title>
                    <p className="text-gray-500 text-sm m-0">{title}</p>
                </Space>
            </Space>
        </Card>
    );
};

export default DashboardCard;
