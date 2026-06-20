import { Calendar } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
// import { useEffect, useState } from "react";

const CalendarSection = () => {
    return (
        <>
            <div>
                <SubHeaderSection
                    title="Calendar"
                    // handleCreateAttendance={handleCreateAttendance}
                />
            </div>
            <Calendar
                // cellRender={cellRender}
                styles={{
                    root: {
                        borderRadius: "20px",
                        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
                        marginTop: "20px",
                    },
                    header: {
                        background: "#FBB1BD",
                        padding: "20px",
                        borderRadius: "20px 20px 0 0",
                    },
                    body: {
                        background: "#FFFAF6",
                        padding: "20px",
                        border: "2px solid #FBB1BD",
                        borderRadius: "0 0 20px 20px",
                    },
                    item: {
                        border: "1px solid #FBB1BD",
                    },
                }}
                onSelect={(date, { source }) => {
                    if (source === "date") {
                        console.log("Panel Select:", source, date);
                    }
                }}
                className="rounded-b-3xl"
            />
        </>
    );
};

export default CalendarSection;
