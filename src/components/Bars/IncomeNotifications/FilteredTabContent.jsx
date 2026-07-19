import { DownCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Select, Tabs, Spin, Empty } from "antd";
import { BellRing, PartyPopper, TriangleAlert } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export const FilteredTabContent = ({ data = [], type, isLoading }) => {
    const [selectedType, setSelectedType] = useState("all");

    // Dynamice icon and style
    const getNotificationIcon = (notiType, metadata) => {
        const bookingStatus = metadata?.bookingStatus?.toUpperCase();

        if (notiType?.toUpperCase() === "PROMOTION") {
            return {
                icon: <PartyPopper size={30} className="text-primary" />,
                bg: "bg-primary-sec",
            };
        }
        if (bookingStatus === "CANCELLED" || bookingStatus === "REJECTED") {
            return {
                icon: <TriangleAlert size={30} className="text-unavailable" />,
                bg: "bg-red-50",
            };
        }
        return {
            icon: <BellRing size={30} className="text-primary" />,
            bg: "bg-primary-sec",
        };
    };

    // (Today, Week, Month) Filter and Dropdown Type
    const getFilteredData = (timeScope) => {
        return data.filter((item) => {
            const notiDate = dayjs(item.createdAt);

            // Time Filter
            let matchTime = true;
            if (timeScope === "today") matchTime = notiDate.isToday();
            if (timeScope === "week")
                matchTime = notiDate.isBetween(
                    dayjs().startOf("week"),
                    dayjs().endOf("week"),
                );
            if (timeScope === "month")
                matchTime = notiDate.isBetween(
                    dayjs().startOf("month"),
                    dayjs().endOf("month"),
                );

            // Dropdown Type Filter
            let matchType = true;
            if (selectedType !== "all") {
                const bookingStatus =
                    item?.metadata?.bookingStatus?.toUpperCase();
                const isReview =
                    item?.title?.toUpperCase()?.includes("REVIEW") ||
                    item?.type?.toUpperCase() === "REVIEW";

                if (selectedType === "cancel")
                    matchType =
                        bookingStatus === "CANCELLED" ||
                        bookingStatus === "REJECTED";
                else if (
                    selectedType === "ordered" ||
                    selectedType === "started"
                )
                    matchType =
                        bookingStatus === "CONFIRMED" ||
                        bookingStatus === "CONFIRM" ||
                        item?.type?.toUpperCase() === "BOOKING";
                else if (selectedType === "completed")
                    matchType = bookingStatus === "COMPLETED";
                else if (selectedType === "review") matchType = isReview;
            }

            return matchTime && matchType;
        });
    };

    const renderCards = (timeScope) => {
        if (isLoading)
            return (
                <div className="py-10 text-center">
                    <Spin />
                </div>
            );

        const list = getFilteredData(timeScope);
        if (list.length === 0)
            return (
                <Empty
                    description="No notifications"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className="pt-6"
                />
            );

        return (
            <Flex
                vertical
                gap="12px"
                className="mt-4 max-h-[calc(100vh-280px)] overflow-y-auto px-1"
            >
                {list.map((item) => {
                    const uiStyle = getNotificationIcon(
                        item.type,
                        item.metadata,
                    );
                    return (
                        <Card
                            key={item.id}
                            className={`border-gray-300! shadow-sm! rounded-xl! hover:shadow-md! transition-shadow ${!item.read ? "bg-pink-50/5" : ""}`}
                        >
                            <Flex justify="space-between" align="start">
                                <div
                                    className={`${uiStyle.bg} me-4 rounded-2xl p-3 shrink-0`}
                                >
                                    {uiStyle.icon}
                                </div>
                                <div className="grow">
                                    <h1 className="text-primary font-semibold text-base mb-1">
                                        {item.title}
                                    </h1>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {item.message}
                                    </p>
                                    {item.metadata?.customerName && (
                                        <p className="text-[11px] font-medium text-gray-500 mt-1">
                                            By: {item.metadata.customerName}
                                        </p>
                                    )}
                                    <small className="text-gray-400 block mt-2">
                                        {item.createdAt
                                            ? dayjs(item.createdAt).fromNow()
                                            : "1 Month ago"}
                                    </small>
                                </div>
                            </Flex>
                        </Card>
                    );
                })}
            </Flex>
        );
    };

    const innerTabItems = [
        { key: "today", label: "Today", children: renderCards("today") },
        { key: "week", label: "This Week", children: renderCards("week") },
        { key: "month", label: "This Month", children: renderCards("month") },
    ];

    // Select Dropdown Configurations
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
                        classNames={{ popup: { root: "rounded-xl shadow-lg" } }}
                        suffixIcon={
                            <DownCircleOutlined className="text-gray-700 text-base" />
                        }
                        options={selectOptions}
                        onChange={(value) => setSelectedType(value)}
                    />
                }
            />
        </div>
    );
};
