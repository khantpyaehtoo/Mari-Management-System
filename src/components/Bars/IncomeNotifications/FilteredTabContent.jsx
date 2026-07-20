import { DownCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Select, Tabs, Spin, Empty } from "antd";
import { BellRing, PartyPopper, TriangleAlert } from "lucide-react";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isBetween);

export const FilteredTabContent = ({ data = [], type, isLoading }) => {
    const [selectedType, setSelectedType] = useState("all");

    // Dynamic icon and style generator
    const getNotificationIcon = (notiType, metadata) => {
        const bookingStatus = metadata?.bookingStatus?.toUpperCase();

        if (notiType?.toUpperCase() === "PROMOTION") {
            return {
                icon: <PartyPopper size={24} className="text-primary" />,
                bg: "bg-primary-sec",
            };
        }
        if (bookingStatus === "CANCELLED" || bookingStatus === "REJECTED") {
            return {
                icon: <TriangleAlert size={24} className="text-red-500" />,
                bg: "bg-red-50",
            };
        }
        return {
            icon: <BellRing size={24} className="text-primary" />,
            bg: "bg-primary-sec",
        };
    };

    // Filter Logic Memoized for Performance
    const filteredDataByScope = useMemo(() => {
        const filterItem = (timeScope) => {
            return data.filter((item) => {
                const notiDate = dayjs(item.createdAt);

                // Time Filter
                let matchTime = true;
                if (timeScope === "today") matchTime = notiDate.isToday();
                if (timeScope === "week")
                    matchTime = notiDate.isBetween(
                        dayjs().startOf("week"),
                        dayjs().endOf("week"),
                        null,
                        "[]",
                    );
                if (timeScope === "month")
                    matchTime = notiDate.isBetween(
                        dayjs().startOf("month"),
                        dayjs().endOf("month"),
                        null,
                        "[]",
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

        return {
            today: filterItem("today"),
            week: filterItem("week"),
            month: filterItem("month"),
        };
    }, [data, selectedType]);

    const renderCardList = (list) => {
        if (isLoading) {
            return (
                <div className="py-10 text-center">
                    <Spin />
                </div>
            );
        }

        if (list.length === 0) {
            return (
                <Empty
                    description="No notifications"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className="pt-6"
                />
            );
        }

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
                            className={`border-gray-200! shadow-sm! rounded-xl! hover:shadow-md! transition-shadow ${
                                !item.read ? "bg-pink-50/20" : ""
                            }`}
                        >
                            <Flex justify="space-between" align="start">
                                <div
                                    className={`${uiStyle.bg} me-3 rounded-2xl p-3 shrink-0 flex items-center justify-center`}
                                >
                                    {uiStyle.icon}
                                </div>
                                <div className="grow">
                                    <h4 className="text-primary font-semibold text-sm mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed mb-1">
                                        {item.message}
                                    </p>
                                    {item.metadata?.customerName && (
                                        <p className="text-[11px] font-medium text-gray-500">
                                            By: {item.metadata.customerName}
                                        </p>
                                    )}
                                    <small className="text-gray-400 block mt-2 text-[10px]">
                                        {item.createdAt
                                            ? dayjs(item.createdAt).fromNow()
                                            : "N/A"}
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
        {
            key: "today",
            label: "Today",
            children: renderCardList(filteredDataByScope.today),
        },
        {
            key: "week",
            label: "This Week",
            children: renderCardList(filteredDataByScope.week),
        },
        {
            key: "month",
            label: "This Month",
            children: renderCardList(filteredDataByScope.month),
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
                        value={selectedType}
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
