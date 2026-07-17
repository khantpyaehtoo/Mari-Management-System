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
}) => {
    const { Title } = Typography;
    const nav = useNavigate();

    const {
        DebounceSelect,
        fetchUserList,
        value,
        setValue,
        openCalForm,
        setOpenCalForm,
    } = CalendarConfig || {};

    const { selectedDate, onDateChange } = reportConfig || {};

    const titleIncludes =
        title.includes("Staff Schedule and Calendar") ||
        title.includes("Reports & Analystics") ||
        title?.includes("Sent Notifications");

    const currentYear = dayjs().year();
    const years = Array.from(
        { length: currentYear - 2020 + 1 },
        (_, i) => currentYear - i,
    );

    const months = Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: dayjs().month(i).format("MMMM"),
    }));

    return (
        <div
            className={cn(
                title?.includes("Customer") ? "border-0 px-3" : "p-3 border-b",
            )}
        >
            {showBackButton && (
                <Button
                    onClick={() =>
                        nav("/management/service", { replace: true })
                    }
                    className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-lg! p-0! mb-4! group flex items-center gap-1"
                >
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                    Back to Services
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
                            title.includes("Reports")
                                ? title
                                : `${title} Management`}
                        </Title>
                        <p className="text-gray-600">{subTitle}</p>
                    </div>

                    {title === "Sent Notifications" && (
                        <div className="flex gap-3">
                            <AddForm
                                title={formType[0] || title}
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
                                mode="multiple"
                                value={value}
                                placeholder="Select users"
                                fetchOptions={fetchUserList}
                                style={{ width: "400px" }}
                                onChange={(newValue) => {
                                    if (Array.isArray(newValue))
                                        setValue(newValue);
                                }}
                            />
                            <Button
                                value={openCalForm}
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenCalForm(true)}
                            >
                                Assign Leave
                            </Button>
                        </Space>
                    )}

                    {title.includes("Reports & Analystics") && (
                        <Space>
                            <Select
                                value={selectedDate.month()} // returns 0-11 index natively
                                style={{ width: 150 }}
                                onChange={(val) => onDateChange("month", val)}
                                options={months}
                            />
                            <Select
                                value={selectedDate.year()} // returns full integer year
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

                {title !== "Sent Notifications" && (
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
                    />
                )}
            </div>
        </div>
    );
};

export default SubHeaderSection;
