import { useState } from "react";
import { Calendar, Popover, Button, Select, Col, Row, Typography } from "antd";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import dayjs from "dayjs";

const CustomCalendarDropdown = ({ value, onChange, width = 350 }) => {
    const [open, setOpen] = useState(false);

    // Current Selected Date from Form
    const selectedDate = value ? dayjs(value) : null;

    // View Panel Date
    const [panelDate, setPanelDate] = useState(selectedDate || dayjs());

    const handleSelect = (date, info) => {
        setPanelDate(date);
        if (!info || info.source === "date") {
            if (onChange) {
                onChange(date.format("YYYY-MM-DD"));
            }
            setOpen(false);
        }
    };

    // const handleSelect = (date, info) => {
    //     setPanelDate(date);
    //     if (!info || info.source === "date") {
    //         if (onChange) {
    //             // ISO String Format (YYYY-MM-DDTHH:mm:ss.sssZ)
    //             onChange(date ? date.toISOString() : null);
    //         }
    //         setOpen(false);
    //     }
    // };

    const customHeaderRender = ({
        value: currentDate,
        onChange: onDateChange,
    }) => {
        const headerDate = currentDate || panelDate;
        const start = 1950;
        const end = 2035;
        const yearOptions = [];

        for (let i = start; i < end; i++) {
            yearOptions.push(
                <Select key={i} value={i}>
                    {i}
                </Select>,
            );
        }

        const monthOptions = [];
        for (let i = 0; i < 12; i++) {
            monthOptions.push(
                <Select key={i} value={i}>
                    {dayjs().month(i).format("MMM")}
                </Select>,
            );
        }

        const currentYear = headerDate.year();
        const currentMonth = headerDate.month();

        const handleHeaderDateChange = (newDate) => {
            setPanelDate(newDate);
            onDateChange(newDate);
        };

        return (
            <div className="p-4 bg-primary rounded-t-xl shadow-md!">
                <Row gutter={8} align="middle" justify="space-between">
                    <Col>
                        <Typography.Text className="font-semibold text-white-back!">
                            Date Of Birth
                        </Typography.Text>
                    </Col>
                    <Col>
                        <Row gutter={4} align="middle">
                            <Col>
                                <Button
                                    type="text"
                                    size="small"
                                    icon={
                                        <ChevronLeft
                                            size={16}
                                            className="text-white!"
                                        />
                                    }
                                    onClick={() =>
                                        handleHeaderDateChange(
                                            headerDate
                                                .clone()
                                                .subtract(1, "month"),
                                        )
                                    }
                                />
                            </Col>

                            <Col>
                                <Select
                                    size="small"
                                    popupMatchSelectWidth={false}
                                    value={currentYear}
                                    onChange={(newYear) => {
                                        const now = headerDate
                                            .clone()
                                            .year(newYear);
                                        handleHeaderDateChange(now);
                                    }}
                                >
                                    {yearOptions}
                                </Select>
                            </Col>

                            <Col>
                                <Select
                                    size="small"
                                    popupMatchSelectWidth={false}
                                    value={currentMonth}
                                    onChange={(newMonth) => {
                                        const now = headerDate
                                            .clone()
                                            .month(newMonth);
                                        handleHeaderDateChange(now);
                                    }}
                                >
                                    {monthOptions}
                                </Select>
                            </Col>

                            <Col>
                                <Button
                                    type="text"
                                    size="small"
                                    icon={
                                        <ChevronRight
                                            size={16}
                                            className="text-white!"
                                        />
                                    }
                                    onClick={() =>
                                        handleHeaderDateChange(
                                            headerDate.clone().add(1, "month"),
                                        )
                                    }
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <Popover
            content={
                <div
                    style={{
                        width: typeof width === "number" ? `${width}px` : width,
                    }}
                    className="bg-white rounded-xl! shadow-lg overflow-hidden"
                >
                    <Calendar
                        fullscreen={false}
                        value={panelDate}
                        onSelect={handleSelect}
                        headerRender={customHeaderRender}
                    />
                </div>
            }
            trigger="click"
            open={open}
            onOpenChange={(visible) => {
                setOpen(visible);
                if (visible) {
                    setPanelDate(selectedDate || dayjs());
                }
            }}
            placement="bottomLeft"
            styles={{
                container: {
                    padding: 0,
                    borderRadius: "12px",
                },
            }}
        >
            <Button
                type="button"
                size="large"
                icon={<CalendarIcon size={16} />}
                className="flex items-center justify-between gap-2 bg-white-back! border-gray-300! hover:border-primary! w-50!"
            >
                {selectedDate
                    ? selectedDate.format("YYYY-MM-DD")
                    : "Select Date"}
            </Button>
        </Popover>
    );
};

export default CustomCalendarDropdown;
