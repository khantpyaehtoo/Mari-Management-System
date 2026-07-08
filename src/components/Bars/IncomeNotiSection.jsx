import { BellOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const IncomeNotiSection = ({ isNotiOpen, onCloseDrawer, items }) => {
    const nav = useNavigate();

    const navigateSentNoti = () => {
        nav("/send-notifications", { replace: true });
        onCloseDrawer();
    };

    return (
        <Drawer
            title={"Notifications"}
            open={isNotiOpen}
            onClose={onCloseDrawer}
            mask={true}
            size={550}
            styles={{
                header: { background: "#A76D83", color: "white" },
                body: { padding: "0" },
            }}
        >
            {/* {drawerPage === "list" ? ( */}
            <>
                <div className="flex justify-between items-center px-4 py-4 shadow-md border-b border-gray-100">
                    <p className="text-gray-700 font-semibold m-0 flex items-center gap-2">
                        <BellOutlined className="text-primary" /> Inbox
                    </p>
                    <Button
                        type="primary"
                        onClick={navigateSentNoti}
                        className="border-primary"
                    >
                        <SendOutlined /> Send Noti
                    </Button>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    tabBarStyle={{ width: "100%" }}
                    centered
                    className="w-full"
                />
            </>
        </Drawer>
    );
};

export default IncomeNotiSection;
