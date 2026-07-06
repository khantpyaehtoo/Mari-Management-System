import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Radio,
    Select,
    Space,
    Typography,
} from "antd";

const CalendarAssignModal = ({ calendarAssignConfig }) => {
    const [form] = Form.useForm();
    const {
        optionsStaff,
        setSelectedDates,
        selectedDates,
        calendarFilterType,
        setCalendarFilterType,
        setOpenCalForm,
        openCalForm,
        leaveOptions,
    } = calendarAssignConfig;

    return (
        <Modal
            open={openCalForm}
            onCancel={() => setOpenCalForm(!openCalForm)}
            title={
                <Typography.Title level={3} className="font-semibold!">
                    Assign Leave
                </Typography.Title>
            }
            footer={null}
            classNames={{
                container: "bg-white-back!",
            }}
            destroyOnHidden
        >
            <Form
                layout="vertical"
                form={form}
                clearOnDestroy
                autoComplete="off"
                className="mt-8!"
            >
                <Form.Item label="Staff Member" name="staff-member">
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select your staff."
                        onChange={(value) => {
                            console.log(`selected ${value}`);
                        }}
                        options={optionsStaff}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.emoji}
                                </span>
                                {`${option.data.label} (${option.data.desc})`}
                            </Space>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Leave Type" name="leave-type">
                    <Radio.Group
                        block
                        options={leaveOptions}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <div
                            style={{
                                marginBottom: "5px",
                            }}
                        >
                            <span className="me-10">
                                {calendarFilterType === "date"
                                    ? "Single Date"
                                    : "Date Range"}
                            </span>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    setCalendarFilterType((prev) =>
                                        prev === "date" ? "range" : "date",
                                    );
                                    setSelectedDates(null);
                                }}
                                className="rounded-2xl! p-3!"
                            >
                                {calendarFilterType === "date"
                                    ? "Switch to Date Range"
                                    : "Switch to Single Date"}
                            </Button>
                        </div>
                    }
                    name="select-date"
                >
                    {calendarFilterType === "range" ? (
                        <DatePicker.RangePicker
                            value={selectedDates}
                            onChange={(dates) => setSelectedDates(dates)}
                            autoFocus
                            className="w-full rounded-xl!"
                        />
                    ) : (
                        <DatePicker
                            value={selectedDates}
                            onChange={(date) => setSelectedDates(date)}
                            autoFocus
                            className="w-full rounded-xl!"
                        />
                    )}
                </Form.Item>

                <Form.Item label="Note">
                    <Input.TextArea
                        rows={2}
                        className="border! border-gray-300! rounded-xl! p-3!"
                    />
                </Form.Item>

                <Form.Item>
                    <Space
                        size="medium"
                        className="flex! justify-end! items-center!"
                    >
                        <Button onClick={() => setOpenCalForm(false)}>
                            Cancel
                        </Button>
                        <Button type="primary">Assgin Leave</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CalendarAssignModal;
