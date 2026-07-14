import { Flex, Spin } from "antd"; // Added Spin for a loading state
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetServicePieChartQuery } from "./dashboardApi";

ChartJS.register(ArcElement, Tooltip);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

// Static colors array to apply to dynamic data items
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

    if (isLoading) {
        return (
            <Flex justify="center" align="center" className="w-full h-40">
                <Spin size="large" />
            </Flex>
        );
    }

    // Transform API data into the format Chart.js expects
    const data = {
        labels: chartDatas.map((item) => item.serviceName),
        datasets: [
            {
                label: "#",
                data: chartDatas.map((item) => item.count),
                backgroundColor: chartDatas.map(
                    (_, index) =>
                        BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
                ),
                borderColor: ["white"],
                borderWidth: 2,
            },
        ],
    };

    return (
        <Flex vertical gap="middle" align="center" className="w-full!">
            <div className="max-w-380!">
                <Doughnut data={data} options={options} className="p-10!" />
            </div>

            <Flex vertical gap="small" className="w-full max-w-180 pl-3">
                {chartDatas.map((item, index) => {
                    // Use your live data directly here
                    const label = item.serviceName;
                    const value = item.count;
                    // Format percentage to 1 decimal place if it comes as a raw floating number
                    const percentage = Number(item.percentage).toFixed(1);

                    return (
                        <Flex
                            key={label}
                            align="center"
                            justify="space-between"
                            className="w-full"
                        >
                            <Flex align="center" gap="small">
                                <div
                                    className="w-3 h-3 rounded-[50%] shrink-0"
                                    style={{
                                        backgroundColor:
                                            data.datasets[0].backgroundColor[
                                                index
                                            ],
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
