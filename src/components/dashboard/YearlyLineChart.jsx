import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
import { Card, Typography } from "antd";
import { faker } from "@faker-js/faker";

export const YearlyLineChart = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
    };

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Booking Count",
                data: labels.map(() =>
                    faker.number.int({ min: -1000, max: 1000 }),
                ),
                borderColor: "#A0656F",
                backgroundColor: "#FA9FB0",
            },
            {
                label: "Cancel Booking",
                data: labels.map(() =>
                    faker.number.int({ min: -1000, max: 1000 }),
                ),
                borderColor: "#E6304F",
                backgroundColor: "#E61010",
            },
        ],
    };

    const datasetsConfig = [
        { label: "Booking Count", color: "#A0656F", hoverColor: "#FA9FB0" },
        { label: "Cancel Booking", color: "#E61010", hoverColor: "#E6304F" },
    ];

    return (
        <Card className="w-full shadow-sm p-4 ">
            <div className="flex justify-between items-center mb-6 w-full">
                <Typography.Title
                    level={3}
                    className="text-xl! font-medium! m-0!"
                >
                    Yearly Bookings & Cancellations
                </Typography.Title>

                <div className="flex items-center gap-4">
                    {datasetsConfig.map((dataset) => (
                        <div
                            key={dataset.label}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="w-3 h-3 rounded-full inline-block"
                                style={{ backgroundColor: dataset.color }}
                            />
                            <span className="text-sm font-medium text-slate-500 font-sans">
                                {dataset.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative w-full h-105!">
                <Line options={options} data={data} className="w-full" />
            </div>
        </Card>
    );
};
