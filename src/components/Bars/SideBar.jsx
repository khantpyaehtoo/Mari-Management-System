import {
    ApartmentOutlined,
    BarChartOutlined,
    BlockOutlined,
    BranchesOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    IdcardOutlined,
    LogoutOutlined,
    SendOutlined,
    SettingOutlined,
    SolutionOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { toggleSidebar } from "../../layout/layoutSlice";
import { X } from "lucide-react";
import { removeCookie, setLoggedIn } from "../../features/auth/authSlice";
import brandLogo from "../../../public/asset/brandLogo.png";
import brandName from "../../../public/asset/brandName.png";

// collapsed prop ကို လက်ခံထားပါတယ်
const SideBar = ({ collapsed = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.layout.isOpen);

    const signOutHandler = () => {
        dispatch(removeCookie());
        dispatch(
            setLoggedIn({
                email: null,
                token: null,
            }),
        );
        navigate("/login");
    };

    const menuItem = [
        {
            key: "/",
            icon: <UserOutlined />,
            label: "Dashboard",
        },
        {
            key: "/calendar",
            icon: <CalendarOutlined />,
            label: "Calendar",
        },
        {
            key: "/management",
            icon: <BranchesOutlined />,
            label: "Management",
            children: [
                {
                    icon: <UnorderedListOutlined />,
                    label: "Booking Management",
                    key: "/management/booking",
                },
                {
                    icon: <ApartmentOutlined />,
                    label: "Service Management",
                    key: "/management/service",
                },
                {
                    icon: <BlockOutlined />,
                    label: "Packages Management",
                    key: "/management/packages",
                },
                {
                    icon: <IdcardOutlined />,
                    label: "Staff Management",
                    key: "/management/staff",
                },
                {
                    icon: <SolutionOutlined />,
                    label: "Customer Management",
                    key: "/management/user",
                },
            ],
        },
        {
            key: "/walk-in",
            icon: <EnvironmentOutlined />,
            label: "Walk In",
        },
        {
            key: "/send-notifications",
            icon: <SendOutlined />,
            label: "Send Notifications",
        },
        {
            key: "/reports",
            icon: <BarChartOutlined />,
            label: "Reports",
        },
        {
            key: "/settings",
            icon: <SettingOutlined />,
            label: "Settings",
        },
    ];

    const closeSidebar = () => dispatch(toggleSidebar(false));

    const getOpenKeys = () => {
        const pathParts = location.pathname.split("/");
        if (pathParts.length > 2) {
            return [`/${pathParts[1]}`];
        }
        return [];
    };

    const getActiveKey = (pathname) => {
        if (!pathname) return;

        if (pathname.startsWith("/management/service")) {
            return "/management/service";
        }

        if (pathname.startsWith("/management/packages")) {
            return "/management/packages";
        }

        return pathname;
    };

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 w-full z-90 lg:hidden transition-opacity duration-300",
                    isSidebarOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none",
                )}
                onClick={closeSidebar}
            />

            {/* Sidebar content */}
            <aside
                className={cn(
                    "sidebar-mobile fixed inset-y-0 left-0 h-screen z-999 lg:relative lg:translate-x-0 lg:z-0 lg:w-full lg:h-full bg-white flex flex-col justify-between overflow-hidden",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex flex-col h-full overflow-hidden">
                    <button
                        onClick={closeSidebar}
                        className="cursor-pointer lg:hidden flex justify-end p-4"
                    >
                        <X />
                    </button>

                    {/* Header Logo Section */}
                    <div className="flex bg-primary justify-center items-center h-16 gap-2 shrink-0 overflow-hidden px-2">
                        <img
                            src={brandLogo}
                            alt="brandLogo"
                            className="w-10 h-10 object-contain shrink-0"
                        />
                        {!collapsed && (
                            <img
                                src={brandName}
                                alt="brandName"
                                className="w-12 object-contain"
                            />
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <Menu
                        mode="inline"
                        inlineCollapsed={collapsed}
                        items={menuItem}
                        selectedKeys={[getActiveKey(location?.pathname)]}
                        defaultOpenKeys={getOpenKeys()}
                        onClick={(item) => {
                            if (item.key) {
                                navigate(item.key);
                            }
                            if (window.innerWidth < 1024) closeSidebar();
                        }}
                        className="flex-1 border-none cursor-default! shadow-none! overflow-y-auto"
                    />

                    <div className="shrink-0 p-2">
                        <Button
                            onClick={() => signOutHandler()}
                            className="w-full! h-11! text-primary border-0! bg-primary! hover:bg-[#f87596]! p-0! group cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
                            title="LogOut"
                        >
                            <LogoutOutlined className="text-white!  text-lg shrink-0" />
                            {!collapsed && (
                                <span className="font-bold text-white  truncate">
                                    LogOut
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
