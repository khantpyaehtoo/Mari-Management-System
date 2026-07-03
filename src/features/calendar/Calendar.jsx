import {
    Avatar,
    Calendar,
    Card,
    Col,
    Flex,
    Row,
    Select,
    Space,
    Spin,
    Typography,
} from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import EmployeeAttendance from "./EmployeeAttendance";
import { callback } from "chart.js/helpers";

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

    const CalendarConfig = {
        DebounceSelect: DebounceSelect,
        fetchUserList: fetchUserList,
        value: value,
        setValue: setValue,
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

                        {/* This is for click event when user clicked one date it'll shows information about that date */}
                        <Card className="w-full rounded-2xl! border-2! border-primary! mt-5!">
                            <div className="p-4">
                                <Flex justify="space-between">
                                    <Space vertical size="small">
                                        <Typography.Title
                                            level={4}
                                            className="font-medium! text-center! m-0!"
                                        >
                                            Tuesday, 30 June
                                        </Typography.Title>
                                    </Space>
                                </Flex>

                                <section className="mt-5 space-y-4">
                                    <div className="border-2 border-primary rounded-2xl px-5 py-2">
                                        <Flex vertical>
                                            <div className="flex items-center justify-between">
                                                <Space size="small">
                                                    <Avatar
                                                        src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                                        size={40}
                                                    />

                                                    <div>
                                                        <h1 className="lg:text-xl! font-semibold! md:text-md">
                                                            Myo Myo
                                                        </h1>
                                                        <p className="text-sm mb-2">
                                                            Nail Artist
                                                        </p>
                                                    </div>
                                                </Space>
                                                <p className="text-pending font-medium">
                                                    Day OFF
                                                </p>
                                            </div>
                                        </Flex>
                                    </div>
                                </section>
                            </div>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default CalendarSection;
