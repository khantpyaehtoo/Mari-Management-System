import { Badge, Calendar, Col, Popover, Row, Space } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import EmployeeAttendance from "./EmployeeAttendance";
import CalendarDetailOverview from "./CalendarDetailOverview";
import CalendarAssignModal from "./CalendarAssignModal";
import { useGetCalendarDataQuery, useGetDailyStaffQuery } from "./calendarApi";
import DebounceSelect from "./DebounceSelect";
import { getImageUrl } from "../../app/core/functions/getImageUrl";

const leaveOptions = [
    { label: "DayOff", value: "DAY_OFF" },
    { label: "Sick Leave", value: "SICK_LEAVE" },
    { label: "Personal", value: "PERSONAL" },
    { label: "Maternity", value: "MATERNITY" },
];

const CalendarSection = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().format("M"));
    const [selectedUserFilter, setSelectedUserFilter] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [activePopoverDate, setActivePopoverDate] = useState(null);
    const [openCalForm, setOpenCalForm] = useState(false);

    const { data: dailyStaff } = useGetDailyStaffQuery();

    const staffIdParam = selectedUserFilter?.value || undefined;
    const { data: calendarData = [] } = useGetCalendarDataQuery({
        month: currentMonth,
        staffId: staffIdParam,
    });

    const todayStr = dayjs().format("YYYY-MM-DD");

    // Get activeStaff safely from API Response structure
    const activeStaffList = useMemo(() => {
        if (!dailyStaff) return [];

        // If activeStaff is directly inside dailyStaff
        if (Array.isArray(dailyStaff.activeStaff)) {
            return dailyStaff.activeStaff;
        }

        // If inside dailyStatuses -> "YYYY-MM-DD" -> activeStaff
        if (dailyStaff.dailyStatuses) {
            // Get today's object or first available date object
            const dateKey = Object.keys(dailyStaff.dailyStatuses)[0];
            if (dateKey && dailyStaff.dailyStatuses[dateKey]?.activeStaff) {
                return dailyStaff.dailyStatuses[dateKey].activeStaff;
            }
        }

        return [];
    }, [dailyStaff]);

    // Get today's events safely
    const todayEvents = useMemo(() => {
        const todayData = calendarData.find(
            (item) => dayjs(item.date).format("YYYY-MM-DD") === todayStr,
        );
        return todayData?.events || [];
    }, [calendarData, todayStr]);

    const unavailableStaffIds = useMemo(() => {
        return todayEvents.map((e) => e.staffProfileId || e.staffId || e.id);
    }, [todayEvents]);

    // Active Staff Calculation after removing leave/dayoff staff
    const actualActiveStaff = useMemo(() => {
        if (!activeStaffList.length) return [];
        return activeStaffList.filter(
            (staff) => !unavailableStaffIds.includes(staff.id),
        );
    }, [activeStaffList, unavailableStaffIds]);

    const handleFetchUserList = async (searchText) => {
        if (!activeStaffList.length) return [];

        const filtered = searchText
            ? activeStaffList.filter((u) =>
                  u.name.toLowerCase().includes(searchText.toLowerCase()),
              )
            : activeStaffList;

        return filtered.map((user) => ({
            label: user.name,
            value: user.id,
            avatar: getImageUrl(user.profileImage),
        }));
    };

    const dynamicOptionsStaff = useMemo(() => {
        if (!activeStaffList.length) return [];
        return activeStaffList.map((user) => ({
            label: user.name,
            value: user.id,
            desc: user.role || "STAFF",
            avatar: getImageUrl(user.profileImage),
        }));
    }, [activeStaffList]);

    const handleFilterChange = (val) => {
        setSelectedUserFilter(val || null);
    };

    // Calendar Cell Render Logic
    const dateCellRender = (calendarValue) => {
        const dateStr = calendarValue.format("YYYY-MM-DD");
        const dayData = calendarData.find(
            (item) => dayjs(item.date).format("YYYY-MM-DD") === dateStr,
        );

        const totalStaffCount = activeStaffList.length || 0;

        // Individual Staff Filter Mode
        if (selectedUserFilter) {
            const hasEvents =
                dayData && dayData.events && dayData.events.length > 0;

            return (
                <div className="w-full h-full min-h-10 p-1">
                    {hasEvents && (
                        <div className="bg-red-50 rounded-md p-2 border-l-4 border-red-400">
                            <span className="text-xs font-semibold text-red-600 block truncate">
                                {selectedUserFilter.label}
                            </span>
                            <small className="text-gray-500 block text-[10px]">
                                {dayData.events[0]?.leaveType || "Day Off"}
                            </small>
                        </div>
                    )}
                </div>
            );
        }

        // All Staff Mode
        const events = dayData?.events || [];

        const dayOffCount = events.filter(
            (e) => e.leaveType === "DAY_OFF" || e.leaveType === "DAYOFF",
        ).length;

        const leaveCount = events.filter(
            (e) => e.leaveType !== "DAY_OFF" && e.leaveType !== "DAYOFF",
        ).length;

        const activeCount = Math.max(
            0,
            totalStaffCount - (dayOffCount + leaveCount),
        );

        return (
            <Popover
                trigger="click"
                open={activePopoverDate === dateStr}
                onOpenChange={(visible) => {
                    if (visible) {
                        setActivePopoverDate(dateStr);
                        setSelectedDate(calendarValue);
                    } else {
                        setActivePopoverDate(null);
                    }
                }}
                content={
                    <CalendarDetailOverview
                        details={events}
                        selectedDate={calendarValue}
                        setActivePopoverDate={setActivePopoverDate}
                    />
                }
                placement="rightTop"
            >
                <div className="w-full h-full min-h-12.5 p-1 cursor-pointer">
                    <ul className="list-none p-0 m-0 space-y-0.5">
                        {totalStaffCount > 0 && (
                            <li>
                                <Badge
                                    status="success"
                                    text={
                                        <div className="inline-flex gap-2">
                                            <span className="text-xs font-medium text-green-600 md:hidden lg:block">
                                                Active:
                                            </span>
                                            <span className="text-xs font-medium text-green-600">
                                                {activeCount}
                                            </span>
                                        </div>
                                    }
                                />
                            </li>
                        )}

                        {dayOffCount > 0 && (
                            <li>
                                <Badge
                                    status="warning"
                                    text={
                                        <div className="inline-flex justify-around gap-2 text-center">
                                            <span className="text-xs font-medium text-amber-600 md:hidden lg:block">
                                                Day Off:{"  "}
                                            </span>
                                            <span className="text-xs font-medium text-amber-600">
                                                {dayOffCount}
                                            </span>
                                        </div>
                                    }
                                />
                            </li>
                        )}

                        {leaveCount > 0 && (
                            <li>
                                <Badge
                                    status="error"
                                    text={
                                        <div className="inline-flex justify-around gap-2 text-center ">
                                            <span className="text-xs font-medium text-red-600 md:hidden lg:block">
                                                Leave:{"  "}
                                            </span>
                                            <span className="text-xs font-medium text-red-600">
                                                {leaveCount}
                                            </span>
                                        </div>
                                    }
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </Popover>
        );
    };

    const CalendarConfig = {
        DebounceSelect,
        fetchUserList: handleFetchUserList,
        value: selectedUserFilter,
        setValue: setSelectedUserFilter,
        onChange: handleFilterChange,
        setOpenCalForm,
        options: dynamicOptionsStaff,
    };

    const calendarAssignConfig = {
        optionsStaff: dynamicOptionsStaff,
        setSelectedDates: setSelectedDate,
        selectedDates: selectedDate,
        setOpenCalForm,
        openCalForm,
        leaveOptions,
    };

    return (
        <div className="space-y-4">
            <SubHeaderSection
                title="Staff Schedule and Calendar"
                subTitle="Manage staff shifts, salon operating days, leaves, and time-off requests."
                CalendarConfig={CalendarConfig}
            />

            <Row gutter={[20, 20]}>
                <Col xs={24} md={8} lg={6}>
                    <EmployeeAttendance
                        activeStaff={actualActiveStaff}
                        todayEvents={todayEvents}
                    />
                </Col>
                <Col xs={24} md={16} lg={18}>
                    <Space vertical style={{ width: "100%" }} size="middle">
                        <Calendar
                            cellRender={dateCellRender}
                            className="custom-calendar shadow-sm rounded-2xl"
                            onChange={(date) => {
                                if (date.format("M") !== currentMonth) {
                                    setCurrentMonth(date.format("M"));
                                }
                            }}
                            styles={{
                                root: {
                                    borderRadius: "20px",
                                },
                                header: {
                                    background: "#FBB1BD",
                                    padding: "16px 20px",
                                    borderRadius: "20px 20px 0 0",
                                },
                                body: {
                                    background: "#FFFAF6",
                                    padding: "16px",
                                    border: "2px solid #FBB1BD",
                                    borderRadius: "0 0 20px 20px",
                                },
                            }}
                        />

                        <CalendarAssignModal
                            calendarAssignConfig={calendarAssignConfig}
                        />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default CalendarSection;
