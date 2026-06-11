import {
    ApartmentOutlined,
    BranchesOutlined,
    FileDoneOutlined,
    IdcardOutlined,
    LogoutOutlined,
    SettingOutlined,
    SolutionOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { toggleSidebar } from "../../layout/LayoutSlice";
import { X } from "lucide-react";
import { removeCookie, setLoggedIn } from "../../features/auth/authSlice";

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
            key: "/management",
            icon: <BranchesOutlined />,
            label: <span className="sidemenu-item">Management</span>,
            children: [
                {
                    icon: <ApartmentOutlined />,
                    label: <span className="sidemenu-item">Service</span>,
                    key: "/management/service",
                },
                {
                    icon: <SolutionOutlined />,
                    label: <span className="sidemenu-item">User</span>,
                    key: "/management/user",
                },
                {
                    icon: <UnorderedListOutlined />,
                    label: <span className="sidemenu-item">Booking</span>,
                    key: "/management/booking",
                },
                {
                    icon: <IdcardOutlined />,
                    label: <span className="sidemenu-item">Staff</span>,
                    key: "/management/staff",
                },
            ],
        },
        {
            key: "/report",
            icon: <FileDoneOutlined />,
            label: <span className="sidemenu-item">Report</span>,
        },
        {
            key: "/settings",
            icon: <SettingOutlined />,
            label: <span className="sidemenu-item">Settings</span>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span className="sidemenu-item text-red-500">Logout</span>,
        },
    ];

    const closeSidebar = () => dispatch(toggleSidebar(false));

    // for sidebar menu dropdown
    const getOpenKeys = () => {
        const pathParts = location.pathname.split("/");
        if (pathParts.length > 2) {
            return [`/${pathParts[1]}`];
        }
        return [];
    };

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
                    isSidebarOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none",
                )}
                onClick={closeSidebar}
            />

            {/* Sidebar content */}
            <aside
                className={cn(
                    "sidebar-mobile lg:relative lg:translate-x-0 lg:z-0 lg:w-full h-full;",
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
                    <h2 className="flex justify-center text-center items-center text-3xl h-20 mb-5 font-bold text-dark-blue">
                        Logo
                    </h2>
                    <Menu
                        mode="inline"
                        items={menuItem}
                        selectedKeys={[location.pathname]}
                        defaultOpenKeys={getOpenKeys()}
                        onClick={(item) => {
                            if (item.key !== "logout") {
                                navigate(item.key);
                            } else {
                                signOutHandler();
                            }

                            if (window.innerWidth < 1024) closeSidebar();
                        }}
                        className="flex-1 border-none"
                    />
                </div>
            </aside>
        </>
    );
};

export default SideBar;
