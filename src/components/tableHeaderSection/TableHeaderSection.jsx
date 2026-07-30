import { DatePicker, Select, Space } from "antd";
import { cn } from "../../lib/utils";
import dayjs from "dayjs";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";

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

    // Scroll Logic
    const tabsRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const el = tabsRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateScrollState();
        const el = tabsRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);
        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [updateScrollState, renderlists]);

    const scrollByAmount = (dir) => {
        const el = tabsRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 150, behavior: "smooth" });
    };

    const presets = useMemo(
        () => [
            {
                label: "Today",
                value: () => [dayjs().startOf("day"), dayjs().endOf("day")],
            },
            {
                label: "Last 7 Days",
                value: () => [
                    dayjs().subtract(7, "d").startOf("day"),
                    dayjs().endOf("day"),
                ],
            },
            {
                label: "Last 14 Days",
                value: () => [
                    dayjs().subtract(14, "d").startOf("day"),
                    dayjs().endOf("day"),
                ],
            },
            {
                label: "Last 30 Days",
                value: () => [
                    dayjs().subtract(30, "d").startOf("day"),
                    dayjs().endOf("day"),
                ],
            },
            {
                label: "Last 90 Days",
                value: () => [
                    dayjs().subtract(90, "d").startOf("day"),
                    dayjs().endOf("day"),
                ],
            },
        ],
        [],
    );

    // const disableFutureDates = (current) =>
    //     current && current > dayjs().endOf("day");

    const statusClasses = useMemo(
        () => ({
            "In Progress": "text-progress",
            Pending: "text-pending",
            Confirm: "text-confirm",
            Available: "text-available",
            Completed: "text-available",
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
            <div className="relative flex items-center min-w-0 md:max-w-[55%]">
                {canScrollLeft && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount(-1)}
                        className="absolute left-0 z-10 flex h-full items-center bg-linear-to-r from-white via-white/90 to-transparent pr-3"
                    >
                        <ChevronLeft size={16} className="text-gray-400" />
                    </button>
                )}

                <ul
                    ref={tabsRef}
                    className="flex gap-4 overflow-x-auto whitespace-nowrap pb-1 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0 scrollbar-none scroll-smooth"
                >
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

                {canScrollRight && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount(1)}
                        className="absolute right-0 z-10 flex h-full items-center bg-linear-to-l from-white via-white/90 to-transparent pl-3"
                    >
                        <ChevronRight size={16} className="text-gray-400" />
                    </button>
                )}
            </div>

            {/* Select & Date Picker */}
            <Space horizontal="true" className="w-full md:w-auto">
                {!!setSelectedDates && (
                    <Space size={4} className="w-full sm:w-auto">
                        <DatePicker.RangePicker
                            separator={<ChevronsRight size={16} />}
                            // maxDate={dayjs()}
                            // disabledDate={disableFutureDates}
                            value={selectedDates}
                            onChange={(dates) => setSelectedDates(dates)}
                            className={cn(
                                "rounded-lg! border border-gray-300! w-70",
                                calendarClassName,
                            )}
                            classNames={{ popup: "my-custom-rangepicker" }}
                            presets={presets}
                            defaultPickerValue={pValue}
                            onPickerValueChange={(_, info) => {
                                if (
                                    !selectedDates ||
                                    selectedDates.length === 0 ||
                                    !selectedDates[0]
                                )
                                    return;

                                switch (info.range) {
                                    case "start":
                                        if (selectedDates[0])
                                            setPValue(selectedDates[0]);
                                        break;
                                    case "end":
                                        if (selectedDates[1])
                                            setPValue(selectedDates[1]);
                                        break;
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
