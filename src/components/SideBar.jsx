import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItem = [
        {
            key: "/",
            label: <span className="sidemenu-item">Dashboard</span>,
        },
        {
            key: "/user-management",
            label: <span className="sidemenu-item">User Management</span>,
        },
        {
            key: "/service-management",
            label: <span className="sidemenu-item">Service Management</span>,
        },
        {
            key: "/booking-management",
            label: <span className="sidemenu-item">Booking Management</span>,
        },
        {
            key: "/staff-management",
            label: <span className="sidemenu-item">Staff Management</span>,
        },
        {
            key: "/report",
            label: <span className="sidemenu-item">Report</span>,
        },
        {
            key: "/settings",
            label: <span className="sidemenu-item">Settings</span>,
        },
    ];
    return (
        <aside>
            <h2 className="flex justify-center text-center items-center text-3xl h-20 mb-5">
                Logo
            </h2>
            <Menu
                mode="inline"
                items={menuItem}
                selectedKeys={[location.pathname]}
                onClick={(item) => navigate(item.key)}
            />
        </aside>
    );
};

export default SideBar;
