import {
    Avatar,
    Button,
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
import { UploadOutlined } from "@ant-design/icons";
import { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";

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
    return (
        <>
            <Flex justify="space-between" items="center" className="w-full">
                <SubHeaderSection
                    title="Staff Schedule and Calendar"
                    subTitle="Manage staff shifts, salon operating days, leaves, and time-off requests."
                    // handleCreateAttendance={handleCreateAttendance}
                />
                <Space>
                    <DebounceSelect
                        mode="multiple"
                        value={value}
                        placeholder="Select users"
                        fetchOptions={fetchUserList}
                        style={{ width: "400px" }}
                        onChange={(newValue) => {
                            if (Array.isArray(newValue)) {
                                setValue(newValue);
                            }
                        }}
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<UploadOutlined />}
                    >
                        Assign Leave
                    </Button>
                </Space>
            </Flex>

            <Row gutter={12}>
                <Col lg={6}>
                    <Card className="w-full rounded-2xl! border-2! border-primary! mt-5!">
                        <Flex justify="space-between">
                            <Space vertical size="small">
                                <Typography.Title
                                    level={4}
                                    className="font-medium! text-center! m-0!"
                                >
                                    Today's Staffs (June 24)
                                </Typography.Title>
                            </Space>
                        </Flex>

                        <section className="mt-5">
                            <div className="border-2! border-primary! rounded-2xl! px-10! py-5! mb-3">
                                <Flex vertical>
                                    <div className="flex items-center justify-between mb-2">
                                        <h1 className="text-2xl! font-medium!">
                                            Myo Myo
                                        </h1>
                                        <p className="text-end">10:00 AM</p>
                                    </div>
                                    <p className="text-sm mb-2">
                                        Gel Manicure + Nail Art
                                    </p>
                                </Flex>
                            </div>
                        </section>
                    </Card>
                </Col>
                <Col lg={18}>
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
                                boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
                            },
                            body: {
                                background: "#FFFAF6",
                                padding: "20px",
                                border: "2px solid #FBB1BD",
                                borderRadius: "0 0 20px 20px",
                                boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
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
                </Col>
            </Row>
        </>
    );
};

export default CalendarSection;
