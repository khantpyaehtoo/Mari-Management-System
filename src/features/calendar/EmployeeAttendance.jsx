import { Avatar, Card, Flex, Space, Typography, Spin } from "antd";
import dayjs from "dayjs";
import { useGetCalendarDataQuery } from "./calendarApi";

const EmployeeAttendance = () => {
    const todayStr = dayjs().format("YYYY-MM-DD");
    const todayLabel = dayjs().format("MMMM DD");

    const { data: calendarData = [], isLoading } = useGetCalendarDataQuery({
        date: todayStr,
    });

    if (isLoading) {
        return (
            <Card
                className="w-full rounded-2xl! border-2! border-primary! mt-5! flex justify-center items-center"
                style={{ minHeight: "300px" }}
            >
                <Spin tip="Loading today's schedule..." />
            </Card>
        );
    }

    const staffDetails = calendarData?.details || [];

    const activeStaffs = staffDetails.filter(
        (staff) => staff.type === "active",
    );
    const dayOffStaffs = staffDetails.filter(
        (staff) => staff.type === "day_off",
    );
    const leaveStaffs = staffDetails.filter((staff) => staff.type === "leave");

    const renderStaffItem = (staff, dotColorClass) => (
        <div
            key={staff.staff_id}
            className="border-2 border-primary rounded-2xl px-5 py-2 mt-3"
        >
            <Flex vertical>
                <div className="flex items-center justify-between">
                    <Space size="small">
                        <Avatar
                            src={
                                staff.avatar ||
                                "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                            }
                            size={40}
                        />
                        <div>
                            <h1 className="lg:text-lg! font-semibold! md:text-md m-0">
                                {staff.name}
                            </h1>
                            <p className="text-sm m-0 text-gray-500">
                                {staff.role || "Nail Artist"}
                            </p>
                        </div>
                    </Space>
                    <div
                        className={`w-3 h-3 rounded-full ${dotColorClass} border`}
                    />
                </div>
            </Flex>
        </div>
    );

    return (
        <Card
            className="w-full rounded-2xl! border-2! border-primary! mt-5! shadow-md!"
            styles={{ header: { padding: "10px" }, body: { padding: "3px" } }}
        >
            <div className="border-b border-b-black p-4">
                <div>
                    <Typography.Title
                        level={4}
                        className="text-center! font-medium! m-0!"
                    >
                        Today's Staffs ({todayLabel})
                    </Typography.Title>
                </div>
                <section className="space-y-2">
                    {activeStaffs.length > 0 ? (
                        activeStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                "bg-green-300 border-green-500",
                            ),
                        )
                    ) : (
                        <p className="text-gray-400 text-sm mt-3 text-center">
                            No active staff today
                        </p>
                    )}
                </section>
            </div>

            <div className="border-b border-b-black p-4">
                <div>
                    <Typography.Title
                        level={4}
                        className="text-center font-medium! m-0!"
                    >
                        Day Off ({todayLabel})
                    </Typography.Title>
                </div>
                <section className="space-y-2">
                    {dayOffStaffs.length > 0 ? (
                        dayOffStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                "bg-yellow-300 border-yellow-500",
                            ),
                        )
                    ) : (
                        <p className="text-gray-400 text-sm mt-3 text-center">
                            No staff on day off
                        </p>
                    )}
                </section>
            </div>

            <div className="p-4">
                <div>
                    <Typography.Title
                        level={4}
                        className="text-center font-medium! m-0!"
                    >
                        Leave Staff ({todayLabel})
                    </Typography.Title>
                </div>
                <section className="space-y-2">
                    {leaveStaffs.length > 0 ? (
                        leaveStaffs.map((staff) =>
                            renderStaffItem(staff, "bg-red-300 border-red-500"),
                        )
                    ) : (
                        <p className="text-gray-400 text-sm mt-3 text-center">
                            No staff on leave today
                        </p>
                    )}
                </section>
            </div>
        </Card>
    );
};

export default EmployeeAttendance;
