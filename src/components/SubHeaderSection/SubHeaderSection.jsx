import { Input, Typography } from "antd";
import AddForm from "../modals/AddForm";

const SubHeaderSection = ({
    setSearchText,
    title,
    isEdit,
    isOpen,
    onCancel,
    initialValues,
}) => {
    const { Title } = Typography;
    const { Search } = Input;

    return (
        <div className="title-style flex justify-between items-center">
            <Title level={3}>{title}</Title>
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
