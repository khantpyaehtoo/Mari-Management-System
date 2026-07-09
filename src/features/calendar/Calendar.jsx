import { Avatar, Badge, Calendar, Col, Row, Select, Space, Spin } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import dayjs from "dayjs";
import EmployeeAttendance from "./EmployeeAttendance";
import CalendarDetailOverview from "./CalendarDetailOverview";
import CalendarAssignModal from "./CalendarAssignModal";
// import { useGetCalendarDataQuery } from "./calendarApi";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            labelInValue
            showSearch={{ filterOption: false, onSearch: debounceFetcher }}
            notFoundContent={
                fetching ? <Spin size="small" /> : "No results found"
            }
            {...props}
            options={options}
            optionRender={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    {option.data.avatar && (
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
    console.log("fetching user", username);
    return fetch(
        `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?search=${username}`,
    )
        .then((res) => res.json())
        .then((res) => {
            const results = Array.isArray(res) ? res : [];
            return results.map((user) => ({
                label: user.name,
                value: user.id,
                avatar: user.avatar,
            }));
        })
        .catch(() => {
            console.log("fetch mock data failed");
            return [];
        });
}

const getListData = (calendarValue, apiData = []) => {
    const dateStr = calendarValue.format("YYYY-MM-DD");
    const dayData = apiData.find((item) => item.date === dateStr);

    if (!dayData) return [];

    return [
        { type: "warning", content: String(dayData.day_off_count || 0) }, // Day Off
        { type: "success", content: String(dayData.active_count || 0) }, // Active Staff
        { type: "error", content: String(dayData.leave_count || 0) }, // Leave
    ];
};

const CalendarSection = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().format("MM"));
    const [currentYear, setCurrentYear] = useState(dayjs().format("YYYY"));
    const [selectedUserFilter, setSelectedUserFilter] = useState(null);

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedDayDetails, setSelectedDayDetails] = useState(null);

    const [openCalForm, setOpenCalForm] = useState(false);
    const [calendarFilterType, setCalendarFilterType] = useState("");

    // const { data: calendarData = [], isLoading } = useGetCalendarDataQuery({
    //     month: currentMonth,
    //     year: currentYear,
    //     userId: selectedUserFilter?.value,
    // });

    const calendarData = [
        {
            date: "2026-07-08",
            day_off_count: 2,
            active_count: 8,
            leave_count: 0,
            details: [
                {
                    staff_id: 1,
                    name: "Myo Myo",
                    type: "day_off",
                    role: "Nail Artist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },
            ],
        },
        {
            date: "2026-07-09",
            day_off_count: 1,
            active_count: 3,
            leave_count: 2,
            details: [
                {
                    staff_id: 101,
                    name: "Thaw Thaw",
                    type: "active",
                    role: "Senior Stylist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },
                {
                    staff_id: 102,
                    name: "Aung Aung",
                    type: "active",
                    role: "Nail Artist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },
                {
                    staff_id: 103,
                    name: "Su Su",
                    type: "active",
                    role: "Makeup Artist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },

                {
                    staff_id: 104,
                    name: "Myo Myo",
                    type: "day_off",
                    role: "Nail Artist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },

                {
                    staff_id: 105,
                    name: "Hla Hla",
                    type: "leave",
                    leave_type: "Sick Leave",
                    role: "Hair Specialist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },
                {
                    staff_id: 106,
                    name: "Kyaw Kyaw",
                    type: "leave",
                    leave_type: "Personal Leave",
                    role: "Massager",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },
            ],
        },
        {
            date: "2026-07-10",
            day_off_count: 2,
            active_count: 7,
            leave_count: 1,
            details: [
                {
                    staff_id: 1,
                    name: "Myo Myo",
                    type: "day_off",
                    role: "Nail Artist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },
                {
                    staff_id: 2,
                    name: "Hsu Hsu",
                    type: "leave",
                    leave_type: "Sick Leave",
                    role: "Hair Specialist",
                    avatar: "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg",
                },
            ],
        },
    ];

    const CalendarConfig = {
        DebounceSelect: DebounceSelect,
        fetchUserList: fetchUserList,
        value: selectedUserFilter,
        setValue: setSelectedUserFilter,
        setOpenCalForm: setOpenCalForm,
        openCalForm: openCalForm,
    };

    const leaveOptions = [
        { label: "Holiday", value: "Holiday" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Personal", value: "Personal" },
        { label: "Maternity", value: "Maternity" },
    ];

    const optionsStaff = [
        { label: "Happy", value: "happy", emoji: "😄", desc: "Feeling Good" },
        { label: "Sad", value: "sad", emoji: "😢", desc: "Feeling Blue" },
    ];

    const calendarAssignConfig = {
        optionsStaff: optionsStaff,
        setSelectedDates: setSelectedDate,
        selectedDates: selectedDate,
        calendarFilterType: calendarFilterType,
        setCalendarFilterType: setCalendarFilterType,
        setOpenCalForm: setOpenCalForm,
        openCalForm: openCalForm,
        leaveOptions: leaveOptions,
    };

    const dateCellRender = (calendarValue) => {
        const listData = getListData(calendarValue, calendarData);
        return (
            <ul
                className="events"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
                {listData.map(
                    (item, index) =>
                        item.content !== "0" && (
                            <li key={index}>
                                <Badge status={item.type} text={item.content} />
                            </li>
                        ),
                )}
            </ul>
        );
    };

    const cellRender = (current) => {
        return dateCellRender(current);
    };

    return (
        <>
            <SubHeaderSection
                title="Staff Schedule and Calendar"
                subTitle="Manage staff shifts, salon operating days, leaves, and time-off requests."
                CalendarConfig={CalendarConfig}
            />

            <Row gutter={20}>
                <Col md={8} lg={6}>
                    <EmployeeAttendance calendarData={calendarData} />
                </Col>

                <Col md={16} lg={18}>
                    <Space vertical style={{ width: "100%" }}>
                        <Calendar
                            cellRender={cellRender}
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
                            onSelect={(date, { source }) => {
                                if (source === "date") {
                                    setSelectedDate(date);

                                    const dateStr = date.format("YYYY-MM-DD");
                                    const dayData = calendarData.find(
                                        (item) => item.date === dateStr,
                                    );
                                    setSelectedDayDetails(
                                        dayData ? dayData.details : [],
                                    );
                                    console.log(
                                        "Selected Date Details:",
                                        dayData,
                                    );
                                }
                            }}
                        />

                        <CalendarAssignModal
                            calendarAssignConfig={calendarAssignConfig}
                        />

                        <CalendarDetailOverview
                            details={selectedDayDetails}
                            selectedDate={selectedDate}
                        />
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default CalendarSection;
