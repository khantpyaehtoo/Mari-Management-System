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
    message,
} from "antd";
import { useEffect } from "react";
import { useCreateCalendarDataMutation } from "./calendarApi";

const CalendarAssignModal = ({ calendarAssignConfig }) => {
    const [form] = Form.useForm();

    const [createCalendarData, { isLoading: isAssigning }] =
        useCreateCalendarDataMutation();

    const {
        optionsStaff,
        setSelectedDates,
        selectedDates,
        setOpenCalForm,
        openCalForm,
        leaveOptions,
    } = calendarAssignConfig;

    useEffect(() => {
        if (openCalForm && selectedDates) {
            const formattedDate = Array.isArray(selectedDates)
                ? selectedDates
                : [selectedDates, selectedDates];

            form.setFieldsValue({ "select-date": formattedDate });
        }
    }, [openCalForm, selectedDates, form]);

    const handleFinish = async (values) => {
        try {
            let startDate = null;
            let endDate = null;
            const selectDate = values["select-date"];

            if (selectDate && Array.isArray(selectDate)) {
                startDate = selectDate[0]
                    ? selectDate[0].format("YYYY-MM-DD")
                    : null;
                endDate = selectDate[1]
                    ? selectDate[1].format("YYYY-MM-DD")
                    : startDate;
            }

            const payload = {
                staffIds: values["staff-member"],
                leaveType: values["leave-type"],
                startDate: startDate,
                endDate: endDate,
                note: values["note"] || "",
            };

            await createCalendarData(payload).unwrap();

            message.success("Leave assigned successfully!");
            setOpenCalForm(false);
            form.resetFields();
            setSelectedDates(null);
        } catch (error) {
            console.error("Failed to assign leave:", error);
            message.error(
                error?.data?.message ||
                    "Failed to assign leave. Please try again.",
            );
        }
    };

    return (
        <Modal
            open={openCalForm}
            onCancel={() => {
                setOpenCalForm(false);
                form.resetFields();
            }}
            title={
                <Typography.Title level={3} className="font-semibold!">
                    Assign Leave
                </Typography.Title>
            }
            footer={null}
            classNames={{
                container: "bg-white-back!",
            }}
            destroyOnHidden={true}
        >
            <Form
                layout="vertical"
                form={form}
                autoComplete="off"
                className="mt-8! space-y-10!"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Staff Member"
                    name="staff-member"
                    rules={[
                        {
                            required: true,
                            message: "Please select at least one staff member!",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select your staff."
                        className="calendar-inputs!"
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

                <Form.Item
                    label="Leave Type"
                    name="leave-type"
                    rules={[
                        {
                            required: true,
                            message: "Please select leave type!",
                        },
                    ]}
                >
                    <Radio.Group
                        block
                        options={leaveOptions}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>

                <Form.Item
                    name="select-date"
                    rules={[{ required: true, message: "Please select date!" }]}
                    label="Date"
                >
                    <DatePicker.RangePicker
                        value={selectedDates}
                        onChange={(dates) => setSelectedDates(dates)}
                        autoFocus
                        // className="w-full calendar-inputs!"

                        className={`w-full calendar-inputs! ${
                            selectedDates &&
                            selectedDates[0] &&
                            (!selectedDates[1] ||
                                selectedDates[0].isSame(
                                    selectedDates[1],
                                    "day",
                                ))
                                ? "single-active-view"
                                : ""
                        }`}
                    />
                </Form.Item>

                <Form.Item label="Note" name="note">
                    <Input.TextArea rows={2} className="calendar-inputs!" />
                </Form.Item>

                <Form.Item className="mb-0!">
                    <Space
                        size="middle"
                        className="flex! justify-end! items-center!"
                    >
                        <Button
                            onClick={() => {
                                setOpenCalForm(false);
                                form.resetFields();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isAssigning}
                        >
                            Assign Leave
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CalendarAssignModal;
