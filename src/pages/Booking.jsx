import { Typography } from "antd";

const Booking = () => {
    const { Title } = Typography;
    return (
        <div>
            <Title className="p-3 border-b-1" level={3}>
                Booking
            </Title>
        </div>
    );
};

export default Booking;
