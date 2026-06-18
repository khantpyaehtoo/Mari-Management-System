import { Calendar } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
// import { useEffect, useState } from "react";

const CalendarSection = () => {
    // const [staffList, setStaffList] = useState([]);
    // const [attendanceData, setAttendanceData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         try {
    //             setIsLoading(true);
    //             const mockStaffs = [
    //                 { id: "S001", name: "Aung Aung", role: "React Developer" },
    //                 { id: "S002", name: "Su Su", role: "UI/UX Designer" },
    //                 { id: "S003", name: "Kyaw Kyaw", role: "QA Engineer" },
    //                 { id: "S004", name: "Mya Mya", role: "Project Manager" },
    //             ];

    //             const mockAttendance = [
    //                 {
    //                     date: "2026-06-18",
    //                     employees: [
    //                         {
    //                             id: "S001",
    //                             name: "Aung Aung",
    //                             role: "React Developer",
    //                         },
    //                     ],
    //                 },
    //             ];

    //             setAttendanceData(mockAttendance);
    //             setStaffList(mockStaffs);
    //             setIsLoading(false);
    //         } catch (err) {
    //             console.log("failed to fetch", err);
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchApi();
    // }, []);

    // const handleCreateAttendance = (values) => {
    //     const selectedDate = values.date.format("YYYY-MMM-DD");
    //     const selectedEmployee = values.staffsIds.map((id) => {
    //         return staffList.find((staff) => staff.id === id);
    //     });

    //     setAttendanceData((prev) => {
    //         const existingDay = prev.find((item) => item.date === selectedDate);

    //         if (existingDay) {
    //             const updatedEmployee = [...existingDay.employees];
    //             selectedEmployee.forEach((employee) => {
    //                 if (!updatedEmployee.some((e) => e.id === employee.id)) {
    //                     updatedEmployee.push(employee);
    //                 }
    //             });
    //         }

    //         return prev;
    //     });
    // };

    // const cellRender =

    return (
        <div>
            <div>
                <SubHeaderSection
                    title="Calendar"
                    // handleCreateAttendance={handleCreateAttendance}
                />
            </div>
            <Calendar
                // cellRender={cellRender}
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
