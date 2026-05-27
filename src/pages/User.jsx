import { Typography } from "antd";

const User = () => {
    const { Title } = Typography;

    return (
        <div>
            <Title className="p-3 border-b-1" level={3}>
                User
            </Title>
        </div>
    );
};

export default User;
