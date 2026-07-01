import {
    ApartmentOutlined,
    BarChartOutlined,
    BranchesOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    IdcardOutlined,
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

const SideBar = () => {
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
            label: <span className="sidemenu-item">Dashboard</span>,
        },
        {
            key: "/calendar",
            icon: <CalendarOutlined />,
            label: <span className="sidemenu-item">Calendar</span>,
        },
        {
            key: "/management",
            icon: <BranchesOutlined />,
            label: <span className="sidemenu-item">Management</span>,
            children: [
                {
                    icon: <UnorderedListOutlined />,
                    label: (
                        <span className="sidemenu-item">
                            Booking Management
                        </span>
                    ),
                    key: "/management/booking",
                },
                {
                    icon: <ApartmentOutlined />,
                    label: (
                        <span className="sidemenu-item">
                            Service Management
                        </span>
                    ),
                    key: "/management/service",
                },
                {
                    icon: <IdcardOutlined />,
                    label: (
                        <span className="sidemenu-item">Staff Management</span>
                    ),
                    key: "/management/staff",
                },
                {
                    icon: <SolutionOutlined />,
                    label: (
                        <span className="sidemenu-item">
                            Customer Management
                        </span>
                    ),
                    key: "/management/user",
                },
            ],
        },
        {
            key: "/walk-in",
            icon: <EnvironmentOutlined />,
            label: <span className="sidemenu-item">Walk In</span>,
        },
        {
            key: "/reports",
            icon: <BarChartOutlined />,
            label: <span className="sidemenu-item">Reports</span>,
        },
        {
            key: "/settings",
            icon: <SettingOutlined />,
            label: <span className="sidemenu-item">Settings</span>,
        },
    ];

    const closeSidebar = () => dispatch(toggleSidebar(false));

    // for sidebar menu dropdown not to close
    const getOpenKeys = () => {
        const pathParts = location.pathname.split("/");
        if (pathParts.length > 2) {
            return [`/${pathParts[1]}`];
        }
        return [];
    };

    // sidebar activeKey handler
    const getActiveKey = (pathname) => {
        if (!pathname) return;

        if (pathname.startsWith("/management/service")) {
            return "/management/service";
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
                    "sidebar-mobile fixed inset-y-0 w-80 left-0 h-screen z-999 lg:relative lg:translate-x-0 lg:z-0 lg:w-full lg:h-full",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex flex-col h-full">
                    <button
                        onClick={closeSidebar}
                        className="cursor-pointer lg:hidden flex justify-end p-4"
                    >
                        <X />
                    </button>
                    <div className="flex justify-center items-center h-16 cursor-default!">
                        <img src={brandLogo} alt="brandLogo" className="w-15" />
                        <img src={brandName} alt="brandName" className="w-15" />
                    </div>
                    <Menu
                        mode="inline"
                        items={menuItem}
                        selectedKeys={[getActiveKey(location?.pathname)]}
                        defaultOpenKeys={getOpenKeys()}
                        onClick={(item) => {
                            if (item.key) {
                                navigate(item.key);
                            }
                            if (window.innerWidth < 1024) closeSidebar();
                        }}
                        className="flex-1 border-none cursor-default! shadow-xl!"
                    />

                    <div className="shrink-0 h-12">
                        <Button
                            onClick={() => signOutHandler()}
                            className="w-full! h-full! text-primary border-0! bg-primary! hover:shadow-md p-3! group"
                        >
                            {" "}
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.5 20H3.33333C2.7808 20 2.25089 19.7805 1.86019 19.3898C1.46949 18.9991 1.25 18.4692 1.25 17.9167V3.33333C1.25 2.7808 1.46949 2.25089 1.86019 1.86019C2.25089 1.46949 2.7808 1.25 3.33333 1.25H7.5M14.7917 5.41667L20 10.625L14.7917 15.8333M20 10.625H7.5"
                                    stroke="#1E1E1E"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <span className="font-bold text-white group-hover:text-red-500! cursor-pointer">
                                {" "}
                                LogOut
                            </span>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
