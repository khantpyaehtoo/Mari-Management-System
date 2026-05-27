import { Typography } from "antd";

const Report = () => {
    const { Title } = Typography;
    return (
        <div>
            <Title className="p-3 border-b-1" level={3}>
                Report
            </Title>
        </div>
    );
};

export default Report;
