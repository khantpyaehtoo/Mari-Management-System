import { DatePicker, Select, Space } from "antd";
import { cn } from "../../lib/utils";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";

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
    const lockedPanels = useMemo(
        () => [dayjs().subtract(1, "month"), dayjs()],
        [],
    );
    const [datesView, setDatesView] = useState(lockedPanels);

    // // Disable jump into next month
    const handlePanelChange = useCallback(
        (values) => {
            if (!values) {
                setDatesView([...lockedPanels]);
                return;
            }
            const isMovingToFutureMonth = values[1].isAfter(dayjs(), "month");
            setDatesView(isMovingToFutureMonth ? [...lockedPanels] : values);
        },
        [lockedPanels],
    );

    // // => for reset close & handle open
    // const handleOpenChange = (open) => {
    //     if (open) setDatesView([...lockedPanels]);
    // };

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

    // for single selected date
    const calendarClassName = useMemo(() => {
        const hasStartDate = selectedDates && selectedDates[0];
        const hasNoEndDate = !selectedDates || !selectedDates[1];
        const isSameDay =
            hasStartDate &&
            selectedDates[1] &&
            selectedDates[0].isSame(selectedDates[1], "day");

        if (hasStartDate && (hasNoEndDate || isSameDay)) {
            return "single-active-view";
        }
        return "";
    }, [selectedDates]);

    const [pValue, setPValue] = useState(dayjs().subtract(1, "month"));

    // const lockedPanels = [dayjs().subtract(1, "month")];

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
                        // placeholder={[<DateTimeFormatter />]}
                        disabledDate={disableFutureDates}
                        value={selectedDates}
                        onChange={(dates) => setSelectedDates(dates)}
                        className={cn(
                            "rounded-xl! border border-gray-300!",
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
                        // onPanelChange={handlePanelChange}
                        // onOpenChange={handleOpenChange}
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
