import { Button, Input, Select, Space, Typography } from "antd";
import AddForm from "../modals/AddForm";
import {
    PlusCircleOutlined,
    SearchOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useMemo } from "react";

const SubHeaderSection = ({
    setSearchText,
    title,
    subTitle,
    btnTitle,
    subFormTitle,
    searchText,
    isEdit,
    isOpen,
    onCancel,
    initialValue,
    triggerCreate,
    triggerEdit,
    placeholderTitle,
    CalendarConfig,
    reportConfig,
    formType,
    showBackButton = false,
    backToPath = "/management/service",
    backText,
    categories = [],
    isAllMode = false,
    hideAddButton = false,
}) => {
    const { Title } = Typography;
    const nav = useNavigate();

    const { DebounceSelect, fetchUserList, value, setValue, setOpenCalForm } =
        CalendarConfig || {};

    const { selectedDate, onDateChange } = reportConfig || {};

    const titleIncludes =
        title?.includes("Staff Schedule and Calendar") ||
        title?.includes("Reports & Analytics") ||
        title?.includes("Sent Notifications");

    const currentYear = dayjs().year();
    const years = Array.from(
        { length: currentYear - 2020 + 1 },
        (_, i) => currentYear - i,
    );

    const months = useMemo(() => {
        const selectedYear = selectedDate ? selectedDate.year() : currentYear;
        const currentMonthIndex = dayjs().month();

        const totalMonthsToShow =
            selectedYear === currentYear ? currentMonthIndex + 1 : 12;

        return Array.from({ length: totalMonthsToShow }, (_, i) => ({
            value: i,
            label: dayjs().month(i).format("MMMM"),
        }));
    }, [selectedDate, currentYear]);

    return (
        <div
            className={cn(
                title?.includes("Customer") ? "border-0 px-3" : "p-3 border-b",
            )}
        >
            {/* Dynamic Back Button */}
            {showBackButton && (
                <Button
                    onClick={() => nav(backToPath, { replace: true })}
                    className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-lg! p-0! mb-4! group flex items-center gap-1"
                >
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                    Back to {backText}
                </Button>
            )}

            {!!title && (
                <div
                    className={cn(
                        titleIncludes
                            ? "flex justify-between items-center"
                            : "",
                    )}
                >
                    <div>
                        <Title level={3} className="text-primary! text-3xl!">
                            {title.includes("Services") ||
                            title.includes("Calendar") ||
                            title.includes("Reports") ||
                            title.includes("Disabled")
                                ? title
                                : `${title} Management`}
                        </Title>
                        <p className="text-gray-600">{subTitle}</p>
                    </div>

                    {title === "Sent Notifications" && (
                        <div className="flex gap-3">
                            <AddForm
                                title={formType[0] || title}
                                formType={formType[0]}
                                btnTitle={btnTitle}
                                subFormTitle={subFormTitle}
                                isEdit={isEdit}
                                isOpen={isOpen}
                                onCancel={onCancel}
                                initialValue={initialValue}
                                triggerCreate={triggerCreate}
                                triggerEdit={triggerEdit}
                            />
                            <AddForm
                                title={formType[1] || title}
                                formType={formType[1]}
                                btnTitle={btnTitle}
                                subFormTitle={subFormTitle}
                                isEdit={isEdit}
                                isOpen={isOpen}
                                onCancel={onCancel}
                                initialValue={initialValue}
                                triggerCreate={triggerCreate}
                                triggerEdit={triggerEdit}
                            />
                        </div>
                    )}

                    {title?.includes("Staff Schedule and Calendar") && (
                        <Space>
                            <DebounceSelect
                                value={value}
                                placeholder="Select user"
                                fetchOptions={fetchUserList}
                                style={{ width: "300px" }}
                                onChange={(newValue) => {
                                    setValue(newValue || null);

                                    if (CalendarConfig?.onChange) {
                                        CalendarConfig.onChange(
                                            newValue || null,
                                        );
                                    }
                                }}
                                onClear={() => {
                                    setValue(null);
                                    if (CalendarConfig?.onChange) {
                                        CalendarConfig.onChange(null);
                                    }
                                }}
                            />
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenCalForm(true)}
                            >
                                Assign Leave
                            </Button>
                        </Space>
                    )}

                    {title.includes("Reports & Analytics") && (
                        <Space>
                            <Select
                                value={selectedDate.month()}
                                style={{ width: 150 }}
                                onChange={(val) => onDateChange("month", val)}
                                options={months}
                            />
                            <Select
                                value={selectedDate.year()}
                                style={{ width: 120 }}
                                onChange={(val) => onDateChange("year", val)}
                                options={years.map((y) => ({
                                    value: y,
                                    label: String(y),
                                }))}
                            />
                        </Space>
                    )}
                </div>
            )}

            <div className="flex justify-between items-center my-6">
                {setSearchText && (
                    <Input
                        placeholder={placeholderTitle}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                        prefix={<SearchOutlined className="px-3" />}
                        size="large"
                    />
                )}

                {!hideAddButton && title !== "Sent Notifications" && (
                    <AddForm
                        title={formType || title}
                        btnTitle={btnTitle}
                        subFormTitle={subFormTitle}
                        isEdit={isEdit}
                        isOpen={isOpen}
                        onCancel={onCancel}
                        initialValue={initialValue}
                        triggerCreate={triggerCreate}
                        triggerEdit={triggerEdit}
                        categories={categories}
                        isAllMode={isAllMode}
                    />
                )}
            </div>
        </div>
    );
};

export default SubHeaderSection;
