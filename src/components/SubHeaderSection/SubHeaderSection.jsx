import { Input, Typography } from "antd";
import AddForm from "../modals/AddForm";
import { SearchOutlined } from "@ant-design/icons";

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

    return (
        <div className="title-style">
            <div>
                <Title level={3} className="text-primary! text-3xl!">
                    {title} Management
                </Title>
                <p className="text-gray-600">{subTitle}</p>
            </div>
            <div className="flex justify-between items-center my-6">
                {setSearchText ? (
                    <Input
                        placeholder="Search somethings ...."
                        onChange={(e) => setSearchText(e.target.value)}
                        className="lg:w-120! md:w-120! w-60! shadow-md py-2!"
                        prefix={<SearchOutlined className="px-3" />}
                        size="large"
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
        </div>
    );
};

export default SubHeaderSection;
