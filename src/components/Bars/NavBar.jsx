import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../layout/layoutSlice";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import { Badge, Drawer, Space, Typography, Tabs, Flex } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const bookingData = [
    "For Booking Data",
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
    "The End of Booking Data",
];

const commentData = [
    "For Comment Data",
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
    "The End of Comment Data",
];

const promotionsData = [
    "For Promotions Data",
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
    "The End of Promotions Data",
];
const Navbar = () => {
    const [isNotiOpen, setIsNotiOpen] = useState(false);
    const dispatch = useDispatch();

    const items = [
        {
            key: "1",
            label: <span className="flex items-center gap-2">Bookings</span>,
            children: (
                <Flex vertical gap="1px">
                    {bookingData.map((item, index) => (
                        <Typography.Title level={5} key={index}>
                            {item}
                        </Typography.Title>
                    ))}
                </Flex>
            ),
        },
        {
            key: "2",
            label: <span className="flex items-center gap-2">Comments</span>,
            children: (
                <Flex vertical gap="1px">
                    {commentData.map((item, index) => (
                        <Typography.Title level={5} key={index}>
                            {item}
                        </Typography.Title>
                    ))}
                </Flex>
            ),
        },
        {
            key: "3",
            label: <span className="flex items-center gap-2">Promotions</span>,
            children: (
                <Flex vertical gap="1px">
                    {promotionsData.map((item, index) => (
                        <Typography.Title level={5} key={index}>
                            {item}
                        </Typography.Title>
                    ))}
                </Flex>
            ),
        },
    ];

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button
                    className="text-white text-xl lg:hidden cursor-pointer"
                    onClick={() => dispatch(toggleSidebar(true))}
                >
                    <MenuOutlined />
                </button>
                <h3 className="text-white lg:text-2xl md:text-lg">
                    Welcome <span className="font-bold">Rebillet</span> !
                </h3>
            </div>

            <div className="text-white">
                <Space align="center">
                    <span className="hidden md:block lg:block">
                        Current Date:{" "}
                    </span>
                    <DateTimeFormatter />
                    <Badge>
                        <BellOutlined
                            style={{
                                fontSize: "20px",
                                padding: "10px",
                                color: "#FBB1BD",
                            }}
                            className="cursor-pointer! ms-3 bg-white rounded-full hover:bg-gray-200"
                            onClick={() => setIsNotiOpen(true)}
                        />
                    </Badge>
                    <Link to={"/settings"}>
                        <img
                            src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                            className="w-10 ms-3 mb-1 rounded-full border-3 border-white"
                        />
                    </Link>
                </Space>
                <Drawer
                    title="notifications"
                    open={isNotiOpen}
                    onClose={() => setIsNotiOpen(false)}
                    mask="true"
                    styles={{
                        header: {
                            background: "#A76D83",
                            color: "white",
                        },
                    }}
                >
                    <Tabs defaultActiveKey="1" items={items} />
                </Drawer>
            </div>
        </div>
    );
};

export default Navbar;
