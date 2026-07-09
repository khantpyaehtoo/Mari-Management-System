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
        calendarFilterType,
        setCalendarFilterType,
        setOpenCalForm,
        openCalForm,
        leaveOptions,
    } = calendarAssignConfig;

    useEffect(() => {
        if (openCalForm && selectedDates) {
            form.setFieldsValue({
                "select-date": selectedDates,
            });
        }
    }, [openCalForm, selectedDates, form]);

    const handleFinish = async (values) => {
        try {
            let startDate = null;
            let endDate = null;

            if (calendarFilterType === "range" && values["select-date"]) {
                startDate = values["select-date"][0].format("YYYY-MM-DD");
                endDate = values["select-date"][1].format("YYYY-MM-DD");
            } else if (values["select-date"]) {
                startDate = values["select-date"].format("YYYY-MM-DD");
                endDate = startDate;
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
            destroyOnHidden
        >
            <Form
                layout="vertical"
                form={form}
                autoComplete="off"
                className="mt-8!"
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
                    label={
                        <Space size="large">
                            <span>
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
                                    form.setFieldsValue({
                                        "select-date": null,
                                    });
                                    setSelectedDates(null);
                                }}
                                className="rounded-2xl! p-3!"
                            >
                                {calendarFilterType === "date"
                                    ? "Switch to Date Range"
                                    : "Switch to Single Date"}
                            </Button>
                        </Space>
                    }
                >
                    {calendarFilterType === "range" ? (
                        <DatePicker.RangePicker
                            autoFocus
                            className="w-full rounded-xl!"
                        />
                    ) : (
                        <DatePicker autoFocus className="w-full rounded-xl!" />
                    )}
                </Form.Item>

                <Form.Item label="Note" name="note">
                    <Input.TextArea
                        rows={2}
                        className="border! border-gray-300! rounded-xl! p-3!"
                    />
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
