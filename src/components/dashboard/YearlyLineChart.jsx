import { DualAxes } from "@ant-design/charts";
import { Card } from "antd";

export const YearlyLineChart = () => {
    const data = [
        { year: "1999", value: 3, count: 10 },
        { year: "2000", value: 4, count: 4 },
        { year: "2001", value: 3.5, count: 5 },
        { year: "2002", value: 5, count: 5 },
        { year: "2003", value: 4.9, count: 4.9 },
        { year: "2004", value: 6, count: 35 },
        { year: "2005", value: 7, count: 7 },
        { year: "2006", value: 9, count: 1 },
        { year: "2007", value: 13, count: 20 },
    ];

    const config = {
        data,
        xField: "year",
        legend: true,

        children: [
            {
                type: "line",
                yField: "value",
                shapeField: "smooth",
                style: {
                    lineWidth: 3,
                    // opacity: 0.5,
                    // lineDash: [5, 5],
                    stroke: "#E61010",
                },
                label: {
                    text: (datum) => `${datum.value}`,
                    style: {
                        dy: -10,
                        textAlign: "middle",
                    },
                },
                axis: {
                    y: {
                        title: "value",
                        style: { titleFill: "#5B8FF9" },
                    },
                },
            },
            {
                type: "line",
                yField: "count",
                shapeField: "smooth",
                style: {
                    stroke: "#E61010",
                    lineWidth: 4,
                    opacity: 0.5,
                },
                label: {
                    text: (datum) => `${datum.count}`,
                    style: {
                        dy: -10,
                        textAlign: "middle",
                    },
                },
                axis: {
                    y: {
                        position: "right",
                        title: "count",
                        style: { titleFill: "#E61010" },
                    },
                },
            },
            {
                type: "point",
                yField: "count",
                sizeField: 4,
                style: {
                    stroke: "#E61010",
                    fill: "#fff",
                },
                axis: { y: false },
                tooltip: false,
            },
        ],
    };

    return (
        <Card className="w-full shadow-sm p-4 ">
            <div className="relative w-full h-105!">
                <DualAxes {...config} />
            </div>
        </Card>
    );
};
