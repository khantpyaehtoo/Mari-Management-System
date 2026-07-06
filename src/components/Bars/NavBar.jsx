import {
    BellOutlined,
    InboxOutlined,
    MenuOutlined,
    SendOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../layout/layoutSlice";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import {
    Badge,
    Drawer,
    Space,
    Tabs,
    Button,
    Form,
    Input,
    Upload,
    Radio,
    Checkbox,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FilteredTabContent } from "./FilteredTabContent";

const { Dragger } = Upload;

const bookingData = [
    "For Booking Data",
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
    "The End of Booking Data",
];

const commentData = [
    "For Comment Data",
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
    "The End of Comment Data",
];

const NotiSendOptions = [
    { label: "Announcement", value: "announcement" },
    { label: "Promotion", value: "promotion" },
    { label: "Reminder", value: "reminder" },
    { label: "Alert", value: "alert" },
];

const sendType = [
    { label: "Staffs", value: "staffs" },
    { label: "Customers", value: "customers" },
];

const Navbar = () => {
    const [isNotiOpen, setIsNotiOpen] = useState(false);
    const [drawerPage, setDrawerPage] = useState("list");
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const items = [
        {
            key: "1",
            label: (
                <span className="w-full text-center flex items-center justify-center px-4 font-medium">
                    Incoming
                </span>
            ),
            children: <FilteredTabContent data={bookingData} />,
        },
        {
            key: "2",
            label: (
                <span className="w-full text-center flex items-center justify-center px-4 font-medium">
                    Sent History
                </span>
            ),
            children: <FilteredTabContent data={commentData} />,
        },
    ];

    // const onChange = (checkedValues) => {
    //     console.log("checked = ", checkedValues);
    // };

    const onCloseDrawer = () => {
        setIsNotiOpen(false);
        setDrawerPage("list");
    };

    const onFinish = (values) => {
        console.log("Sent Notification Data:", values);
        form.resetFields();
        setDrawerPage("list");
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button
                    className="text-white text-xl lg:hidden cursor-pointer"
                    onClick={() => dispatch(toggleSidebar(true))}
                >
                    <MenuOutlined />
                </button>
                <h3 className="text-white lg:text-2xl md:text-lg">
                    Welcome <span className="font-bold">Rebillet</span> !
                </h3>
            </div>

            <div className="text-white">
                <Space align="center">
                    <span className="hidden md:block lg:block">
                        Current Date:{" "}
                    </span>
                    <DateTimeFormatter />
                    <Badge>
                        <BellOutlined
                            style={{
                                fontSize: "20px",
                                padding: "10px",
                                color: "#FBB1BD",
                            }}
                            className="cursor-pointer! ms-3 bg-white rounded-full hover:bg-gray-200"
                            onClick={() => setIsNotiOpen(true)}
                        />
                    </Badge>
                    <Link to={"/settings"}>
                        <img
                            src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                            className="w-10 ms-3 mb-1 rounded-full border-3 border-white"
                            alt="avatar"
                        />
                    </Link>
                </Space>

                <Drawer
                    title={
                        drawerPage === "list"
                            ? "Notifications"
                            : "Send New Notification"
                    }
                    open={isNotiOpen}
                    onClose={onCloseDrawer}
                    mask={true}
                    size={550}
                    styles={{
                        header: { background: "#A76D83", color: "white" },
                        body: { padding: "0" },
                    }}
                >
                    {drawerPage === "list" ? (
                        <>
                            <div className="flex justify-between items-center px-4 py-4 shadow-md border-b border-gray-100">
                                <p className="text-gray-700 font-semibold m-0 flex items-center gap-2">
                                    <BellOutlined className="text-primary" />{" "}
                                    Inbox
                                </p>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setDrawerPage("send");
                                        console.log("send noti button hint");
                                    }}
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
                    ) : (
                        <>
                            <div className="mb-6 py-5 shadow-md">
                                <Button
                                    type="text"
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => setDrawerPage("list")}
                                    className=" hover:bg-transparent! text-gray-500 hover:text-gray-800"
                                >
                                    Back to Inbox
                                </Button>
                            </div>
                            <div className="p-6">
                                <Form
                                    layout="vertical"
                                    form={form}
                                    onFinish={onFinish}
                                >
                                    <Form.Item label="Image" name="image">
                                        <Dragger className="w-full">
                                            <div className="p-5">
                                                <p className="ant-upload-drag-icon text-primary">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text text-sm">
                                                    Click or drag file to this
                                                    area to upload
                                                </p>
                                            </div>
                                        </Dragger>
                                    </Form.Item>
                                    <Form.Item
                                        label="Leave Type"
                                        name="leave-type"
                                        rules={[{ required: true }]}
                                    >
                                        <Radio.Group
                                            block
                                            options={NotiSendOptions}
                                            optionType="button"
                                            buttonStyle="solid"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Title"
                                        name="title"
                                        rules={[{ required: true }]}
                                    >
                                        <Input className="input-styling! bg-white! h-10 rounded-lg" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Description"
                                        name="description"
                                    >
                                        <Input.TextArea
                                            rows={4}
                                            className="input-styling! bg-white! rounded-lg"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Send to">
                                        <Checkbox.Group className="flex gap-3 flex-wrap">
                                            {sendType.map((type, idx) => (
                                                <Checkbox
                                                    key={idx}
                                                    className="completely-custom-checkbox"
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <Form.Item className="mt-8 flex justify-end gap-3">
                                        <Space>
                                            <Button
                                                onClick={() =>
                                                    setDrawerPage("list")
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="bg-primary border-primary"
                                            >
                                                Send
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </div>
                        </>
                    )}
                </Drawer>
            </div>
        </div>
    );
};

export default Navbar;
