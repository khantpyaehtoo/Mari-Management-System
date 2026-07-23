import { DatePicker, Select, Space } from "antd";
import { cn } from "../../lib/utils";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { ChevronsRight } from "lucide-react";

const TableHeaderSection = ({
    renderlists,
    options,
    filterValue = "All",
    setFilterValue,
    statusCounts,
    dateConfig,
}) => {
    const handleChange = (value) => {
        const newValue = value || "All";
        if (setFilterValue) {
            setFilterValue(newValue);
        }
    };

    const { selectedDates, setSelectedDates } = dateConfig || {};
    const [pValue, setPValue] = useState(dayjs().subtract(1, "month"));

    // Side Bar Options
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

    // Disable Future Dates
    const disableFutureDates = (current) => {
        return current && current > dayjs().endOf("day");
    };

    // Filter
    const statusClasses = useMemo(
        () => ({
            "In Progress": "text-progress",
            Pending: "text-pending",
            Confirm: "text-confirm",
            Completed: "text-completed",
            Available: "text-available",
            Unavailable: "text-unavailable",
            Reject: "text-unavailable",
            Terminate: "text-gray-500",
        }),
        [],
    );

    // Single Selected Date
    const calendarClassName = useMemo(() => {
        const hasStartDate = selectedDates?.[0];
        const hasNoEndDate = !selectedDates?.[1];
        const isSameDay =
            hasStartDate &&
            selectedDates[1] &&
            selectedDates[0].isSame(selectedDates[1], "day");

        if (hasStartDate && (hasNoEndDate || isSameDay)) {
            return "single-active-view";
        }
        return "";
    }, [selectedDates]);

    const activeFilter = filterValue || "All";

    return (
        <div className="flex justify-between items-center p-3">
            {/* Tabs List */}
            <ul className="flex gap-4">
                {renderlists?.map((listName, index) => {
                    const counts = statusCounts?.[listName] ?? 0;
                    const isActive = activeFilter === listName;

                    return (
                        <li
                            key={index}
                            className={cn(
                                "font-medium cursor-pointer transition-all duration-150 select-none",
                                statusClasses[listName] || "text-gray-500",
                                isActive
                                    ? "underline font-semibold opacity-100"
                                    : "opacity-70 hover:opacity-100",
                            )}
                            onClick={() => handleChange(listName)}
                        >
                            <span className="md:text-xs">
                                {listName} <span>({counts})</span>
                            </span>
                        </li>
                    );
                })}
            </ul>

            {/* Select & Date Picker controls */}
            <Space horizontal>
                {!!setSelectedDates && (
                    <Space size={4}>
                        <DatePicker.RangePicker
                            separator={<ChevronsRight size={16} />}
                            maxDate={dayjs()}
                            disabledDate={disableFutureDates}
                            value={selectedDates}
                            onChange={(dates) => setSelectedDates(dates)}
                            className={cn(
                                "rounded-lg! border border-gray-300! lg:w-100 md:w-40",
                                calendarClassName,
                            )}
                            classNames={{ popup: "my-custom-rangepicker" }}
                            presets={presets}
                            defaultPickerValue={pValue}
                            onPickerValueChange={(_, info) => {
                                if (!selectedDates?.length) return;

                                switch (info.range) {
                                    case "start":
                                        setPValue(selectedDates[0]);
                                        break;
                                    case "end":
                                        setPValue(selectedDates[1]);
                                }
                            }}
                        />
                    </Space>
                )}

                {!!options && (
                    <Select
                        allowClear
                        placeholder="All Status"
                        value={
                            activeFilter === "All" ? undefined : activeFilter
                        }
                        style={{ width: 140 }}
                        onChange={handleChange}
                        options={options}
                    />
                )}
            </Space>
        </div>
    );
};

export default TableHeaderSection;
