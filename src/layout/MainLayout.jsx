import { Layout } from "antd";
import SideBar from "../components/Bars/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Bars/NavBar";
// import AppFooter from "../components/Footer";

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
    return (
        <Layout className="h-screen overflow-hidden">
            {/* for desktop */}
            <Sider
                theme="light"
                trigger={null}
                breakpoint="lg"
                width={270}
                className="hidden h-full lg:block "
            >
                <SideBar />
            </Sider>

            <Layout className="h-full flex flex-col">
                {/* for mobile */}
                <div className="lg:hidden">
                    <SideBar />
                </div>

                <Header className="!bg-brand-gradient px-4 h-16">
                    <Navbar />
                </Header>
                <Content className="p-4 md:p-6 bg-gray-50 overflow-y-auto flex-1">
                    <Outlet />
                </Content>
                {/* <AppFooter /> */}
            </Layout>
        </Layout>
    );
};

export default MainLayout;
