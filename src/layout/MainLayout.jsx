import { Layout } from "antd";
import SideBar from "../components/Bars/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Bars/NavBar";
// import AppFooter from "../components/Footer";

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
    return (
        <Layout>
            {/* for desktop */}
            <Sider
                theme="light"
                trigger={null}
                breakpoint="lg"
                width={220}
                className="hidden lg:min-h-screen lg:block "
            >
                <SideBar />
            </Sider>

            <Layout>
                {/* for mobile */}
                <div className="lg:h-full lg:w-full lg:hidden">
                    <SideBar />
                </div>

                <Header className="!bg-brand-gradient px-4 h-16">
                    <Navbar />
                </Header>
                <Content className="p-4 md:p-6 bg-gray-50 min-h-screen">
                    <Outlet />
                </Content>
                {/* <AppFooter /> */}
            </Layout>
        </Layout>
    );
};

export default MainLayout;
