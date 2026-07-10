import { Card, Typography } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetWeeklyChartDataQuery } from "./dashboardApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    plugins: {
        legend: { display: false },
        title: { display: false },
    },
    scales: {
        x: {
            border: { display: true, color: "black" },
            ticks: {
                color: "black",
                font: {
                    size: 13,
                    family: "Montserrat, sans-serif",
                    weight: "500",
                },
                padding: 8,
            },
        },
        y: {
            min: 0,
            max: 20,
            ticks: { stepSize: 2 },
        },
    },
};

const datasetsConfig = [
    {
        label: "Walkin Count",
        color: "#A0656F",
        hoverColor: "#FA9FB0",
        apiKey: "walkInBookingCount",
    },
    {
        label: "Booking Count",
        color: "#DD586D",
        hoverColor: "#FA9FB0",
        apiKey: "customerBookingCount",
    },
    {
        label: "Cancel Booking",
        color: "#E61010",
        hoverColor: "#E6304F",
        apiKey: "cancelCount",
    },
];

const formatDayLabel = (dayStr) => {
    if (!dayStr) return "";
    return dayStr.charAt(0).toUpperCase() + dayStr.slice(1).toLowerCase();
};

export default function WeeklyBarChart() {
    const { data: chartData = [] } = useGetWeeklyChartDataQuery();

    const labels = chartData.map((item) => formatDayLabel(item.label));

    const chartRenderData = {
        labels: labels,
        datasets: datasetsConfig.map((config) => ({
            label: config.label,
            data: chartData.map((item) => item[config?.apiKey] ?? 0),
            backgroundColor: config.color,
            hoverBackgroundColor: config.hoverColor,
            borderRadius: {
                topLeft: 8,
                topRight: 8,
                bottomLeft: 0,
                bottomRight: 0,
            },
            borderSkipped: false,
            maxBarThickness: 40,
        })),
    };

    return (
        <Card className="w-full shadow-sm p-4">
            <div className="flex justify-between items-center mb-6 w-full">
                <Typography.Title
                    level={3}
                    className="text-xl! font-medium! m-0!"
                >
                    Weekly Bookings & Cancellations
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
                <Bar options={options} data={chartRenderData} />
            </div>
        </Card>
    );
}
