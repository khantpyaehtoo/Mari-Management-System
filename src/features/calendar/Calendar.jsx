import { Badge, Calendar, Col, Popover, Row, Space } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import EmployeeAttendance from "./EmployeeAttendance";
import CalendarDetailOverview from "./CalendarDetailOverview";
import CalendarAssignModal from "./CalendarAssignModal";
import { useGetCalendarDataQuery, useGetDailyStaffQuery } from "./calendarApi";
import DebounceSelect from "./DebounceSelect";
import { getImageUrl } from "../../lib/getImageUrl";

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

    console.log("Daily Staff API Response:", dailyStaff);

    const todayStr = dayjs().format("YYYY-MM-DD");

    const todayEvents = useMemo(() => {
        const todayData = calendarData.find((item) =>
            item.date.startsWith(todayStr),
        );
        return todayData?.events || [];
    }, [calendarData, todayStr]);

    const unavailableStaffIds = useMemo(() => {
        return todayEvents.map((e) => e.staffProfileId || e.staffId || e.id);
    }, [todayEvents]);

    // Active Staff
    const actualActiveStaff = useMemo(() => {
        if (!dailyStaff?.activeStaff) return [];
        return dailyStaff.activeStaff.filter(
            (staff) => !unavailableStaffIds.includes(staff.id),
        );
    }, [dailyStaff, unavailableStaffIds]);

    const handleFetchUserList = async (searchText) => {
        if (!dailyStaff?.activeStaff) return [];
        const list = dailyStaff.activeStaff;

        const filtered = searchText
            ? list.filter((u) =>
                  u.name.toLowerCase().includes(searchText.toLowerCase()),
              )
            : list;

        return filtered.map((user) => ({
            label: user.name,
            value: user.id,
            avatar: getImageUrl(user.profileImage),
        }));
    };

    const dynamicOptionsStaff = useMemo(() => {
        if (!dailyStaff?.activeStaff) return [];
        return dailyStaff.activeStaff.map((user) => ({
            label: user.name,
            value: user.id,
            desc: user.role || "STAFF",
            avatar: getImageUrl(user.profileImage),
        }));
    }, [dailyStaff]);

    const handleFilterChange = (val) => {
        if (!val) {
            setSelectedUserFilter(null);
        } else {
            setSelectedUserFilter(val);
        }
    };

    // Calendar Cell Render Logic
    const dateCellRender = (calendarValue) => {
        const dateStr = calendarValue.format("YYYY-MM-DD");
        const dayData = calendarData.find((item) =>
            item.date.startsWith(dateStr),
        );

        const totalStaffCount = dailyStaff?.activeStaff?.length || 0;

        // (Individual Mode)
        if (selectedUserFilter) {
            const hasEvents =
                dayData && dayData.events && dayData.events.length > 0;

            return (
                <div className="w-full h-full min-h-10 p-2">
                    {hasEvents && (
                        <div className="bg-primary-sec rounded-md p-4 border-l-4 border-red-400">
                            <span className="text-md font-montserrat font-medium text-red-600 block truncate">
                                {selectedUserFilter.label}
                            </span>
                            <small className="text-gray-500 block">
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

        // Active Staff = total Staff - (DayOff + Leave)
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
                <div
                    style={{ width: "100%", height: "100%", minHeight: "50px" }}
                >
                    <ul
                        style={{ listStyle: "none", padding: 0, margin: 0 }}
                        className="space-y-0.5"
                    >
                        {/* Active Staff Count */}
                        {totalStaffCount > 0 && (
                            <li>
                                <Badge
                                    status="success"
                                    text={
                                        <span className="text-xs font-medium text-green-500">
                                            Active: {activeCount}
                                        </span>
                                    }
                                />
                            </li>
                        )}

                        {/* Day Off Count */}
                        {dayOffCount > 0 && (
                            <li>
                                <Badge
                                    status="warning"
                                    text={
                                        <span className="text-xs font-medium text-progress">
                                            Day Off: {dayOffCount}
                                        </span>
                                    }
                                />
                            </li>
                        )}

                        {/* Leave Count */}
                        {leaveCount > 0 && (
                            <li>
                                <Badge
                                    status="error"
                                    text={
                                        <span className="text-xs font-medium text-red-600">
                                            Leave: {leaveCount}
                                        </span>
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
        openCalForm,
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
        <>
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
                            className="custom-calendar"
                            styles={{
                                root: {
                                    borderRadius: "20px",
                                    marginTop: "20px",
                                },
                                header: {
                                    background: "#FBB1BD",
                                    padding: "20px",
                                    borderRadius: "20px 20px 0 0",
                                    boxShadow:
                                        "1px 1px 10px rgba(0, 0, 0, 0.2)",
                                },
                                body: {
                                    background: "#FFFAF6",
                                    padding: "20px",
                                    border: "2px solid #FBB1BD",
                                    borderRadius: "0 0 20px 20px",
                                    boxShadow:
                                        "1px 1px 10px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                            onPanelChange={(date) => {
                                setCurrentMonth(date.format("M"));
                            }}
                        />

                        <CalendarAssignModal
                            calendarAssignConfig={calendarAssignConfig}
                        />
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default CalendarSection;
