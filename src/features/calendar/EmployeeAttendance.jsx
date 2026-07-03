import { Avatar, Card, Flex, Space, Typography } from "antd";

const EmployeeAttendance = () => {
    return (
        <Card className="w-full rounded-2xl! border-2! border-primary! mt-5!">
            <div className="border-b border-b-black p-4">
                <Flex justify="space-between">
                    <Space vertical size="small">
                        <Typography.Title
                            level={4}
                            className="font-medium! text-center! m-0!"
                        >
                            Today's Staffs (June 24)
                        </Typography.Title>
                    </Space>
                </Flex>

                <section className="mt-5 space-y-4">
                    <div className="border-2 border-primary rounded-2xl px-5 py-2">
                        <Flex vertical>
                            <div className="flex items-center justify-between">
                                <Space size="small">
                                    <Avatar
                                        src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                        size={40}
                                    />

                                    <div>
                                        <h1 className="lg:text-xl! font-semibold! md:text-md">
                                            Myo Myo
                                        </h1>
                                        <p className="text-sm mb-2">
                                            Nail Artist
                                        </p>
                                    </div>
                                </Space>
                                <div className="w-3 h-3 rounded-full bg-green-300 border-green-500 border" />
                            </div>
                        </Flex>
                    </div>
                </section>
            </div>

            <div className="border-b border-b-black p-4">
                <Flex justify="space-between">
                    <Space vertical size="small">
                        <Typography.Title
                            level={4}
                            className="font-medium! text-center! m-0!"
                        >
                            Day Off (June 30)
                        </Typography.Title>
                    </Space>
                </Flex>

                <section className="mt-5 space-y-4">
                    <div className="border-2 border-primary rounded-2xl px-5 py-2">
                        <Flex vertical>
                            <div className="flex items-center justify-between">
                                <Space size="small">
                                    <Avatar
                                        src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                        size={40}
                                    />

                                    <div>
                                        <h1 className="lg:text-xl! font-semibold! md:text-md">
                                            Myo Myo
                                        </h1>
                                        <p className="text-sm mb-2">
                                            Nail Artist
                                        </p>
                                    </div>
                                </Space>
                                <div className="w-3 h-3 rounded-full bg-green-300 border-green-500 border" />
                            </div>
                        </Flex>
                    </div>
                </section>
            </div>

            <div className="p-4">
                <Flex justify="space-between">
                    <Space vertical size="small">
                        <Typography.Title
                            level={4}
                            className="font-medium! text-center! m-0!"
                        >
                            Leave Staff (June 30)
                        </Typography.Title>
                    </Space>
                </Flex>

                <section className="mt-5 space-y-4">
                    <div className="border-2 border-primary rounded-2xl px-5 py-2">
                        <Flex vertical>
                            <div className="flex items-center justify-between">
                                <Space size="small">
                                    <Avatar
                                        src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                        size={40}
                                    />

                                    <div>
                                        <h1 className="lg:text-xl! font-semibold! md:text-md">
                                            Myo Myo
                                        </h1>
                                        <p className="text-sm mb-2">
                                            Nail Artist
                                        </p>
                                    </div>
                                </Space>
                                <div className="w-3 h-3 rounded-full bg-green-300 border-green-500 border" />
                            </div>
                        </Flex>
                    </div>
                </section>
            </div>
        </Card>
    );
};

export default EmployeeAttendance;
