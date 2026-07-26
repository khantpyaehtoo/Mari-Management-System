import {
    BellOutlined,
    MenuOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../layout/layoutSlice";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import { Badge, Flex } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FilteredTabContent } from "./IncomeNotifications/FilteredTabContent";
import IncomeNotiSection from "./IncomeNotifications/IncomeNotiSection";
import { useGetSettingsQuery } from "../../features/auth/authApi";
import { getImageUrl } from "../../app/core/functions/getImageUrl";

const Navbar = ({ collapsed, setCollapsed }) => {
    const [isNotiOpen, setIsNotiOpen] = useState(false);
    const dispatch = useDispatch();

    const { data: adminData } = useGetSettingsQuery();

    const profilePicUrl =
        adminData?.profilePicture ||
        "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg";

    const getImg = getImageUrl(profilePicUrl);

    const items = [
        {
            key: "1",
            label: (
                <span className="w-full text-center flex items-center justify-center px-4 font-medium">
                    Incoming Customer
                </span>
            ),
            children: <FilteredTabContent type="customers" />,
        },
        {
            key: "2",
            label: (
                <span className="w-full text-center flex items-center justify-center px-4 font-medium">
                    Incoming Staff
                </span>
            ),
            children: <FilteredTabContent type="staffs" />,
        },
    ];

    return (
        <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    className="text-white text-xl lg:hidden cursor-pointer"
                    onClick={() => dispatch(toggleSidebar(true))}
                >
                    <MenuOutlined />
                </button>

                {/* Desktop Collapse Toggle Button */}
                <button
                    className="text-white text-xl hidden lg:block cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>

                <h3 className="text-white lg:text-xl md:text-lg m-0">
                    Welcome{" "}
                    <span className="font-bold">
                        {adminData?.fullName || "Admin"}
                    </span>{" "}
                    !
                </h3>
            </div>

            <div className="text-white">
                <Flex align="center">
                    <span className="hidden md:block lg:block text-sm me-2">
                        Current Date:{""}
                    </span>
                    <DateTimeFormatter />
                    <Badge>
                        <BellOutlined
                            style={{
                                fontSize: "18px",
                                padding: "8px",
                                color: "#FBB1BD",
                            }}
                            className="cursor-pointer ms-3 bg-white rounded-full hover:bg-gray-100"
                            onClick={() => setIsNotiOpen(true)}
                        />
                    </Badge>
                    <Link to={"/settings"}>
                        <img
                            src={getImg}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg";
                            }}
                            className="w-9 h-9 ms-3 rounded-full border-2 border-white object-cover shadow-sm hover:opacity-90 transition-opacity"
                            alt="avatar"
                        />
                    </Link>
                </Flex>

                <IncomeNotiSection
                    isNotiOpen={isNotiOpen}
                    onCloseDrawer={() => setIsNotiOpen(false)}
                    items={items}
                />
            </div>
        </div>
    );
};

export default Navbar;
