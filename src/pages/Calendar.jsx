import { Calendar } from "antd";
import SubHeaderSection from "../components/SubHeaderSection/SubHeaderSection";

const CalendarSection = () => {
    return (
        <div>
            <div>
                <SubHeaderSection title="Calendar" />
            </div>
            <Calendar />
        </div>
    );
};

export default CalendarSection;
