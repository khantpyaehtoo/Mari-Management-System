import { Input, Typography } from "antd";
import AddForm from "../modals/AddForm";

const SubHeaderSection = ({ setSearchText, title }) => {
    const { Title } = Typography;
    const { Search } = Input;

    return (
        <div className="title-style flex justify-between items-center">
            <Title level={3}>{title}</Title>
            <Search
                placeholder="Search somethings ...."
                onSearch={(value) => setSearchText(value)}
                onChange={(e) => setSearchText(e.target.value)}
                className="lg:!w-128 md:!w-64 !w-32"
            />
            <AddForm title={title} />
        </div>
    );
};

export default SubHeaderSection;
