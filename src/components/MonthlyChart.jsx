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
    plugins: {
        legend: {
            position: "bottom",
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

const labels = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "short" }),
);

const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => Math.random()),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => Math.random()),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export function MonthlyChart() {
    return (
        <Card style={{ width: "full", height: 450 }} className="shadow-sm">
            <Bar
                options={options}
                data={data}
                style={{ height: "full", width: "full" }}
            />
        </Card>
    );
}
