import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";

export const useLockedPickerView = (selectedDates) => {
    const lockedPanels = useMemo(
        () => [dayjs().subtract(1, "month"), dayjs()],
        [],
    );
    const [datesView, setDatesView] = useState(lockedPanels);

    const handleCalendarChange = useCallback(
        (_, __, info) => {
            if (info?.range === "start") {
                setDatesView([...lockedPanels]);
            }
        },
        [lockedPanels],
    );

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

    const handleOpenChange = useCallback(
        (open) => {
            if (open) setDatesView([...lockedPanels]);
        },
        [lockedPanels],
    );

    // Assign Modal single-active-view class Logic
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

    return {
        datesView,
        calendarClassName,
        handleCalendarChange,
        handlePanelChange,
        handleOpenChange,
    };
};
