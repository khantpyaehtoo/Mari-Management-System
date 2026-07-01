import {
    Avatar,
    Button,
    Calendar,
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
                <Col
                    lg={6}
                    className="w-full p-5! rounded-2xl mt-5 broder-2! border-black bg-indigo-600! space-y-5!"
                >
                    <Typography.Title level={4} className="text-center!">
                        Staff Today (June, 30)
                    </Typography.Title>
                    <Flex
                        justify="space-between"
                        items="center"
                        className="border-2! border-primary! rounded-2xl! px-10! py-2!"
                    >
                        <Space size="middle">
                            <Avatar
                                src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                size={40}
                            />
                            <Space size="small" vertical>
                                <h1 className="text-lg! font-medium!">
                                    Myo Myo
                                </h1>
                                <p className="text-sm!">Nail Artist</p>
                            </Space>
                        </Space>
                        <div className="w-5 h-5 bg-green-500 rounded-full" />
                    </Flex>
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
