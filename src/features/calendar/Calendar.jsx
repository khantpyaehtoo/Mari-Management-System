import {
    Avatar,
    Badge,
    Calendar,
    Col,
    Popover,
    Row,
    Select,
    Space,
    Spin,
} from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useRef, useState, useEffect } from "react";
import { debounce } from "lodash";
import dayjs from "dayjs";
import EmployeeAttendance from "./EmployeeAttendance";
import CalendarDetailOverview from "./CalendarDetailOverview";
import CalendarAssignModal from "./CalendarAssignModal";
import { useGetCalendarDataQuery, useGetDailyStaffQuery } from "./calendarApi";

const leaveOptions = [
    { label: "DayOff", value: "DayOff" },
    { label: "Sick Leave", value: "Sick Leave" },
    { label: "Personal", value: "Personal" },
    { label: "Maternity", value: "Maternity" },
];

const optionsStaff = [
    { label: "Happy", value: "happy", emoji: "😄", desc: "Feeling Good" },
    { label: "Sad", value: "sad", emoji: "😢", desc: "Feeling Blue" },
    { label: "Angry", value: "angry", emoji: "😡", desc: "Furious" },
    { label: "Cool", value: "cool", emoji: "😎", desc: "Chilling" },
    { label: "Sleepy", value: "sleepy", emoji: "😴", desc: "Need Sleep" },
];

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);

    const isMounted = useRef(true);
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value)
                .then((newOptions) => {
                    if (!isMounted.current || fetchId !== fetchRef.current)
                        return;
                    setOptions(newOptions);
                    setFetching(false);
                })
                .catch(() => {
                    if (isMounted.current) setFetching(false);
                });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            labelInValue
            showSearch
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={
                fetching ? <Spin size="small" /> : "No results found"
            }
            {...props}
            options={options}
            optionRender={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    {option.data?.avatar && (
                        <Avatar
                            src={option.data.avatar}
                            style={{ marginInlineEnd: 8 }}
                        />
                    )}
                    {option.label}
                </div>
            )}
        />
    );
}

async function fetchUserList(username) {
    try {
        const res = await fetch(
            `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?search=${username}`,
        );
        const data = await res.json();
        const results = Array.isArray(data) ? data : [];
        return results.map((user) => ({
            label: user.name,
            value: user.id,
            avatar: user.avatar,
        }));
    } catch (error) {
        console.error("fetch mock data failed", error);
        return [];
    }
}

const getListData = (calendarValue, apiData = []) => {
    const dateStr = calendarValue.format("YYYY-MM-DD");
    const dayData = apiData.find((item) => item.date === dateStr);

    if (!dayData) return [];

    return [
        {
            type: "warning",
            title: "Day Off",
            content: String(dayData.day_off_count || 0),
        },
        {
            type: "success",
            title: "Active Staff",
            content: String(dayData.active_count || 0),
        },
        {
            type: "error",
            title: "Leave",
            content: String(dayData.leave_count || 0),
        },
    ];
};

const CalendarSection = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().format("MM"));
    const [currentYear, setCurrentYear] = useState(dayjs().format("YYYY"));
    const [selectedUserFilter, setSelectedUserFilter] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [activePopoverDate, setActivePopoverDate] = useState(null);
    const [openCalForm, setOpenCalForm] = useState(false);

    const { data: dailyStaff } = useGetDailyStaffQuery();
    const { data: calendarData = [] } = useGetCalendarDataQuery();

    const dateCellRender = (calendarValue) => {
        const dateStr = calendarValue.format("YYYY-MM-DD");
        const listData = getListData(calendarValue, calendarData);
        const dayData = calendarData.find((item) => item.date === dateStr);
        const currentDetails = dayData ? dayData.details : [];
        const isPopoverOpen = activePopoverDate === dateStr;

        return (
            <Popover
                trigger="click"
                open={isPopoverOpen}
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
                        details={currentDetails}
                        selectedDate={calendarValue}
                        setActivePopoverDate={setActivePopoverDate}
                    />
                }
                placement="rightTop"
                classNames={{ root: "calendar-popover" }}
            >
                <div
                    style={{ width: "100%", height: "100%", minHeight: "50px" }}
                >
                    <ul
                        className="events"
                        style={{ listStyle: "none", padding: 0, margin: 0 }}
                    >
                        {listData.map(
                            (item, index) =>
                                item.content !== "0" && (
                                    <li key={index}>
                                        <Badge
                                            status={item.type}
                                            text={
                                                <span className="text-xs font-medium text-gray-600">
                                                    {item.title}: {item.content}
                                                </span>
                                            }
                                        />
                                    </li>
                                ),
                        )}
                    </ul>
                </div>
            </Popover>
        );
    };

    const CalendarConfig = {
        DebounceSelect,
        fetchUserList,
        value: selectedUserFilter,
        setValue: setSelectedUserFilter,
        setOpenCalForm,
        openCalForm,
    };

    const calendarAssignConfig = {
        optionsStaff,
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
                    <EmployeeAttendance calendarData={calendarData} />
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
                                setCurrentMonth(date.format("MM"));
                                setCurrentYear(date.format("YYYY"));
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
