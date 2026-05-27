import { Typography } from "antd";

const Staff = () => {
    const { Title } = Typography;

    return (
        <div>
            <Title className="p-3 border-b-1" level={3}>
                Staff
            </Title>
        </div>
    );
};

export default Staff;
