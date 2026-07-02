import { Card } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
            align: "end",
            labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 20,
                boxHeight: 20,
                padding: 10,
                color: "#64748B",
                font: {
                    size: 13,
                    weight: "500",
                    family: "Montserrat, sans-serif",
                },
            },
        },
        title: {
            display: false,
        },
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
    datasets: [
        {
            label: "Booking Count (includes Walkin)",
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

export function WeeklyBarChart() {
    return (
        <Card className="w-full shadow-sm p-4">
            <div className="relative w-full h-105!">
                <Bar options={options} data={data} />
            </div>
        </Card>
    );
}
