import {
    BellOutlined,
    InboxOutlined,
    MenuOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../layout/layoutSlice";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import {
    Badge,
    Drawer,
    Space,
    Typography,
    Tabs,
    Flex,
    Button,
    Modal,
    Form,
    Input,
    Upload,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const Navbar = () => {
    const [isNotiOpen, setIsNotiOpen] = useState(false);
    const [sendNotiModal, setSendNotiModal] = useState(false);
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
            children: (
                <Flex vertical gap="1px">
                    {bookingData.map((item, index) => (
                        <Typography.Title level={5} key={index}>
                            {item}
                        </Typography.Title>
                    ))}
                </Flex>
            ),
        },
        {
            key: "2",
            label: (
                <span className="w-full text-center flex items-center justify-center px-4 font-medium">
                    Sent History
                </span>
            ),
            children: (
                <Flex vertical gap="1px">
                    {commentData.map((item, index) => (
                        <Typography.Title level={5} key={index}>
                            {item}
                        </Typography.Title>
                    ))}
                </Flex>
            ),
        },
    ];

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
                        />
                    </Link>
                </Space>
                <Drawer
                    title="notifications"
                    open={isNotiOpen}
                    onClose={() => setIsNotiOpen(false)}
                    mask="true"
                    styles={{
                        header: {
                            background: "#A76D83",
                            color: "white",
                        },
                        body: {
                            padding: "0",
                        },
                    }}
                >
                    <div className="flex justify-between items-center px-3 py-4 ">
                        <p>
                            <BellOutlined /> Inbox
                        </p>
                        <Button
                            type="primary"
                            onClick={() => setSendNotiModal(true)}
                            value={sendNotiModal}
                        >
                            <SendOutlined /> Send Noti
                        </Button>
                        <Modal
                            title="Send Noti"
                            open={sendNotiModal}
                            onCancel={() => setSendNotiModal(false)}
                            footer={null}
                        >
                            <Form layout="vertical" form={form}>
                                <Form.Item label="Image">
                                    <Dragger
                                        // {...uploadProps}
                                        className="h-125! w-full max-w-100!"
                                    >
                                        <div className="p-5 md:p-15">
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag file to this area
                                                to upload
                                            </p>
                                        </div>
                                    </Dragger>
                                </Form.Item>
                                <Form.Item label="Type">
                                    <Space>
                                        <Button>A</Button>
                                        <Button>B</Button>
                                        <Button>C</Button>
                                        <Button>D</Button>
                                    </Space>
                                </Form.Item>
                                <Form.Item label="Title">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        onClick={() => setSendNotiModal(false)}
                                        value={sendNotiModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button>Send</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        tabBarStyle={{ width: "100%" }}
                        centered
                        className="w-full"
                    />
                </Drawer>
            </div>
        </div>
    );
};

export default Navbar;
