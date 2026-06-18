import { Line } from "@ant-design/plots";
import { Card } from "antd";

export const DemoLine = () => {
    const config = {
        data: {
            type: "fetch",
            value: "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
        },
        xField: (d) => new Date(d.year),
        yField: "value",
        colorField: "category",
        axis: {
            x: {
                tickStroke: "#cdcdcd",
                gridStroke: "#efefef",
            },
            y: {
                tickStroke: "#cdcdcd",
                gridStroke: "#efefef",
            },
        },
    };
    return (
        <Card className="w-full shadow-sm p-4 !h-[350px]">
            <div className="relative w-full !h-[300px]">
                <Line {...config} />
            </div>
        </Card>
    );
};
