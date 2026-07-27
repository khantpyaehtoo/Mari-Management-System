import { Card, Flex, Space, Typography, Spin, Avatar } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
    useGetDailyStaffQuery,
    useGetSelectedDayLeavesQuery,
} from "./calendarApi";
import { getImageUrl } from "../../app/core/functions/getImageUrl";
import { User } from "lucide-react";

const EmployeeAttendance = () => {
    const todayLabel = dayjs().format("MMMM DD");
    const todayFormattedDate = dayjs().format("YYYY-MM-DD");

    const { data: dailyStaffData, isLoading: isDailyLoading } =
        useGetDailyStaffQuery();

    const { data: leaveStaffsData = [], isLoading: isLeaveLoading } =
        useGetSelectedDayLeavesQuery(todayFormattedDate);

    // Get raw Active Staff list safely from API Response
    const rawActiveStaff = useMemo(() => {
        if (!dailyStaffData) return [];

        if (Array.isArray(dailyStaffData.activeStaff)) {
            return dailyStaffData.activeStaff;
        }

        if (dailyStaffData.dailyStatuses) {
            const dateKey = Object.keys(dailyStaffData.dailyStatuses)[0];
            if (dateKey && dailyStaffData.dailyStatuses[dateKey]?.activeStaff) {
                return dailyStaffData.dailyStatuses[dateKey].activeStaff;
            }
        }

        return [];
    }, [dailyStaffData]);

    const dayOffStaffs = useMemo(() => {
        if (!Array.isArray(leaveStaffsData)) return [];
        return leaveStaffsData.filter(
            (item) =>
                item.leaveType === "DAY_OFF" || item.leaveType === "DAYOFF",
        );
    }, [leaveStaffsData]);

    const actualLeaveStaffs = useMemo(() => {
        if (!Array.isArray(leaveStaffsData)) return [];
        return leaveStaffsData.filter(
            (item) =>
                item.leaveType !== "DAY_OFF" && item.leaveType !== "DAYOFF",
        );
    }, [leaveStaffsData]);

    const unavailableStaffIds = useMemo(() => {
        if (!Array.isArray(leaveStaffsData)) return [];
        return leaveStaffsData.map(
            (item) => item.staffProfileId || item.staffId || item.id,
        );
    }, [leaveStaffsData]);

    const activeStaffs = useMemo(() => {
        return rawActiveStaff.filter((staff) => {
            const isUnavailable = unavailableStaffIds.includes(staff.id);
            const status = staff?.status?.toUpperCase();
            const isTerminated =
                status === "INACTIVE" ||
                status === "TERMINATE" ||
                status === "TERMINATED";

            return !isUnavailable && !isTerminated;
        });
    }, [rawActiveStaff, unavailableStaffIds]);

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
        const id = isLeave
            ? staff.staffProfileId || staff.staffId || staff.id
            : staff.id;

        const name = isLeave
            ? staff.staffName ||
              staff.name ||
              staff.staffProfileName ||
              "Unknown Staff"
            : staff.name;

        const role = staff.role || staff.staffRole || "STAFF";
        const avatarUrl = staff.profileImage || staff.staffProfileImage;

        return (
            <div
                key={id}
                className="border border-primary rounded-2xl px-4 py-2.5 mt-2 bg-white shadow-sm"
            >
                <Flex vertical>
                    <div className="flex items-center justify-between">
                        <Space size="small">
                            <Avatar
                                src={
                                    avatarUrl
                                        ? getImageUrl(avatarUrl)
                                        : undefined
                                }
                                icon={
                                    !avatarUrl ? <User size={18} /> : undefined
                                }
                                size={38}
                                className="bg-pink-100 text-primary font-semibold"
                            />
                            <div>
                                <h1 className="text-xs font-semibold m-0 text-gray-800 font-montserrat">
                                    {name}
                                </h1>
                                <p className="text-[10px] m-0 text-gray-400 font-montserrat!">
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
            className="w-full rounded-2xl! border-2! border-primary! shadow-sm!"
            styles={{ header: { padding: "10px" }, body: { padding: "8px" } }}
        >
            {/* Today's Staffs Section */}
            <div className="border-b border-gray-200 p-3">
                <Typography.Title
                    level={5}
                    className="text-center! font-semibold! m-0! text-gray-700"
                >
                    Active Today ({todayLabel}) - {activeStaffs.length}
                </Typography.Title>
                <section className="space-y-1">
                    {activeStaffs.length > 0 ? (
                        activeStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                false,
                                "bg-emerald-400 border-emerald-500",
                            ),
                        )
                    ) : (
                        <p className="text-gray-400 text-xs mt-3 text-center">
                            No active staff today
                        </p>
                    )}
                </section>
            </div>

            {/* Day Off Section */}
            <div className="border-b border-gray-200 p-3">
                <Typography.Title
                    level={5}
                    className="text-center font-semibold! m-0! text-gray-700"
                >
                    Day Off ({todayLabel}) - {dayOffStaffs.length}
                </Typography.Title>
                <section className="space-y-1">
                    {dayOffStaffs.length > 0 ? (
                        dayOffStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                true,
                                "bg-amber-400 border-amber-500",
                            ),
                        )
                    ) : (
                        <p className="text-gray-400 text-xs mt-3 text-center">
                            No staff on day off
                        </p>
                    )}
                </section>
            </div>

            {/* Leave Staff Section */}
            <div className="p-3">
                <Typography.Title
                    level={5}
                    className="text-center font-semibold! m-0! text-gray-700"
                >
                    On Leave ({todayLabel}) - {actualLeaveStaffs.length}
                </Typography.Title>
                <section className="space-y-1">
                    {actualLeaveStaffs.length > 0 ? (
                        actualLeaveStaffs.map((staff) =>
                            renderStaffItem(
                                staff,
                                true,
                                "bg-rose-400 border-rose-500",
                            ),
                        )
                    ) : (
                        <p className="text-gray-400 text-xs mt-3 text-center">
                            No staff on leave today
                        </p>
                    )}
                </section>
            </div>
        </Card>
    );
};

export default EmployeeAttendance;
