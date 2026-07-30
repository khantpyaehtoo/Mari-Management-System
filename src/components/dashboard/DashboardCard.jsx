import { Card, Skeleton, Space, Typography } from "antd";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

const DashboardCard = ({ title, value, icon, trending, isLoading }) => {
    const isPositive = trending.startsWith("+");
    const isNegative = trending.startsWith("-");

    return (
        <Card className="shadow w-full">
            <Space vertical size="large" className="w-full">
                <Space
                    size="middle"
                    className="w-full justify-between items-center"
                >
                    {isLoading ? (
                        <Skeleton.Avatar active shape="circle" size="large" />
                    ) : (
                        <span className="text-2xl text-white bg-primary p-3 rounded-md flex items-center justify-center">
                            {icon}
                        </span>
                    )}

                    {isLoading ? (
                        <Skeleton.Button
                            active
                            size="small"
                            shape="round"
                            style={{ width: 90 }}
                        />
                    ) : (
                        <div
                            className={cn(
                                "flex items-center gap-1 text-sm font-medium",
                                isPositive && "text-completed",
                                isNegative && "text-unavailable",
                                !isPositive && !isNegative && "text-gray-400",
                            )}
                        >
                            {isPositive ? (
                                <TrendingUp size={16} />
                            ) : isNegative ? (
                                <TrendingDown size={16} />
                            ) : (
                                <Minus size={16} />
                            )}
                            <span className="font-montserrat!">{trending}</span>
                        </div>
                    )}
                </Space>

                <Space vertical size={0}>
                    {isLoading ? (
                        <>
                            <Skeleton.Input
                                active
                                size="large"
                                style={{
                                    height: 38,
                                    marginBottom: 4,
                                }}
                            />
                            <Skeleton.Input
                                active
                                size="large"
                                style={{ height: 20 }}
                            />
                        </>
                    ) : (
                        <>
                            <Typography.Title
                                level={2}
                                className="m-0! lg:font-medium! font-montserrat! line-clamp-1"
                            >
                                {value}
                            </Typography.Title>
                            <p className="text-gray-500 text-sm m-0 font-montserrat!">
                                {title}
                            </p>
                        </>
                    )}
                </Space>
            </Space>
        </Card>
    );
};

export default DashboardCard;
