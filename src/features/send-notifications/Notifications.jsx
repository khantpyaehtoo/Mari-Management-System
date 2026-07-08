import { Avatar, Button, Card, Flex, Space } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { DeleteOutlined } from "@ant-design/icons";
import { BellRing, PartyPopper, TriangleAlert } from "lucide-react";

const Notifications = () => {
    return (
        <>
            <SubHeaderSection
                title="Sent Notifications"
                subTitle="You can sent notifications to staffs & customers."
                formType={["To Staff", "To Customer"]}
            />

            <div className="flex w-full h-[calc(100vh-150px)] mt-4 overflow-hidden">
                <div className="w-1/2 h-full overflow-y-auto border-e border-e-gray-400 px-5 py-2 space-y-8!">
                    <h1 className="font-semibold sticky top-0 bg-white py-5 px-4 rounded-2xl shadow-md w-full z-10">
                        Sent Notifications (Staffs)
                    </h1>

                    <Card className="border-gray-300! shadow-md! rounded-xl! hover:shadow-md!">
                        <Flex justify="space-between" align="start">
                            <div className="bg-primary-sec me-5 rounded-2xl p-3">
                                <PartyPopper
                                    size={30}
                                    className=" text-primary"
                                />
                            </div>
                            <Space vertical>
                                <h1 className="text-primary font-semibold text-lg!">
                                    New Staff Announcement!
                                </h1>
                                <Space vertical>
                                    <p className="text-xs">
                                        We would like to warmly welcome La Min,
                                        who will be taking on the role of Nail
                                        Artist at our shop starting today.
                                    </p>
                                    <div className="w-full border border-primary rounded-2xl overflow-hidden bg-primary">
                                        <img
                                            src="../../../public/asset/newStaff.jpg"
                                            className="w-full object-cover"
                                        />
                                    </div>
                                </Space>
                                <small className="text-gray-400">
                                    1 day ago
                                </small>
                            </Space>
                            <Button className="border-0! text-primary! hover:text-red-500!">
                                <DeleteOutlined className="text-xl" />
                            </Button>
                        </Flex>
                    </Card>

                    <Card className="border-gray-300! shadow-md! rounded-xl! hover:shadow-md!">
                        <Flex justify="space-between" align="start">
                            <div className="bg-primary-sec me-5 rounded-2xl p-3">
                                <PartyPopper
                                    size={30}
                                    className=" text-primary"
                                />
                            </div>
                            <Space vertical>
                                <h1 className="text-primary font-semibold text-lg!">
                                    New Promotion!
                                </h1>
                                <Space vertical>
                                    <p className="text-xs">
                                        We would like to warmly welcome La Min,
                                        who will be taking on the role of Nail
                                        Artist at our shop starting today.
                                    </p>
                                    <img
                                        src="../../../public/asset/Promotions.png"
                                        className="rounded-2xl"
                                    />
                                </Space>
                                <small className="text-gray-400">
                                    1 day ago
                                </small>
                            </Space>
                            <Button className="border-0! text-primary! hover:text-red-500!">
                                <DeleteOutlined className="text-xl" />
                            </Button>
                        </Flex>
                    </Card>

                    <Card className="border-gray-300! shadow-md! rounded-xl! hover:shadow-md!">
                        <Flex justify="space-between" align="start">
                            <div className="bg-primary-sec me-5 rounded-2xl p-3">
                                <BellRing size={30} className=" text-primary" />
                            </div>
                            <Space vertical>
                                <h1 className="text-primary font-semibold text-lg!">
                                    Important Meeting
                                </h1>
                                <Space vertical>
                                    <p className="text-xs">
                                        We would like to warmly welcome La Min,
                                        who will be taking on the role of Nail
                                        Artist at our shop starting today.
                                    </p>
                                </Space>
                                <small className="text-gray-400">
                                    1 Month ago
                                </small>
                            </Space>
                            <Button className="border-0! text-primary! hover:text-red-500!">
                                <DeleteOutlined className="text-xl" />
                            </Button>
                        </Flex>
                    </Card>

                    <Card className="border-gray-300! shadow-md! rounded-xl! hover:shadow-md!">
                        <Flex justify="space-between" align="start">
                            <div className="bg-primary-sec me-5 rounded-2xl p-3">
                                <TriangleAlert
                                    size={30}
                                    className="text-unavailable"
                                />
                            </div>
                            <Space vertical>
                                <h1 className="text-primary font-semibold text-lg!">
                                    Staff behaviour Reminder!
                                </h1>
                                <Space vertical>
                                    <p className="text-xs">
                                        We would like to warmly welcome La Min,
                                        who will be taking on the role of Nail
                                        Artist at our shop starting today.
                                    </p>
                                </Space>
                                <small className="text-gray-400">
                                    1 Month ago
                                </small>
                            </Space>
                            <Button className="border-0! text-primary! hover:text-red-500!">
                                <DeleteOutlined className="text-xl" />
                            </Button>
                        </Flex>
                    </Card>
                </div>

                <div className="w-1/2 h-full overflow-y-auto px-5 py-2 space-y-8!">
                    <h1 className="font-semibold sticky top-0 bg-white py-5 px-4 rounded-2xl shadow-md w-full z-10">
                        Sent Notifications (Customers)
                    </h1>

                    <Card className="border-gray-300! shadow-md! p-1! rounded-xl! hover:shadow-md!">
                        <Flex justify="space-between" align="start">
                            <div className="bg-[#FEE1EB] me-5 rounded-2xl p-3">
                                <PartyPopper
                                    size={30}
                                    className=" text-primary"
                                />
                            </div>
                            <Space vertical>
                                <h1 className="text-primary font-semibold text-lg!">
                                    New Promotion!
                                </h1>
                                <Space vertical>
                                    <p className="text-xs">
                                        We would like to warmly welcome La Min,
                                        who will be taking on the role of Nail
                                        Artist at our shop starting today.
                                    </p>
                                    <img
                                        src="../../../public/asset/Promotions.png"
                                        className="rounded-2xl"
                                    />
                                </Space>
                            </Space>
                            <Button className="border-0! text-primary! hover:text-red-500!">
                                <DeleteOutlined className="text-xl" />
                            </Button>
                        </Flex>
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                    <Card className="border-gray-300! rounded-xl! hover:shadow-md!">
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
                            }
                            title={
                                <Flex justify="space-between" align="center">
                                    <h1 className="text-primary text-lg!">
                                        New Staff Announcement!
                                    </h1>
                                    <Button className="border-0! text-primary! hover:text-red-500!">
                                        <DeleteOutlined className="text-xl" />
                                    </Button>
                                </Flex>
                            }
                            description={
                                <p className="w-80 text-xs">
                                    We would like to warmly welcome La Min, who
                                    will be taking on the role of Nail Artist at
                                    our shop starting today.
                                </p>
                            }
                        />
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Notifications;
