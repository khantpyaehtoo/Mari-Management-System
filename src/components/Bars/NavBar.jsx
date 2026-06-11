import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../layout/layoutSlice";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import { Badge, Drawer, List, Space, Typography, Tabs } from "antd";
import { useState } from "react";
const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
];
const Navbar = () => {
    const [isNotiOpen, setIsNotiOpen] = useState(false);
    const dispatch = useDispatch();

    const items = [
        {
            key: "1",
            label: <span className="flex items-center gap-2">Bookings</span>,
            children: (
                <List
                    size="small"
                    dataSource={data}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Typography.Title level={5}>
                                    {item}
                                </Typography.Title>
                            </List.Item>
                        );
                    }}
                />
            ),
        },
        {
            key: "2",
            label: <span className="flex items-center gap-2">Comments</span>,
            children: (
                <List
                    size="small"
                    dataSource={data}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Typography.Title level={5}>
                                    {item}
                                </Typography.Title>
                            </List.Item>
                        );
                    }}
                />
            ),
        },
        {
            key: "3",
            label: <span className="flex items-center gap-2">Promotions</span>,
            children: (
                <List
                    size="small"
                    dataSource={data}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Typography.Title level={5}>
                                    {item}
                                </Typography.Title>
                            </List.Item>
                        );
                    }}
                />
            ),
        },
    ];

    return (
        <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
                <button
                    className="text-white text-xl lg:hidden cursor-pointer"
                    onClick={() => dispatch(toggleSidebar(true))}
                >
                    <MenuOutlined />
                </button>
                <h3 className="text-white text-lg md:text-2xl">
                    Welcome <span className="font-bold">Rebillet</span> !
                </h3>
            </div>

            <div className="text-white">
                <Space>
                    <span>Current Date: </span>
                    <DateTimeFormatter />
                    <Badge>
                        <BellOutlined
                            style={{ fontSize: 20, color: "white" }}
                            onClick={() => setIsNotiOpen(true)}
                        />
                    </Badge>
                </Space>
                <Drawer
                    title="notifications"
                    open={isNotiOpen}
                    onClose={() => setIsNotiOpen(false)}
                    mask="true"
                >
                    <Tabs defaultActiveKey="1" items={items} />
                </Drawer>
            </div>
        </div>
    );
};

export default Navbar;
