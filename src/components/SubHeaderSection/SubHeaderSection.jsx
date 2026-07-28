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
    onOpen,
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
    activeFormType,
    setActiveFormType,
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

    // Single formType သို့မဟုတ် title ကို သတ်မှတ်ခြင်း
    const resolvedFormType = Array.isArray(formType)
        ? formType[0]
        : formType || title;

    return (
        <div
            className={cn(
                title?.includes("Customer")
                    ? "border-0 px-3"
                    : "p-3 border-b border-gray-400 ",
            )}
        >
            {/* Dynamic Back Button */}
            {showBackButton && (
                <Button
                    onClick={() => nav(backToPath, { replace: true })}
                    className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-lg! p-0! mb-4! group flex items-center gap-1 cursor-pointer"
                >
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                    Back to {backText}
                </Button>
            )}

            {!!title && (
                <div
                    className={cn(
                        titleIncludes
                            ? "flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4"
                            : "",
                    )}
                >
                    <div>
                        <Title
                            level={3}
                            className="text-primary! text-2xl lg:text-3xl! m-0!"
                        >
                            {title.includes("Services") ||
                            title.includes("Calendar") ||
                            title.includes("Reports") ||
                            title.includes("Disabled")
                                ? title
                                : `${title} Management`}
                        </Title>
                        <p className="text-gray-500 text-sm mt-1">{subTitle}</p>
                    </div>

                    {title === "Sent Notifications" &&
                        Array.isArray(formType) && (
                            <div className="flex gap-3">
                                <AddForm
                                    title={formType[0] || title}
                                    formType={formType[0]}
                                    btnTitle={btnTitle}
                                    subFormTitle={subFormTitle}
                                    isEdit={isEdit}
                                    isOpen={activeFormType === formType[0]}
                                    onCancel={onCancel}
                                    initialValue={initialValue}
                                    triggerCreate={triggerCreate}
                                    triggerEdit={triggerEdit}
                                    onOpen={() =>
                                        setActiveFormType?.(formType[0])
                                    }
                                />
                                {formType[1] && (
                                    <AddForm
                                        title={formType[1] || title}
                                        formType={formType[1]}
                                        btnTitle={btnTitle}
                                        subFormTitle={subFormTitle}
                                        isEdit={isEdit}
                                        isOpen={activeFormType === formType[1]}
                                        onCancel={onCancel}
                                        initialValue={initialValue}
                                        triggerCreate={triggerCreate}
                                        triggerEdit={triggerEdit}
                                        onOpen={() =>
                                            setActiveFormType?.(formType[1])
                                        }
                                    />
                                )}
                            </div>
                        )}

                    {title?.includes("Staff Schedule and Calendar") && (
                        <Space wrap>
                            {DebounceSelect && (
                                <DebounceSelect
                                    value={value}
                                    placeholder="Select staff"
                                    fetchOptions={fetchUserList}
                                    style={{ width: "260px" }}
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
                            )}
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenCalForm?.(true)}
                                className="bg-primary hover:bg-primary-sec! border-none shadow-sm cursor-pointer"
                            >
                                Assign Leave
                            </Button>
                        </Space>
                    )}

                    {title.includes("Reports & Analytics") && selectedDate && (
                        <Space wrap>
                            <Select
                                value={selectedDate.month()}
                                style={{ width: 140 }}
                                onChange={(val) => onDateChange("month", val)}
                                options={months}
                            />
                            <Select
                                value={selectedDate.year()}
                                style={{ width: 110 }}
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
                        placeholder={placeholderTitle || "Search..."}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                        prefix={
                            <SearchOutlined className="px-2 text-gray-400" />
                        }
                        size="large"
                        allowClear
                    />
                )}

                {!hideAddButton && title !== "Sent Notifications" && (
                    <AddForm
                        title={resolvedFormType}
                        formType={resolvedFormType}
                        btnTitle={formType}
                        subFormTitle={subFormTitle}
                        isEdit={isEdit}
                        onCancel={onCancel}
                        isOpen={isOpen}
                        onOpen={() => {
                            if (setActiveFormType) {
                                setActiveFormType(resolvedFormType);
                            }
                            if (onOpen) {
                                onOpen();
                            }
                        }}
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
