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
import { Card, Typography, Spin } from "antd";
import { useGetReportChartDataQuery } from "../../features/reports/reportApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

// Legend config
const LEGEND_ITEMS = [
    { label: "Total Bookings", color: "#A0656F" },
    { label: "Cancel Booking", color: "#E61010" },
];

export const YearlyLineChart = () => {
    const { data: apiResponse, isLoading } = useGetReportChartDataQuery({
        period: "monthly",
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: {
                display: true,
                beginAtZero: true,
            },
            y1: undefined,
        },
    };

    // Extract monthly array
    const chartList = apiResponse?.chartData || [];

    const labels = chartList.map((item) => item.label);

    const formattedChartData = {
        labels,
        datasets: [
            {
                label: "Total Bookings",
                data: chartList.map(
                    (item) =>
                        item?.totalBooking ??
                        (item?.bookingCount || 0) + (item?.walkinCount || 0),
                ),
                borderColor: "#A0656F",
                backgroundColor: "#A0656F",
                tension: 0.3,
            },
            {
                label: "Cancel Booking",
                data: chartList.map((item) => item?.cancelCount ?? 0),
                borderColor: "#E61010",
                backgroundColor: "#E61010",
                tension: 0.3,
            },
        ],
    };

    return (
        <Card className="w-full shadow-sm p-4">
            <div className="flex justify-between items-center mb-6 w-full">
                <Typography.Title
                    level={3}
                    className="text-xl! font-medium! m-0!"
                >
                    Yearly Bookings & Cancellations
                </Typography.Title>

                {/* Custom Legend */}
                <div className="flex items-center gap-4">
                    {LEGEND_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="w-3 h-3 rounded-full inline-block"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium text-slate-500 font-sans">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative w-full h-105! flex items-center justify-center">
                {isLoading ? (
                    <Spin size="large" />
                ) : (
                    <Line
                        options={options}
                        data={formattedChartData}
                        className="w-full"
                    />
                )}
            </div>
        </Card>
    );
};
