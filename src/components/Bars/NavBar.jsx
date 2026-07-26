import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../layout/layoutSlice";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import { Badge, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FilteredTabContent } from "./IncomeNotifications/FilteredTabContent";
import IncomeNotiSection from "./IncomeNotifications/IncomeNotiSection";
import { useGetSettingsQuery } from "../../features/auth/authApi";
import { getImageUrl } from "../../app/core/functions/getImageUrl";

const Navbar = () => {
    const [isNotiOpen, setIsNotiOpen] = useState(false);
    const dispatch = useDispatch();

    const { data: adminData } = useGetSettingsQuery();

    const profilePicUrl =
        adminData?.profilePicture ||
        "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg";

    const getImg = getImageUrl(profilePicUrl);

    // for tab section
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
                    Welcome{" "}
                    <span className="font-bold">
                        {adminData?.fullName || "Rebillet"}
                    </span>{" "}
                    !
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
                        {/* Dynamic, circular, fixed aspect-ratio profile avatar */}
                        <img
                            src={getImg}
                            className="w-10 h-10 ms-3 mb-1 rounded-full border-2 border-white object-cover shadow-sm hover:opacity-90 transition-opacity"
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
