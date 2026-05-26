import { Layout } from "antd";
import SideBar from "../components/SideBar";
import { useState } from "react";
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import AppFooter from "../components/Footer";

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    return (
        <Layout>
            <Sider
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="min-h-screen"
            >
                <div className="h-full flex justify-between flex-col">
                    <SideBar />
                    <div>
                        <button
                            className="bg-white text-xl w-full"
                            onClick={handleLogout}
                        >
                            <p className="h-12 text-blue font-medium hover:text-red-500 flex items-center justify-center hover:underline">
                                {collapsed ? (
                                    <LogoutOutlined />
                                ) : (
                                    <span>
                                        <LogoutOutlined />
                                        <span>Logout</span>
                                    </span>
                                )}
                            </p>
                        </button>
                        <button
                            className="w-full h-12 bg-blue-950 text-white text-xl "
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? (
                                <MenuFoldOutlined />
                            ) : (
                                <MenuUnfoldOutlined />
                            )}
                        </button>
                    </div>
                </div>
            </Sider>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content>
                    <Outlet />
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
