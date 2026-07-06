import { DownCircleOutlined } from "@ant-design/icons";
import { Flex, Select, Tabs, Typography } from "antd";

export const FilteredTabContent = ({ data }) => {
    const innerTabItems = [
        {
            key: "today",
            label: "Today",
            children: (
                <Flex vertical gap="12px" className="mt-4">
                    {data.map((item, index) => (
                        <Typography.Title
                            level={5}
                            key={index}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                            {item} (Today)
                        </Typography.Title>
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
                        <Typography.Title
                            level={5}
                            key={index}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                            {item} (This Week)
                        </Typography.Title>
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
                        <Typography.Title
                            level={5}
                            key={index}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                            {item} (This Month)
                        </Typography.Title>
                    ))}
                </Flex>
            ),
        },
    ];

    return (
        <div className="px-4 py-2">
            <div className="absolute right-4 top-2 z-10 w-32">
                <Select
                    defaultValue="all"
                    className="w-full custom-filter-select"
                    classNames={{
                        popup: { root: "rounded-xl shadow-lg" },
                    }}
                    suffixIcon={
                        <DownCircleOutlined className="text-gray-700 text-base" />
                    }
                    options={[
                        { value: "all", label: "All" },
                        { value: "staff", label: "Staff" },
                        { value: "customer", label: "Customer" },
                    ]}
                    onChange={(value) => console.log("Selected filter:", value)}
                />
            </div>
            <Tabs
                defaultActiveKey="today"
                items={innerTabItems}
                className="sub-pill-tabs"
                animated={false}
            />
        </div>
    );
};
