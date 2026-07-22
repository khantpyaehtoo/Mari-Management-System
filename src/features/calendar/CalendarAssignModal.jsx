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
import { useEffect, useMemo } from "react";
import { useCreateCalendarDataMutation } from "./calendarApi";
import { cn } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notifications/notiSlice";

const CalendarAssignModal = ({ calendarAssignConfig }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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
            let startDateFormatted = null;
            let endDateFormatted = null;
            const selectDate = values["select-date"];

            // if (selectDate && Array.isArray(selectDate)) {
            //     //  toISOString()
            //     startDateFormatted = selectDate[0]
            //         ? selectDate[0].startOf("day").toISOString()
            //         : null;

            //     if (selectDate[1]) {
            //         endDateFormatted = selectDate[1].endOf("day").toISOString();
            //     }
            // }

            if (selectDate && Array.isArray(selectDate)) {
                startDateFormatted = selectDate[0]
                    ? selectDate[0].format("YYYY-MM-DDT00:00:00.000[Z]")
                    : null;

                if (selectDate[1]) {
                    endDateFormatted = selectDate[1].format(
                        "YYYY-MM-DDT23:59:59.000[Z]",
                    );
                }
            }

            const payload = {
                staffProfileId: Number(values["staff-member"]),
                leaveType: values["leave-type"],
                startDate: startDateFormatted,
                ...(endDateFormatted && { endDate: endDateFormatted }),
                note: values["note"] || "",
            };

            await createCalendarData(payload).unwrap();

            dispatch(
                setMessage({
                    msgType: "success",
                    msgContent: "Leave assigned successfully!",
                }),
            );
            setOpenCalForm(false);
            form.resetFields();
            setSelectedDates(null);
        } catch (error) {
            console.error("Failed to assign leave:", error);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: "Failed to assign leave. Please try again.",
                }),
            );
        }
    };

    const calendarClassName = useMemo(() => {
        const hasStartDate = selectedDates && selectedDates[0];
        const hasNoEndDate = !selectedDates || !selectedDates[1];
        const isSameDay =
            hasStartDate &&
            selectedDates[1] &&
            selectedDates[0].isSame(selectedDates[1], "day");

        if (hasStartDate && (hasNoEndDate || isSameDay)) {
            return "single-active-view";
        }
        return "";
    }, [selectedDates]);

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
                            message: "Please select a staff member!",
                        },
                    ]}
                >
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Please select a staff."
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
                        autoFocus={false}
                        className={cn(
                            "w-full calendar-inputs!",
                            calendarClassName,
                        )}
                        classNames={{ popup: "my-custom-rangepicker" }}
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
