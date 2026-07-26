import { useState } from "react";
import { Layout } from "antd";
import SideBar from "../components/Bars/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Bars/NavBar";

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="h-screen overflow-hidden">
            {/* Desktop Sider */}
            <Sider
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                width={270}
                collapsedWidth={80}
                className="hidden h-full lg:block transition-all duration-300 bg-white-back shadow-lg"
            >
                <SideBar collapsed={collapsed} />
            </Sider>

            <Layout className="h-full flex flex-col">
                {/* Mobile SideBar */}
                <div className="lg:hidden">
                    <SideBar collapsed={false} />
                </div>

                <Header className="bg-primary! px-4 h-16">
                    <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                </Header>

                <Content className="p-4 md:p-6 bg-white-back overflow-y-auto flex-1">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
