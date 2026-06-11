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
            position: "bottom",
        },
        title: {
            display: true,
            text: "Chart",
        },
    },
    scales: {
        y: {
            min: 10,
            max: 100,
            ticks: {
                stepSize: 10,
            },
        },
    },
};

const labels = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "short" }),
);
const currentMonthIndex = new Date().getMonth();
const filteredLabels = labels.slice(0, currentMonthIndex + 1);

const data = {
    labels: filteredLabels,
    datasets: [
        {
            label: "Total Order",
            data: filteredLabels.map(() => Math.random() * 90),
            backgroundColor: "#040404",
        },
    ],
};

export function MonthlyChart() {
    return (
        <Card className="w-full shadow-sm p-4 !h-[350px]">
            <div className="relative w-full !h-[300px]">
                <Bar options={options} data={data} />
            </div>
        </Card>
    );
}
