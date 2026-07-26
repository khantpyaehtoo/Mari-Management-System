import { BellOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Tabs } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilteredTabContent } from "./FilteredTabContent";
import {
    useGetIncomingCustomerNotisQuery,
    useGetIncomingStaffNotisQuery,
} from "./incomeNotiApi";

const IncomeNotiSection = ({ isNotiOpen, onCloseDrawer }) => {
    const nav = useNavigate();

    const [customerTab, setCustomerTab] = useState("all");
    const [staffTab, setStaffTab] = useState("all");

    const { data: customerData, isLoading: isCustomerLoading } =
        useGetIncomingCustomerNotisQuery({ tab: customerTab });

    const { data: staffData, isLoading: isStaffLoading } =
        useGetIncomingStaffNotisQuery({ tab: staffTab });

    const customerNotis = customerData?.content || [];
    const staffNotis = staffData?.content || [];

    const navigateSentNoti = () => {
        nav("/send-notifications", { replace: true });
        onCloseDrawer();
    };

    const parentTabItems = [
        {
            key: "1",
            label: "Incoming Customer",
            children: (
                <FilteredTabContent
                    data={customerNotis}
                    type="customers"
                    isLoading={isCustomerLoading}
                    selectedType={customerTab}
                    onTabChange={(value) => setCustomerTab(value)}
                />
            ),
        },
        {
            key: "2",
            label: "Incoming Staff",
            children: (
                <FilteredTabContent
                    data={staffNotis}
                    type="staffs"
                    isLoading={isStaffLoading}
                    selectedType={staffTab}
                    onTabChange={(value) => setStaffTab(value)}
                />
            ),
        },
    ];

    return (
        <Drawer
            title="Notifications"
            open={isNotiOpen}
            onClose={onCloseDrawer}
            mask={true}
            size={550}
            styles={{
                header: { background: "#A76D83", color: "white" },
                body: { padding: "0" },
            }}
        >
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
                items={parentTabItems}
                tabBarStyle={{ width: "100%" }}
                centered
                className="w-full"
            />
        </Drawer>
    );
};

export default IncomeNotiSection;
