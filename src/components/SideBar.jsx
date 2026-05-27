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

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
            key: "/login",
            icon: <LogoutOutlined />,
            label: <span className="sidemenu-item text-red-500">Logout</span>,
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
                className="flex flex-col gap-1"
            />
        </aside>
    );
};

export default SideBar;
