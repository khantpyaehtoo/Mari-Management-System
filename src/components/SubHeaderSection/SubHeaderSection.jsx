import { Input, Typography } from "antd";
import AddForm from "../modals/AddForm";

const SubHeaderSection = ({
    setSearchText,
    title,
    isEdit,
    isOpen,
    onCancel,
    initialValues,
    subTitle,
}) => {
    const { Title } = Typography;
    const { Search } = Input;

    return (
        <div className="title-style flex justify-between items-center">
            <div>
                <Title level={3} className="text-primary! text-3xl!">
                    {title} Management
                </Title>
                <p className="text-gray-600">{subTitle}</p>
            </div>
            {setSearchText ? (
                <Search
                    placeholder="Search somethings ...."
                    onSearch={(value) => setSearchText(value)}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="lg:!w-100 md:!w-80 !w-60"
                />
            ) : (
                ""
            )}

            <AddForm
                title={title}
                isEdit={isEdit}
                isOpen={isOpen}
                onCancel={onCancel}
                initialValues={initialValues}
            />
        </div>
    );
};

export default SubHeaderSection;
