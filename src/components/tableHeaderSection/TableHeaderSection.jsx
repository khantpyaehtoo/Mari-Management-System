import { Button, DatePicker, Select, Space } from "antd";
import { cn } from "../../lib/utils";
import { CloseOutlined } from "@ant-design/icons";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";

const TableHeaderSection = ({
    renderlists,
    options,
    setFilterValue,
    statusCounts,
    dateConfig,
}) => {
    const handleChange = (value) => {
        console.log("clicked", value);
        if (value === "All" || !value) {
            setFilterValue(null);
        } else {
            setFilterValue(value);
        }
    };

    const {
        calendarFilterType,
        setCalendarFilterType,
        selectedDates,
        setSelectedDates,
        dateOptions,
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
                            onClick={() => handleChange(lists)}
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
                        placeholder={<DateTimeFormatter />}
                        style={{ width: 200, borderRadius: 10 }}
                        value={calendarFilterType}
                        onChange={handleCalendarChange}
                        options={dateOptions}
                        classNames={{
                            popup: "my-custom-popup",
                        }}
                    />
                ) : (
                    <Space size={4}>
                        {calendarFilterType === "date" && (
                            <DatePicker
                                value={selectedDates}
                                onChange={(date) => setSelectedDates(date)}
                                autoFocus
                                className="rounded-xl!"
                            />
                        )}
                        {calendarFilterType === "range" && (
                            <DatePicker.RangePicker
                                value={selectedDates}
                                onChange={(dates) => setSelectedDates(dates)}
                                autoFocus
                                className="rounded-xl!"
                            />
                        )}
                        {calendarFilterType === "month" && (
                            <DatePicker
                                value={selectedDates}
                                onChange={(date) => setSelectedDates(date)}
                                picker="month"
                                autoFocus
                                className="rounded-xl!"
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

                {!!options && (
                    <Select
                        allowClear
                        placeholder="All Status"
                        style={{ width: 130 }}
                        onChange={handleChange}
                        options={options}
                    />
                )}
            </Space>
        </div>
    );
};

export default TableHeaderSection;
