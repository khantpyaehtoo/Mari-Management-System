import { Badge, Calendar, Col, Popover, Row, Space } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useState } from "react";
// import DebounceSelect from "../../components/DebounceSelect";
import dayjs from "dayjs";
import EmployeeAttendance from "./EmployeeAttendance";
import CalendarDetailOverview from "./CalendarDetailOverview";
import CalendarAssignModal from "./CalendarAssignModal";
import { useGetCalendarDataQuery, useGetDailyStaffQuery } from "./calendarApi";
import DebounceSelect from "./DebounceSelect";

const leaveOptions = [
    { label: "DayOff", value: "DAYOFF" },
    { label: "Sick Leave", value: "SICK" },
    { label: "Personal", value: "PERSONAL" },
    { label: "Maternity", value: "MATERNITY" },
];

const CalendarSection = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().format("M"));
    const [selectedUserFilter, setSelectedUserFilter] = useState(null); // { value: id, label: name }
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [activePopoverDate, setActivePopoverDate] = useState(null);
    const [openCalForm, setOpenCalForm] = useState(false);

    // ၁။ Daily Staff List ကို API ကနေ ယူမယ်
    const { data: dailyStaff } = useGetDailyStaffQuery();

    // ၂။ Dropdown မှာ Staff ID ရှိရင် API Parameter ထဲ ထည့်ပို့မယ်
    const staffIdParam = selectedUserFilter?.value || undefined;
    const { data: calendarData = [] } = useGetCalendarDataQuery({
        month: currentMonth,
        staffId: staffIdParam,
    });

    // ၃။ ဒေသတွင်း Debounce Select မှာ ပြပေးဖို့ function
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
            avatar: user.profileImage,
        }));
    };

    // ၄။ Assign Modal ထဲက Select Dropdown မှာ ပြဖို့ တကယ့် API Staff Data ကို Map လုပ်ခြင်း
    const dynamicOptionsStaff = useMemo(() => {
        if (!dailyStaff?.activeStaff) return [];
        return dailyStaff.activeStaff.map((user) => ({
            label: user.name,
            value: user.id, // တကယ့် database staff profile id ဖြစ်သွားပါပြီ
            emoji: "👤",
            desc: user.role || "STAFF",
            avatar: user.profileImage,
        }));
    }, [dailyStaff]);

    // ၅။ Cell တစ်ခုချင်းစီမှာ ပြမယ့် Data Logic
    const dateCellRender = (calendarValue) => {
        const dateStr = calendarValue.format("YYYY-MM-DD");
        const dayData = calendarData.find((item) =>
            item.date.startsWith(dateStr),
        );

        // ဝန်ထမ်း တစ်ယောက်တည်းကို ရွေးထားတဲ့ အခြေအနေ (Individual Mode)
        if (selectedUserFilter) {
            const hasEvents =
                dayData && dayData.events && dayData.events.length > 0;

            return (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "50px",
                        padding: "2px",
                    }}
                >
                    {hasEvents && (
                        <div
                            style={{
                                background: "#FFE3E3",
                                borderRadius: "4px",
                                padding: "4px",
                                borderLeft: "4px solid #FF4D4F",
                            }}
                        >
                            <span className="text-xs font-bold text-red-600 block truncate">
                                🛑 {selectedUserFilter.label}
                            </span>
                            <span className="text-2xs text-gray-500 block">
                                {dayData.events[0]?.leaveType || "Day Off"}
                            </span>
                        </div>
                    )}
                </div>
            );
        }

        // All Staff Mode
        if (!dayData) return null;

        const dayOffCount =
            dayData.events?.filter((e) => e.leaveType === "DAYOFF").length || 0;
        const leaveCount =
            dayData.events?.filter((e) => e.leaveType !== "DAYOFF").length || 0;

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
                        details={dayData.events}
                        selectedDate={calendarValue}
                        setActivePopoverDate={setActivePopoverDate}
                    />
                }
                placement="rightTop"
            >
                <div
                    style={{ width: "100%", height: "100%", minHeight: "50px" }}
                >
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {dayOffCount > 0 && (
                            <li>
                                <Badge
                                    status="warning"
                                    text={
                                        <span className="text-xs">
                                            Day Off: {dayOffCount}
                                        </span>
                                    }
                                />
                            </li>
                        )}
                        {leaveCount > 0 && (
                            <li>
                                <Badge
                                    status="error"
                                    text={
                                        <span className="text-xs">
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
        setOpenCalForm,
        openCalForm,
    };

    const calendarAssignConfig = {
        optionsStaff: dynamicOptionsStaff, // Mock optionsStaff အစား တကယ့် Dynamic Data ကို ပြောင်းထည့်လိုက်ပါသည်
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
                    {/* EmployeeAttendance ထဲမှာ ကိုယ်ပိုင် API ခေါ်ထားပြီးဖြစ်၍ calendarData prop ပို့ထားခြင်းကို ဖြုတ်လိုက်ပါသည် */}
                    <EmployeeAttendance />
                </Col>
                <Col xs={24} md={16} lg={18}>
                    {/* အရင်က vertical ဟုပဲ ရှိနေသောနေရာတွင် direction="vertical" ဟု မှန်ကန်အောင် ပြင်ဆင်ထားပါသည် */}
                    <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        size="middle"
                    >
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
