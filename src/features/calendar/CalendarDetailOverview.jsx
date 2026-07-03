import { Avatar, Card, Flex, Space, Typography } from "antd";

const CalendarDetailOverview = () => {
    return (
        <Card className="w-full rounded-2xl! border-2! border-primary! mt-5!">
            <div className="p-4">
                <Flex justify="space-between">
                    <Space vertical size="small">
                        <Typography.Title
                            level={4}
                            className="font-medium! text-center! m-0!"
                        >
                            Tuesday, 30 June
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
                                <p className="text-pending font-medium">
                                    Day OFF
                                </p>
                            </div>
                        </Flex>
                    </div>
                </section>
            </div>
        </Card>
    );
};

export default CalendarDetailOverview;
