import { Layout } from "antd";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import AppFooter from "../components/Footer";

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
    return (
        <Layout>
            <Sider
                theme="light"
                trigger={null}
                breakpoint="lg"
                collapsedWidth="0"
                width={220}
                className="hidden lg:block min-h-screen"
            >
                <SideBar />
            </Sider>

            <Layout>
                <div className="h-full w-full lg:hidden">
                    <SideBar />
                </div>

                <Header className="!bg-dark-blue px-4 h-16">
                    <Navbar />
                </Header>
                <Content className="p-4 md:p-6 bg-gray-50 min-h-screen">
                    <Outlet />
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
