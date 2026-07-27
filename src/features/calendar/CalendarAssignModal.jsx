import {
    Avatar,
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
import { User } from "lucide-react";

const CalendarAssignModal = ({ calendarAssignConfig }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [createCalendarData, { isLoading: isAssigning }] =
        useCreateCalendarDataMutation();

    const {
        optionsStaff = [],
        setSelectedDates,
        selectedDates,
        setOpenCalForm,
        openCalForm,
        leaveOptions = [],
    } = calendarAssignConfig || {};

    useEffect(() => {
        if (openCalForm && selectedDates) {
            const formattedDate = Array.isArray(selectedDates)
                ? selectedDates
                : [selectedDates, selectedDates];

            form.setFieldsValue({ "select-date": formattedDate });
        } else if (!openCalForm) {
            form.resetFields();
        }
    }, [openCalForm, selectedDates, form]);

    const handleFinish = async (values) => {
        try {
            let startDateFormatted = null;
            let endDateFormatted = null;
            const selectDate = values["select-date"];

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
            handleClose();
        } catch (error) {
            console.error("Failed to assign leave:", error);
            const errorMessage =
                error?.data?.message ||
                "Failed to assign leave. Please try again.";
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMessage,
                }),
            );
        }
    };

    const handleClose = () => {
        setOpenCalForm(false);
        form.resetFields();
        if (setSelectedDates) setSelectedDates(null);
    };

    const calendarClassName = useMemo(() => {
        const isArray = Array.isArray(selectedDates);
        const start = isArray ? selectedDates[0] : selectedDates;
        const end = isArray ? selectedDates[1] : null;

        const isSameDay = start && end && start.isSame(end, "day");

        if (start && (!end || isSameDay)) {
            return "single-active-view";
        }
        return "";
    }, [selectedDates]);

    return (
        <Modal
            open={openCalForm}
            onCancel={handleClose}
            title={
                <Typography.Title level={3} className="font-semibold! m-0!">
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
                className="mt-6! space-y-6!"
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
                        placeholder="Please select a staff"
                        className="calendar-inputs!"
                        options={optionsStaff}
                        optionRender={(option) => (
                            <Space align="center" size="small">
                                <Avatar
                                    size={24}
                                    src={option.data.avatar}
                                    icon={
                                        !option.data.avatar ? (
                                            <User size={12} />
                                        ) : undefined
                                    }
                                />
                                <span className="font-medium">
                                    {option.data.label}
                                </span>
                                <span className="text-xs text-gray-400">
                                    ({option.data.desc})
                                </span>
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
                        onChange={(dates) => {
                            if (setSelectedDates) setSelectedDates(dates);
                        }}
                        autoFocus={false}
                        className={cn(
                            "w-full calendar-inputs!",
                            calendarClassName,
                        )}
                        classNames={{ popup: "my-custom-rangepicker" }}
                    />
                </Form.Item>

                <Form.Item label="Note" name="note">
                    <Input.TextArea
                        rows={3}
                        placeholder="Add reason or note..."
                        className="calendar-inputs!"
                    />
                </Form.Item>

                <Form.Item className="mb-0! pt-2">
                    <Space
                        size="middle"
                        className="flex! justify-end! items-center!"
                    >
                        <Button onClick={handleClose}>Cancel</Button>
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
