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
import dayjs from "dayjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

// Weekly Cards Render
const htmlFooterPlugin = {
    id: "htmlFooterPlugin",
    afterLayout(chart) {
        const isCurrentMonth =
            chart.options.plugins?.htmlFooterPlugin?.isCurrentMonth;
        let container = chart.canvas.parentNode.querySelector(
            ".chart-footer-container",
        );

        // Past Month (Yearly View) Hide Footer Cards
        if (!isCurrentMonth) {
            if (container) container.innerHTML = "";
            return;
        }

        const { scales } = chart;
        const xAxis = scales.x;
        if (!xAxis) return;

        const statsMap =
            chart.options.plugins?.htmlFooterPlugin?.statsMap || {};

        if (!container) {
            container = document.createElement("div");
            container.className = "chart-footer-container";
            container.style.position = "relative";
            container.style.width = "100%";
            container.style.marginTop = "10px";
            chart.canvas.parentNode.appendChild(container);
        }

        container.innerHTML = "";

        // Weekly Mon-Sun Footer Cards
        xAxis.ticks.forEach((tick, index) => {
            const xPixel = xAxis.getPixelForTick(index);
            const labelName = chart.data.labels[index];
            const stats = statsMap[labelName?.toUpperCase()] ||
                statsMap[labelName] || {
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
                <div class="card-title" style="font-weight: 600; text-align: center; margin-bottom: 4px;">${labelName}</div>
                <div class="card-row" style="font-size: 11px;">Today Bookings - <strong>${stats.bookingCount}</strong></div>
                <div class="card-row" style="font-size: 11px;">Walk-in Customer - <strong>${stats.walkInCount}</strong></div>
                <div class="card-row" style="font-size: 11px;">Cancelled Bookings - <strong>${stats.cancelCount}</strong></div>
            `;

            container.appendChild(card);
        });
    },
};

// Testing Custom Plugin
const legendMarginPlugin = {
    id: "legendMargin",
    beforeInit(chart) {
        const fitValue = chart.legend.fit;
        chart.legend.fit = function fit() {
            fitValue.bind(chart.legend)();
            this.height += 20;
        };
    },
};

const ReportBarChart = ({
    chartData = [],
    selectedMonth = "July",
    selectedYear = dayjs().format("YYYY"),
    monthlyCache = {},
}) => {
    // Current Month
    const currentMonthName = dayjs().format("MMMM");
    const isCurrentMonth =
        selectedMonth.toLowerCase() === currentMonthName.toLowerCase();

    const currentMonthIndex = dayjs().month();

    const { labels, totalRevenueData, topServiceData, statsMap } =
        useMemo(() => {
            if (isCurrentMonth) {
                // WEEKLY VIEW (Current Month)
                const defaultDays = [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                ];
                const map = {};
                const revMap = {};
                const topRevMap = {};

                chartData.forEach((item) => {
                    const shortDay = item.label
                        ? item.label.charAt(0).toUpperCase() +
                          item.label.slice(1, 3).toLowerCase()
                        : "";

                    map[shortDay] = {
                        bookingCount:
                            item.bookingCount || item.customerBookingCount || 0,
                        walkInCount:
                            item.walkInCount || item.walkInBookingCount || 0,
                        cancelCount: item.cancelCount || 0,
                    };

                    revMap[shortDay] =
                        item.revenueBlock?.totalRevenue ||
                        item.totalBookingCount ||
                        item.revenue ||
                        0;
                    topRevMap[shortDay] =
                        item.revenueBlock?.topServiceRevenue ||
                        item.topServiceRevenue ||
                        item.topService ||
                        0;
                });

                const totalRevList = defaultDays.map((d) => revMap[d] || 0);
                const topRevList = defaultDays.map((d) => topRevMap[d] || 0);

                return {
                    labels: defaultDays,
                    totalRevenueData: totalRevList,
                    topServiceData: topRevList,
                    statsMap: map,
                };
            } else {
                // YEARLY / MONTHLY VIEW (Past Month or Past Year)
                const allMonths = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];

                const isCurrentYear = dayjs(selectedYear).isSame(
                    dayjs(),
                    "year",
                );

                const visibleMonths = isCurrentYear
                    ? allMonths.slice(0, currentMonthIndex + 1)
                    : allMonths;

                const revenueByMonthMap = {};
                chartData.forEach((item) => {
                    if (item?.label) {
                        revenueByMonthMap[item.label.toLowerCase()] =
                            item?.revenueBlock?.totalRevenue || 0;
                    }
                });

                const totalRevList = visibleMonths.map((m) => {
                    const monthKey = m.toLowerCase();

                    if (revenueByMonthMap[monthKey] !== undefined) {
                        return revenueByMonthMap[monthKey];
                    }

                    return monthlyCache[monthKey] ?? 0;
                });

                return {
                    labels: visibleMonths,
                    totalRevenueData: totalRevList,
                    topServiceData: [],
                    statsMap: {},
                };
            }
        }, [
            chartData,
            isCurrentMonth,
            currentMonthIndex,
            selectedYear,
            monthlyCache,
        ]);

    // Color Configurations
    const ACTIVE_COLOR = "#DD586D"; // Selected / Active Color (Dark Pink)
    const INACTIVE_COLOR = "#F1A8B6"; // Inactive Color (Light Pink)

    const targetMonthPrefix = selectedMonth.toLowerCase().slice(0, 3);

    // Dynamic Bar Color Mapping (Selected Month = Dark Pink, Others with Data = Light Pink)
    const barColors = isCurrentMonth
        ? ACTIVE_COLOR
        : labels.map((lbl) =>
              lbl.toLowerCase().startsWith(targetMonthPrefix)
                  ? ACTIVE_COLOR
                  : INACTIVE_COLOR,
          );

    const chartDataConfig = {
        labels,
        datasets: [
            {
                label: "Total Revenue",
                data: totalRevenueData,
                backgroundColor: barColors,
                borderRadius: { topLeft: 8, topRight: 8 },
                borderSkipped: false,
                maxBarThickness: isCurrentMonth ? 60 : 45,
            },
            ...(isCurrentMonth
                ? [
                      {
                          label: "Top Service",
                          data: topServiceData,
                          backgroundColor: "#E61010",
                          hoverBackgroundColor: "#E6304F",
                          borderRadius: { topLeft: 8, topRight: 8 },
                          borderSkipped: false,
                          maxBarThickness: 60,
                      },
                  ]
                : []),
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                bottom: isCurrentMonth ? 20 : 10,
            },
        },
        plugins: {
            legend: {
                position: "top",
                align: "end",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 12,
                    boxHeight: 12,
                    // paddingBottom: 30,
                    color: "#64748B",
                    font: {
                        size: 13,
                        weight: "500",
                        family: "Montserrat, sans-serif",
                    },
                },
            },
            htmlFooterPlugin: {
                statsMap,
                isCurrentMonth,
            },
        },
        scales: {
            x: {
                border: { display: false },
                grid: { display: false },
                ticks: {
                    color: (ctx) => {
                        if (isCurrentMonth) return "#000000";
                        const label = labels[ctx.index];
                        return label
                            ?.toLowerCase()
                            .startsWith(targetMonthPrefix)
                            ? "#000000"
                            : "#888888";
                    },
                    font: (ctx) => {
                        const label = labels[ctx.index];
                        const isSelected = label
                            ?.toLowerCase()
                            .startsWith(targetMonthPrefix);
                        return {
                            size: 13,
                            family: "Montserrat, sans-serif",
                            weight:
                                !isCurrentMonth && isSelected ? "700" : "500",
                        };
                    },
                    padding: 8,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) =>
                        value >= 1000 ? `${value / 1000}K` : value,
                },
            },
        },
    };

    return (
        <div
            className="chart-wrapper"
            style={{ position: "relative", width: "100%", height: "400px" }}
        >
            <Bar
                options={options}
                data={chartDataConfig}
                plugins={[htmlFooterPlugin, legendMarginPlugin]}
            />
        </div>
    );
};

export default ReportBarChart;
