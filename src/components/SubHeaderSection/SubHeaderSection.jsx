import { Button, Input, Select, Space, Typography } from "antd";
import AddForm from "../modals/AddForm";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { cn } from "../../lib/utils";

const SubHeaderSection = ({
    setSearchText,
    title,
    subTitle,
    btnTitle,
    subFormTitle,
    isEdit,
    isOpen,
    onCancel,
    initialValue,
    triggerCreate,
    triggerEdit,
    placeholderTitle,
    CalendarConfig,
}) => {
    const { Title } = Typography;
    const {
        DebounceSelect,
        fetchUserList,
        value,
        setValue,
        openCalForm,
        setOpenCalForm,
    } = CalendarConfig || {};

    const options = [
        { label: "gold", value: "gold" },
        { label: "lime", value: "lime" },
        { label: "green", value: "green" },
        { label: "cyan", value: "cyan" },
    ];

    const labelRender = (props) => {
        const { label, value } = props;
        if (label) {
            return value;
        }
        return <span>No option match</span>;
    };

    return (
        <div
            className={cn(
                title.includes("Customer") ? "border-0 px-3" : "p-3 border-b",
            )}
        >
            {!!title && (
                <div
                    className={cn(
                        title.includes("Staff Schedule and Calendar") ||
                            title.includes("Reports & Analystics")
                            ? "flex justify-between items-center"
                            : "",
                    )}
                >
                    <div>
                        <Title level={3} className="text-primary! text-3xl!">
                            {title} Management
                        </Title>
                        <p className="text-gray-600">{subTitle}</p>
                    </div>

                    {title.includes("Staff Schedule and Calendar") && (
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
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenCalForm(true)}
                                value={openCalForm}
                            >
                                Assign Leave
                            </Button>
                        </Space>
                    )}

                    {title.includes("Reports & Analystics") && (
                        <Space>
                            <Select
                                labelRender={labelRender}
                                defaultValue="1"
                                style={{ width: "100%" }}
                                options={options}
                            />
                            <Select
                                labelRender={labelRender}
                                defaultValue="1"
                                style={{ width: "100%" }}
                                options={options}
                            />
                        </Space>
                    )}
                </div>
            )}

            <div className="flex justify-between items-center my-6">
                {setSearchText && (
                    <Input
                        placeholder={placeholderTitle}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            console.log(e.target.value);
                        }}
                        className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                        prefix={<SearchOutlined className="px-3" />}
                        size="large"
                    />
                )}

                <AddForm
                    title={title}
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

            {/* {setCreateCategoryInput && (
                <div className="my-6 flex gap-8">
                    <Input
                        placeholder={placeholderTitle}
                        value={createCategoryInput}
                        onChange={(e) => setCreateCategoryInput(e.target.value)}
                        className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                        prefix={<AppstoreAddOutlined className="px-3" />}
                        size="large"
                    />
                    <Button
                        variant="solid"
                        icon={<PlusCircleOutlined />}
                        className="createFormBtn!"
                    >
                        Create Category
                    </Button>
                </div>
            )} */}
        </div>
    );
};

export default SubHeaderSection;
