import { DatePicker, Select, Space } from "antd";
import { cn } from "../../lib/utils";
import DateTimeFormatter from "../../app/core/functions/DateTimeFormatter";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { useLockedPickerView } from "./hooks/useLockedPickerView";

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

    const { selectedDates, setSelectedDates } = dateConfig || {};

    const {
        datesView,
        calendarClassName,
        handleCalendarChange,
        handlePanelChange,
        handleOpenChange,
    } = useLockedPickerView(selectedDates);

    // side bar options
    const rangePresets = useMemo(
        () => [
            {
                label: "Last 7 Days",
                value: [dayjs().subtract(7, "d"), dayjs()],
            },
            {
                label: "Last 14 Days",
                value: [dayjs().subtract(14, "d"), dayjs()],
            },
            {
                label: "Last 30 Days",
                value: [dayjs().subtract(30, "d"), dayjs()],
            },
            {
                label: "Last 90 Days",
                value: [dayjs().subtract(90, "d"), dayjs()],
            },
        ],
        [],
    );

    // side bar present
    const presets = useMemo(
        () => [
            {
                label: (
                    <span aria-label="Current Time to End of Day">
                        Now ~ EOD
                    </span>
                ),
                value: () => [dayjs(), dayjs().endOf("day")],
            },
            ...rangePresets,
        ],
        [rangePresets],
    );

    // disable future dates
    const disableFutureDates = useCallback((current) => {
        return current && current > dayjs().endOf("day");
    }, []);

    // filter
    const statusClasses = useMemo(
        () => ({
            "In Progress": "text-progress",
            Pending: "text-pending",
            Confirm: "text-confirm",
            Completed: "text-completed",
            Available: "text-available",
            Unavailable: "text-unavailable",
            Reject: "text-unavailable",
        }),
        [],
    );

    return (
        <div className="flex justify-between items-center p-3">
            <ul className="flex gap-4">
                {renderlists?.map((lists, index) => {
                    const counts = statusCounts?.[lists] || 0;

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
                <Space size={4}>
                    <DatePicker.RangePicker
                        placeholder={[<DateTimeFormatter key="start" />, ""]}
                        disabledDate={disableFutureDates}
                        value={selectedDates}
                        onChange={(dates) => setSelectedDates(dates)}
                        className={cn("rounded-xl!", calendarClassName)}
                        classNames={{ popup: "my-custom-rangepicker" }}
                        presets={presets}
                        pickerValue={datesView}
                        onPanelChange={handlePanelChange}
                        onOpenChange={handleOpenChange}
                        onCalendarChange={(dates, strings, info) => {
                            setSelectedDates(dates);
                            handleCalendarChange(dates, strings, info);
                        }}
                    />
                </Space>

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
