import { Button, DatePicker, Select, Space } from "antd";
import { cn } from "../../lib/utils";
import { CloseOutlined } from "@ant-design/icons";

const TableHeaderSection = ({
    renderlists,
    options,
    setFilterValue,
    statusCounts,
    dateOptions,
    dateConfig,
}) => {
    const handleChange = (value) => {
        console.log("clicked", value);
        setFilterValue(value || null);
    };

    const {
        calendarFilterType,
        setCalendarFilterType,
        selectedDates,
        setSelectedDates,
    } = dateConfig || {};

    const handleCalendarChange = (value) => {
        setCalendarFilterType(value || null);
    };

    return (
        <div className="flex justify-between items-center p-3">
            <ul className="flex gap-4">
                {renderlists?.map((lists, index) => {
                    const counts = statusCounts?.[lists] || 0;
                    const statusClasses = {
                        "In Progress": "text-progress",
                        Pending: "text-pending",
                        Confirm: "text-confirm",
                        Completed: "text-completed",
                        Available: "text-available",
                        Unavailable: "text-unavailable",
                        Reject: "text-unavailable",
                    };

                    return (
                        <li
                            key={index}
                            className={cn(
                                "font-medium",
                                statusClasses[lists] || "text-gray-500",
                                "hover:underline",
                            )}
                        >
                            {lists} <span>{counts}</span>
                        </li>
                    );
                })}
            </ul>
            <Space>
                {dateOptions && !calendarFilterType ? (
                    <Select
                        allowClear
                        placeholder="Date"
                        style={{ width: 130 }}
                        value={calendarFilterType}
                        onChange={handleCalendarChange}
                        options={dateOptions}
                    />
                ) : (
                    <Space gap={4}>
                        {calendarFilterType === "date" && (
                            <DatePicker
                                value={selectedDates}
                                onChange={(date) => setSelectedDates(date)}
                                autoFocus
                            />
                        )}
                        {calendarFilterType === "range" && (
                            <DatePicker.RangePicker
                                value={selectedDates}
                                onChange={(dates) => setSelectedDates(dates)}
                                autoFocus
                            />
                        )}
                        {calendarFilterType === "month" && (
                            <DatePicker
                                value={selectedDates}
                                onChange={(date) => setSelectedDates(date)}
                                picker="month"
                                autoFocus
                            />
                        )}
                        {dateOptions && calendarFilterType && (
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => {
                                    setCalendarFilterType(null);
                                    setSelectedDates(null);
                                }}
                            />
                        )}
                    </Space>
                )}

                <Select
                    allowClear
                    placeholder="All Status"
                    style={{ width: 130 }}
                    onChange={handleChange}
                    options={options}
                />
            </Space>
        </div>
    );
};

export default TableHeaderSection;
