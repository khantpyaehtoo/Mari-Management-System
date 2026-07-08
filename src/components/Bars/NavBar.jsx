import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../layout/layoutSlice";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import { Badge, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FilteredTabContent } from "./FilteredTabContent";
import IncomeNotiSection from "./IncomeNotiSection";

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

const Navbar = () => {
    const [isNotiOpen, setIsNotiOpen] = useState(false);

    const dispatch = useDispatch();

    const items = [
        {
            key: "1",
            label: (
                <span className="w-full text-center flex items-center justify-center px-4 font-medium">
                    Incoming
                </span>
            ),
            children: <FilteredTabContent data={bookingData} />,
        },
        {
            key: "2",
            label: (
                <span className="w-full text-center flex items-center justify-center px-4 font-medium">
                    Sent History
                </span>
            ),
            children: <FilteredTabContent data={commentData} />,
        },
    ];

    const onCloseDrawer = () => {
        setIsNotiOpen(false);
    };

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
                            alt="avatar"
                        />
                    </Link>
                </Space>

                <IncomeNotiSection
                    isNotiOpen={isNotiOpen}
                    onCloseDrawer={onCloseDrawer}
                    items={items}
                />
            </div>
        </div>
    );
};

export default Navbar;
