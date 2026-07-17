import { Avatar, Card, Flex, Space, Typography, Spin } from "antd";
import dayjs from "dayjs";
import {
    useGetDailyStaffQuery,
    useGetSelectedDayLeavesQuery,
} from "./calendarApi";

const EmployeeAttendance = () => {
    const todayLabel = dayjs().format("MMMM DD");
    // API က တောင်းတဲ့ ISO Format (ဥပမာ- 2026-07-16T00:00:00Z) ပုံစံအတိုင်း ယနေ့ရက်စွဲကို ပြောင်းပါမယ်
    const todayISOStr = dayjs().startOf("day").toISOString();

    // ၁။ နေ့စဉ် Staff Status API ကို ခေါ်ယူခြင်း (Today's Staffs အတွက်)
    const { data: dailyStaffData, isLoading: isDailyLoading } =
        useGetDailyStaffQuery();

    // ၂။ ယနေ့ ခွင့်ယူထားသော ဝန်ထမ်းများစာရင်း API ကို ခေါ်ယူခြင်း (Leave Staff အတွက်)
    const { data: leaveStaffs = [], isLoading: isLeaveLoading } =
        useGetSelectedDayLeavesQuery(todayISOStr);

    if (isDailyLoading || isLeaveLoading) {
        return (
            <Card
                className="w-full rounded-2xl! border-2! border-primary! mt-5! flex justify-center items-center"
                style={{ minHeight: "300px" }}
            >
                <Spin tip="Loading today's schedule..." />
            </Card>
        );
    }

    // Backend Response ထဲက activeStaff ကို ယူမယ်
    const activeStaffs = dailyStaffData?.activeStaff || [];

    // Note: လက်ရှိ API response အရ Day Off စာရင်း သီးသန့် မပါသေးတဲ့အတွက်
    // လုပ်ငန်းခွင်ထဲမှာ မရှိသေးတဲ့ ဝန်ထမ်းတွေရှိရင် Logic နဲ့ တွက်ထုတ်ဖို့ လိုနိုင်ပါတယ် (လက်ရှိ empty array ထားပါသည်)
    const dayOffStaffs = [];

    const renderStaffItem = (staff, isLeave = false, dotColorClass = "") => {
        // Leave API ကလာတဲ့ Key နဲ့ Daily Staff API ကလာတဲ့ Key ကွာခြားမှုကို ညှိပါမယ်
        const id = isLeave ? staff.staffProfileId : staff.id;
        const name = isLeave ? staff.staffName : staff.name;
        const role = staff.role || "STAFF";
        const avatarUrl = isLeave ? staff.profileImage : staff.profileImage;

        return (
            <div
                key={id}
                className="border-2 border-primary rounded-2xl px-5 py-2 mt-3"
            >
                <Flex vertical>
                    <div className="flex items-center justify-between">
                        <Space size="small">
                            <Avatar
                                src={
                                    avatarUrl ||
                                    "https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                }
                                size={40}
                            />
                            <div>
                                <h1 className="lg:text-lg! font-semibold! md:text-md m-0 text-gray-800">
                                    {name}
                                </h1>
                                <p className="text-sm m-0 text-gray-500">
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
            {/* ၁။ Today's Staffs Section */}
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

            {/* ၂။ Day Off Section */}
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
                                false,
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

            {/* ၃။ Leave Staff Section */}
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
