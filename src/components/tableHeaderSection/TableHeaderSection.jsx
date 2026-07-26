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

    const disableFutureDates = (current) =>
        current && current > dayjs().endOf("day");

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-3">
            <ul className="flex gap-4 overflow-x-auto whitespace-nowrap pb-1 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0 scrollbar-none">
                {renderlists?.map((listName, index) => {
                    const counts = statusCounts?.[listName] ?? 0;
                    const isActive = activeFilter === listName;

                    return (
                        <li
                            key={index}
                            className={cn(
                                "font-medium cursor-pointer transition-all duration-150 select-none shrink-0",
                                statusClasses[listName] || "text-gray-500",
                                isActive
                                    ? "underline font-semibold font-montserrat opacity-100"
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

            {/* Select & Date Picker */}
            <Space horizontal className="w-full md:w-auto">
                {!!setSelectedDates && (
                    <Space size={4} className="w-full sm:w-auto">
                        <DatePicker.RangePicker
                            separator={<ChevronsRight size={16} />}
                            maxDate={dayjs()}
                            disabledDate={disableFutureDates}
                            value={selectedDates}
                            onChange={(dates) => setSelectedDates(dates)}
                            className={cn(
                                "rounded-lg! border border-gray-300! w-full sm:w-72 md:w-80 lg:w-100",
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
                        className="w-full sm:w-33"
                        onChange={handleChange}
                        options={options}
                    />
                )}
            </Space>
        </div>
    );
};

export default TableHeaderSection;
