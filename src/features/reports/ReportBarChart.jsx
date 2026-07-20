import { useMemo } from "react";
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
import { useGetReportChartDataQuery } from "./reportApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

// Custom Plugin to dynamically inject & align HTML cards
const htmlFooterPlugin = {
    id: "htmlFooterPlugin",
    afterLayout(chart) {
        const { scales } = chart;
        const xAxis = scales.x;
        if (!xAxis) return;

        // Retrieve dynamic stats map attached via plugin options
        const statsMap =
            chart.options.plugins?.htmlFooterPlugin?.statsMap || {};

        // Get or create container wrapper
        let container = chart.canvas.parentNode.querySelector(
            ".chart-footer-container",
        );
        if (!container) {
            container = document.createElement("div");
            container.className = "chart-footer-container";
            container.style.position = "relative";
            container.style.width = "100%";
            container.style.marginTop = "10px";
            chart.canvas.parentNode.appendChild(container);
        }

        container.innerHTML = ""; // Clear existing elements on redraw

        // Render a card for each active X-axis tick
        xAxis.ticks.forEach((tick, index) => {
            const xPixel = xAxis.getPixelForTick(index);
            const labelName = chart.data.labels[index];
            const stats = statsMap[labelName] || {
                bookingCount: 0,
                walkInCount: 0,
                cancelCount: 0,
            };

            const tickWidth = xAxis.width / xAxis.ticks.length;

            const card = document.createElement("div");
            card.className = "footer-card";
            card.style.position = "absolute";
            card.style.left = `${xPixel - tickWidth / 2 + 4}px`;
            card.style.width = `${tickWidth - 8}px`;

            card.innerHTML = `
                <div class="card-title">${labelName}</div>
                <div class="card-row">Today Bookings - <strong>${stats.bookingCount}</strong></div>
                <div class="card-row">Walk-in Customer - <strong>${stats.walkInCount}</strong></div>
                <div class="card-row">Cancelled Bookings - <strong>${stats.cancelCount}</strong></div>
            `;

            container.appendChild(card);
        });
    },
};

const ReportBarChart = ({ period = "weekly", month, year }) => {
    const {
        data: apiResponse,
        isLoading,
        isError,
    } = useGetReportChartDataQuery({
        period,
        month,
        year,
    });

    const chartItems = apiResponse?.chartData || [];

    // 2. Map data for labels, datasets, and plugin metadata
    const { labels, totalRevenueData, topServiceData, statsMap } =
        useMemo(() => {
            const labelsList = [];
            const totalRevList = [];
            const topServiceRevList = [];
            const map = {};

            chartItems.forEach((item) => {
                labelsList.push(item.label);
                totalRevList.push(item.revenueBlock?.totalRevenue || 0);
                topServiceRevList.push(
                    item.revenueBlock?.topServiceRevenue || 0,
                );

                // Store counts per label for the footer plugin
                map[item.label] = {
                    bookingCount: item.bookingCount || 0,
                    walkInCount: item.walkInCount || 0,
                    cancelCount: item.cancelCount || 0,
                };
            });

            return {
                labels: labelsList,
                totalRevenueData: totalRevList,
                topServiceData: topServiceRevList,
                statsMap: map,
            };
        }, [chartItems]);

    // 3. Construct Chart Data
    const chartData = {
        labels,
        datasets: [
            {
                label: "Total Revenue",
                data: totalRevenueData,
                backgroundColor: "#DD586D",
                hoverBackgroundColor: "#FA9FB0",
                borderRadius: { topLeft: 8, topRight: 8 },
                borderSkipped: false,
                maxBarThickness: 60,
            },
            {
                label: "Top Service",
                data: topServiceData,
                backgroundColor: "#E61010",
                hoverBackgroundColor: "#E6304F",
                borderRadius: { topLeft: 8, topRight: 8 },
                borderSkipped: false,
                maxBarThickness: 60,
            },
        ],
    };

    // 4. Construct Chart Options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                bottom: 20,
            },
        },
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
            // Pass statsMap to plugin via options context
            htmlFooterPlugin: {
                statsMap,
            },
        },
        scales: {
            x: {
                border: { display: false },
                grid: { display: false },
                ticks: {
                    color: "#000000",
                    font: {
                        size: 13,
                        family: "Montserrat, sans-serif",
                        weight: "600",
                    },
                    padding: 8,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    if (isLoading) return <div>Loading chart...</div>;
    if (isError) return <div>Failed to load chart data.</div>;

    return (
        <div
            className="chart-wrapper"
            style={{ position: "relative", width: "100%", height: "400px" }}
        >
            <Bar
                options={options}
                data={chartData}
                plugins={[htmlFooterPlugin]}
            />
        </div>
    );
};

export default ReportBarChart;
