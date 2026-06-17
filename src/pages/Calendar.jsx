import { Calendar } from "antd";
import SubHeaderSection from "../components/SubHeaderSection/SubHeaderSection";

const CalendarSection = () => {
    return (
        <div>
            <div>
                <SubHeaderSection title="Calendar" />
            </div>
            <Calendar
                styles={{
                    header: {
                        background: "#FBB1BD",
                        padding: "20px",
                        marginTop: "8px",
                        borderRadius: "20px 20px 0 0",
                    },
                    body: {
                        padding: "20px",
                        border: "2px solid #FBB1BD",
                        borderRadius: "0 0 20px 20px",
                    },
                    item: {
                        border: "2px solid #FBB1BD",
                        borderRadius: "0 0 20px 20px",
                    },
                }}
                onSelect={(date, { source }) => {
                    if (source === "date") {
                        console.log("Panel Select:", source, date);
                    }
                }}
            />
        </div>
    );
};

export default CalendarSection;
