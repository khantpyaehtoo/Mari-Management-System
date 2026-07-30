import { useMemo } from "react";
import { Flex, Spin } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetServicePieChartQuery } from "./dashboardApi";

ChartJS.register(ArcElement, Tooltip);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
};

const BACKGROUND_COLORS = [
    "#C2185B",
    "#F94763",
    "#FBA4C4",
    "#D189A3",
    "#FBB1BD",
    "#E87EA1",
    "#F06292",
];

export const ServicePieChart = () => {
    const { data: chartDatas = [], isLoading } = useGetServicePieChartQuery();

    // Memoize chart data formatting
    const chartData = useMemo(() => {
        return {
            labels: chartDatas.map((item) => item.serviceName),
            datasets: [
                {
                    label: "Bookings",
                    // Use totalCount from API
                    data: chartDatas.map((item) => item.totalCount ?? 0),
                    backgroundColor: chartDatas.map(
                        (_, index) =>
                            BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
                    ),
                    borderColor: ["#ffffff"],
                    borderWidth: 2,
                },
            ],
        };
    }, [chartDatas]);

    if (isLoading) {
        return (
            <Flex justify="center" align="center" className="w-full h-40">
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <Flex vertical gap="middle" align="center" className="w-full">
            <div className="w-full max-w-[280px] flex justify-center items-center">
                <Doughnut data={chartData} options={options} />
            </div>

            <Flex vertical gap="small" className="w-full pl-3">
                {chartDatas.map((item, index) => {
                    const label = item?.serviceName;
                    const value = item?.totalCount ?? 0;
                    const percentage = Number(
                        item?.countPercentage ?? 0,
                    ).toFixed(1);

                    return (
                        <Flex
                            key={label || index}
                            align="center"
                            justify="space-between"
                            className="w-full"
                        >
                            <Flex align="center" gap="small">
                                <div
                                    className="w-3 h-3 rounded-full shrink-0"
                                    style={{
                                        backgroundColor:
                                            chartData.datasets[0]
                                                .backgroundColor[index],
                                    }}
                                />
                                <span className="text-sm text-gray-600">
                                    {label}
                                </span>
                            </Flex>

                            <span className="text-sm font-semibold text-gray-500">
                                {percentage}% ({value})
                            </span>
                        </Flex>
                    );
                })}
            </Flex>
        </Flex>
    );
};

export default ServicePieChart;
