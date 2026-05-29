import { Layout } from "antd";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import AppFooter from "../components/Footer";

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="min-h-screen"
                width="220"
            >
                <div className="h-full flex justify-between flex-col">
                    <SideBar />

                    <button
                        className="w-full h-12 bg-blue-950 text-white text-xl"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <RightOutlined /> : <LeftOutlined />}
                    </button>
                </div>
            </Sider>

            <Layout>
                <Header className="!bg-dark-blue">
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
