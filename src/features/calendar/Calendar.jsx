import {
    Avatar,
    Button,
    Calendar,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Radio,
    Row,
    Select,
    Space,
    Spin,
} from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import EmployeeAttendance from "./EmployeeAttendance";
import CalendarDetailOverview from "./CalendarDetailOverview";
import CalendarAssignModal from "./CalendarAssignModal";

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
                    // for fetch callback order
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

const CalendarSection = () => {
    // const onChange = (value) => {
    //     console.log(`selected ${value}`);
    // };
    // const onSearch = (value) => {
    //     console.log("search:", value);
    // };
    const [value, setValue] = useState([]);
    const [openCalForm, setOpenCalForm] = useState(false);
    const [calendarFilterType, setCalendarFilterType] = useState("");
    const [selectedDates, setSelectedDates] = useState(null);

    const [form] = Form.useForm();

    const CalendarConfig = {
        DebounceSelect: DebounceSelect,
        fetchUserList: fetchUserList,
        value: value,
        setValue: setValue,
        setOpenCalForm: setOpenCalForm,
        openCalForm: openCalForm,
    };

    const LeaveOptions = [
        { label: "Holiday", value: "Holiday" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Personal", value: "Personal" },
        { label: "Maternity", value: "Maternity" },
    ];

    const optionsStaff = [
        {
            label: "Happy",
            value: "happy",
            emoji: "😄",
            desc: "Feeling Good",
        },
        {
            label: "Sad",
            value: "sad",
            emoji: "😢",
            desc: "Feeling Blue",
        },
        {
            label: "Angry",
            value: "angry",
            emoji: "😡",
            desc: "Furious",
        },
        {
            label: "Cool",
            value: "cool",
            emoji: "😎",
            desc: "Chilling",
        },
        {
            label: "Sleepy",
            value: "sleepy",
            emoji: "😴",
            desc: "Need Sleep",
        },
    ];

    const calendarAssignConfig = {
        optionsStaff: optionsStaff,
        setSelectedDates: setSelectedDates,
        selectedDates: selectedDates,
        calendarFilterType: calendarFilterType,
        setCalendarFilterType: setCalendarFilterType,
        setOpenCalForm: setOpenCalForm,
        openCalForm: openCalForm,
        LeaveOptions: LeaveOptions,
    };

    return (
        <>
            <SubHeaderSection
                title="Staff Schedule and Calendar"
                subTitle="Manage staff shifts, salon operating days, leaves, and time-off requests."
                CalendarConfig={CalendarConfig}
                // handleCreateAttendance={handleCreateAttendance}
            />

            <Row gutter={20}>
                <Col md={8} lg={6}>
                    <EmployeeAttendance />
                </Col>
                <Col md={16} lg={18}>
                    <Space vertical>
                        <Calendar
                            // cellRender={cellRender}
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
                                item: {
                                    border: "1px solid #FBB1BD",
                                    borderRadius: "10px",
                                },
                            }}
                            onSelect={(date, { source }) => {
                                if (source === "date") {
                                    console.log("Panel Select:", source, date);
                                }
                            }}
                        />

                        <CalendarAssignModal
                            calendarAssignConfig={calendarAssignConfig}
                        />

                        {/* This is for click event when user clicked one date it'll shows information about that date */}
                        <CalendarDetailOverview />
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default CalendarSection;
