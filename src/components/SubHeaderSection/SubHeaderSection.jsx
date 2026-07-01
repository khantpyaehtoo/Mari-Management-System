import { Button, Input, Typography } from "antd";
import AddForm from "../modals/AddForm";
import {
    AppstoreAddOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { cn } from "../../lib/utils";

const SubHeaderSection = ({
    setSearchText,
    title,
    subTitle,
    subFormTitle,
    isEdit,
    isOpen,
    onCancel,
    initialValue,
    triggerCreate,
    triggerEdit,
    placeholderTitle,
    setCreateCategoryInput,
    createCategoryInput,
}) => {
    const { Title } = Typography;

    return (
        <div
            className={cn(
                title === "Customer" ? "border-0 px-3" : "p-3 border-b",
                title === "Reports & Analystics" && "border-0 px-3 py-3 mb-3",
            )}
        >
            {!!title && (
                <>
                    <Title level={3} className="text-primary! text-3xl!">
                        {title} Management
                    </Title>
                    <p className="text-gray-600">{subTitle}</p>
                </>
            )}

            {title !== "Services" && (
                <div className="flex justify-between items-center my-6">
                    {setSearchText && (
                        <Input
                            placeholder={placeholderTitle}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                            prefix={<SearchOutlined className="px-3" />}
                            size="large"
                        />
                    )}

                    <AddForm
                        title={title}
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

            {setCreateCategoryInput && (
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
            )}
        </div>
    );
};

export default SubHeaderSection;
