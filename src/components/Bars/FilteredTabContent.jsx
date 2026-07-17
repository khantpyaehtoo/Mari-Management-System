import { DownCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Select, Space, Tabs } from "antd";
import { BellRing, PartyPopper, TriangleAlert } from "lucide-react";

export const FilteredTabContent = ({ data, type }) => {
    const innerTabItems = [
        {
            key: "today",
            label: "Today",
            children: (
                <Flex vertical gap="12px" className="mt-4">
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            className="border-gray-300! shadow-md! rounded-xl! hover:shadow-md!"
                        >
                            <Flex justify="space-between" align="start">
                                <div className="bg-primary-sec me-5 rounded-2xl p-3">
                                    <BellRing
                                        size={30}
                                        className=" text-primary"
                                    />
                                </div>
                                <Space vertical>
                                    <h1 className="text-primary font-semibold text-lg!">
                                        {item} (Today)
                                    </h1>
                                    <Space vertical>
                                        <p className="text-xs">
                                            We would like to warmly welcome La
                                            Min, who will be taking on the role
                                            of Nail Artist at our shop starting
                                            today.
                                        </p>
                                    </Space>
                                    <small className="text-gray-400">
                                        1 Month ago
                                    </small>
                                </Space>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            ),
        },
        {
            key: "week",
            label: "This Week",
            children: (
                <Flex vertical gap="12px" className="mt-4">
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            className="border-gray-300! shadow-md! rounded-xl! hover:shadow-md!"
                        >
                            <Flex justify="space-between" align="start">
                                <div className="bg-primary-sec me-5 rounded-2xl p-3">
                                    <TriangleAlert
                                        size={30}
                                        className="text-unavailable"
                                    />
                                </div>
                                <Space vertical>
                                    <h1 className="text-primary font-semibold text-lg!">
                                        {item} (This Week)
                                    </h1>
                                    <Space vertical>
                                        <p className="text-xs">
                                            We would like to warmly welcome La
                                            Min, who will be taking on the role
                                            of Nail Artist at our shop starting
                                            today.
                                        </p>
                                    </Space>
                                    <small className="text-gray-400">
                                        1 Month ago
                                    </small>
                                </Space>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            ),
        },
        {
            key: "month",
            label: "This Month",
            children: (
                <Flex vertical gap="12px" className="mt-4">
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            className="border-gray-300! shadow-md! rounded-xl! hover:shadow-md!"
                        >
                            <Flex justify="space-between" align="start">
                                <div className="bg-primary-sec me-5 rounded-2xl p-3">
                                    <PartyPopper
                                        size={30}
                                        className=" text-primary"
                                    />
                                </div>
                                <Space vertical>
                                    <h1 className="text-primary font-semibold text-lg!">
                                        {item} (This Month)
                                    </h1>
                                    <Space vertical>
                                        <p className="text-xs">
                                            We would like to warmly welcome La
                                            Min, who will be taking on the role
                                            of Nail Artist at our shop starting
                                            today.
                                        </p>
                                    </Space>
                                    <small className="text-gray-400">
                                        1 Month ago
                                    </small>
                                </Space>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            ),
        },
    ];

    const selectOptions = [
        { value: "all", label: "All" },
        ...(type === "customers"
            ? [
                  { value: "ordered", label: "Ordered" },
                  { value: "cancel", label: "Cancel" },
                  { value: "review", label: "Review" },
              ]
            : [
                  { value: "started", label: "Started" },
                  { value: "completed", label: "Completed" },
              ]),
    ];

    return (
        <div className="px-4 py-2">
            <Tabs
                defaultActiveKey="today"
                items={innerTabItems}
                className="sub-pill-tabs"
                animated={false}
                tabBarExtraContent={
                    <Select
                        defaultValue="all"
                        className="custom-filter-select w-32"
                        classNames={{
                            popup: { root: "rounded-xl shadow-lg" },
                        }}
                        suffixIcon={
                            <DownCircleOutlined className="text-gray-700 text-base" />
                        }
                        options={selectOptions}
                        onChange={(value) =>
                            console.log("Selected filter:", value)
                        }
                    />
                }
            />
        </div>
    );
};
