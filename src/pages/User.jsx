import { Typography } from "antd";

const User = () => {
    const { Title } = Typography;

    return (
        <div>
            <Title className="title-style" level={3}>
                User
            </Title>
        </div>
    );
};

export default User;
