import { Card, Flex, Space, Typography, Spin, Avatar } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
    useGetDailyStaffQuery,
    useGetSelectedDayLeavesQuery,
} from "./calendarApi";
import { getImageUrl } from "../../app/core/functions/getImageUrl";

const EmployeeAttendance = () => {
    const todayLabel = dayjs().format("MMMM DD");

    const todayFormattedDate = dayjs().format("YYYY-MM-DD");

    const { data: dailyStaffData, isLoading: isDailyLoading } =
        useGetDailyStaffQuery();

    //  .format("YYYY-MM-DDTHH:mm:ssZ")
    const { data: leaveStaffsData = [], isLoading: isLeaveLoading } =
        useGetSelectedDayLeavesQuery(todayFormattedDate);

    const dayOffStaffs = useMemo(() => {
        return leaveStaffsData.filter((item) => item.leaveType === "DAY_OFF");
    }, [leaveStaffsData]);

    const actualLeaveStaffs = useMemo(() => {
        return leaveStaffsData.filter((item) => item.leaveType !== "DAY_OFF");
    }, [leaveStaffsData]);

    const unavailableStaffIds = useMemo(() => {
        return leaveStaffsData.map(
            (item) => item.staffProfileId || item.staffId || item.id,
        );
    }, [leaveStaffsData]);

    const activeStaffs = useMemo(() => {
        const rawActive = dailyStaffData?.activeStaff || [];

        return rawActive.filter((staff) => {
            const isUnavailable = unavailableStaffIds.includes(staff.id);

            const status = staff?.status?.toUpperCase();
            const isTerminated =
                status === "Inactive" || status === "Terminate";

            return !isUnavailable && !isTerminated;
        });
    }, [dailyStaffData, unavailableStaffIds]);

    if (isDailyLoading || isLeaveLoading) {
        return (
            <Card
                className="w-full rounded-2xl! border-2! border-primary! mt-5! flex justify-center items-center"
                style={{ minHeight: "300px" }}
            >
                <Spin description="Loading today's schedule..." />
            </Card>
        );
    }

    const renderStaffItem = (staff, isLeave = false, dotColorClass = "") => {
        const id = isLeave ? staff.staffProfileId || staff.id : staff.id;
        const name = isLeave ? staff.staffName || staff.name : staff.name;
        const role = staff.role || "STAFF";
        const avatarUrl = staff.profileImage;

        return (
            <div
                key={id}
                className="border-2 border-primary rounded-2xl px-5 py-2 mt-3"
            >
                <Flex vertical>
                    <div className="flex items-center justify-between">
                        <Space size="small">
                            <Avatar src={getImageUrl(avatarUrl)} size={40} />
                            <div>
                                <h1 className="lg:text-basic! font-semibold! md:text-md m-0 text-gray-800 font-montserrat">
                                    {name}
                                </h1>
                                <p className="text-xs m-0 text-gray-500 font-montserrat!">
                                    {role}
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
    };

    return (
        <Card
            className="w-full rounded-2xl! border-2! border-primary! mt-5! shadow-md!"
            styles={{ header: { padding: "10px" }, body: { padding: "3px" } }}
        >
            {/* Today's Staffs Section */}
            <div className="border-b border-b-black p-4">
                <div>
                    <Typography.Title
                        level={4}
                        className="text-center! font-medium! m-0!"
                    >
                        Today's Staffs ({todayLabel}) - {activeStaffs.length}
                    </Typography.Title>
                </div>
                <section className="space-y-2">
                    {activeStaffs.length > 0 ? (
                        activeStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                false,
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

            {/* Day Off Section */}
            <div className="border-b border-b-black p-4">
                <div>
                    <Typography.Title
                        level={4}
                        className="text-center font-medium! m-0!"
                    >
                        Day Off ({todayLabel}) - {dayOffStaffs.length}
                    </Typography.Title>
                </div>
                <section className="space-y-2">
                    {dayOffStaffs.length > 0 ? (
                        dayOffStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                true,
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

            {/* Leave Staff Section */}
            <div className="p-4">
                <div>
                    <Typography.Title
                        level={4}
                        className="text-center font-medium! m-0!"
                    >
                        Leave Staff ({todayLabel}) - {actualLeaveStaffs.length}
                    </Typography.Title>
                </div>
                <section className="space-y-2">
                    {actualLeaveStaffs.length > 0 ? (
                        actualLeaveStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                true,
                                "bg-red-300 border-red-500",
                            ),
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
