import { Card, Typography } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        title: { display: false },
        // legend: {
        //     position: "top",
        //     align: "end",
        //     labels: {
        //         usePointStyle: true,
        //         pointStyle: "circle",
        //         boxWidth: 20,
        //         boxHeight: 20,
        //         padding: 10,
        //         color: "#64748B",
        //         font: {
        //             size: 13,
        //             weight: "500",
        //             family: "Montserrat, sans-serif",
        //         },
        //     },
        // },
        // title: {
        //     display: true,
        //     text: "Custom Chart Title",
        //     fontSize: 20,
        //     fontColor: "#333",
        // },
    },
    scales: {
        x: {
            border: {
                display: true,
                color: "black",
            },
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
            // stacked: true,
            min: 0,
            max: 200,
            ticks: {
                stepSize: 2,
            },
        },
    },
};

const startOfWeek = dayjs().startOf("week");

const labels = Array.from(
    { length: 7 },
    (_, i) => startOfWeek.add(i, "day").format("dddd"), // "dddd" outputs "Monday", "Tuesday", etc
);

// Filter up to the current day index
const currentDayIndex = dayjs().day();
const filteredLabels = labels.slice(0, currentDayIndex + 1);

const data = {
    labels: filteredLabels,
    // title: (
    //     <Typography.Title level={3} className="text-xl! font-medium!">
    //         Weekly Bookings & Cancellations
    //     </Typography.Title>
    // ),
    datasets: [
        {
            label: "Walkin Count",
            data: filteredLabels.map(() => Math.random() * 90),
            backgroundColor: "#A0656F",
            hoverBackgroundColor: "#FA9FB0",
            borderRadius: {
                topLeft: 8,
                topRight: 8,
                bottomLeft: 0,
                bottomRight: 0,
            },
            borderSkipped: false,
            maxBarThickness: 80,
        },
        {
            label: "Booking Count",
            data: filteredLabels.map(() => Math.random() * 90),
            backgroundColor: "#DD586D",
            hoverBackgroundColor: "#FA9FB0",
            borderRadius: {
                topLeft: 8,
                topRight: 8,
                bottomLeft: 0,
                bottomRight: 0,
            },
            borderSkipped: false,
            maxBarThickness: 80,
        },
        {
            label: "Cancel Booking",
            data: filteredLabels.map(() => Math.random() * 90),
            backgroundColor: "#E61010",
            hoverBackgroundColor: "#E6304F",
            borderRadius: {
                topLeft: 8,
                topRight: 8,
                bottomLeft: 0,
                bottomRight: 0,
            },
            borderSkipped: false,
            maxBarThickness: 80,
        },
    ],
};

const datasetsConfig = [
    { label: "Walkin Count", color: "#A0656F", hoverColor: "#FA9FB0" },
    { label: "Booking Count", color: "#DD586D", hoverColor: "#FA9FB0" },
    { label: "Cancel Booking", color: "#E61010", hoverColor: "#E6304F" },
];

export function WeeklyBarChart() {
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
                <Bar options={options} data={data} />
            </div>
        </Card>
    );
}
