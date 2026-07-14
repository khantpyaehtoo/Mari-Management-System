import { Flex } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

export const ServicePieChart = () => {
    const data = {
        labels: [
            "Manicure Cleansing",
            "Pedicure Cleansing",
            "SNS Extension(per Nail)",
            "Gel One Color",
            "Cat Eye",
        ],
        datasets: [
            {
                label: "#",
                data: [12, 19, 3, 8, 2],
                backgroundColor: [
                    "#C2185B",
                    "#F94763",
                    "#FBA4C4",
                    "#D189A3",
                    "#FBB1BD",
                ],
                borderColor: ["white"],
                borderWidth: 2,
            },
        ],
    };

    // Calculate the total sum of the values
    const datasetValues = data.datasets[0].data;
    const total = datasetValues.reduce((sum, value) => sum + value, 0);

    return (
        <Flex vertical gap="middle" align="center" className="w-full!">
            <div className="max-w-380!">
                <Doughnut data={data} options={options} className="p-10!" />
            </div>

            <Flex vertical gap="small" className="w-full max-w-180 pl-3">
                {data.labels.map((label, index) => {
                    const value = datasetValues[index];
                    const percentage =
                        total > 0 ? ((value / total) * 100).toFixed(1) : 0;

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
