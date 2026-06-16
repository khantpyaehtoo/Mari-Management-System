import { Typography, Calendar } from "antd";

const CalendarSection = () => {
    const { Title } = Typography;
    return (
        <div>
            <Title className="title-style" level={3}>
                Calendar
            </Title>
            <Calendar />
        </div>
    );
};

export default CalendarSection;
