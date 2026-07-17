import { Avatar, Flex, Space, Typography, Tag } from "antd";
import dayjs from "dayjs";
import { X } from "lucide-react";

const CalendarDetailOverview = ({
    details, // CalendarSection ကနေ dayData.events ကို လှမ်းပေးလိုက်တဲ့ Array ဖြစ်ပါတယ်
    selectedDate,
    setActivePopoverDate,
}) => {
    const formattedDate = selectedDate
        ? dayjs(selectedDate).format("dddd, DD MMMM")
        : "";

    // API Doc အရ leaveType ပေါ်မူတည်ပြီး Tag အရောင် ခွဲထုတ်ပါမယ်
    const getTypeTag = (leaveType) => {
        if (leaveType === "DAYOFF") {
            return <Tag color="warning">Day OFF</Tag>;
        }
        return <Tag color="error">Leave ({leaveType || "PERSONAL"})</Tag>;
    };

    return (
        <div
            className="p-2"
            style={{ maxWidth: "320px", maxHeight: "400px", overflowY: "auto" }}
        >
            <Flex
                justify="space-between"
                align="center"
                className="border-b pb-2 mb-3!"
            >
                <Typography.Text className="font-semibold text-base text-gray-700">
                    {formattedDate} Staff Details
                </Typography.Text>
                <X
                    size={16}
                    onClick={() => setActivePopoverDate(null)}
                    className="cursor-pointer"
                />
            </Flex>

            <section className="space-y-3">
                {details && details.length > 0 ? (
                    details.map((staff, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm"
                        >
                            <Flex align="center" justify="space-between">
                                <Space size="middle">
                                    <Avatar
                                        src={staff.profileImage}
                                        size={36}
                                    />
                                    <div>
                                        <h4 className="font-semibold text-sm m-0 text-gray-800">
                                            {staff.staffName || "Unknown Staff"}
                                        </h4>
                                        <p className="text-xs text-gray-400 m-0">
                                            {staff.role || "STAFF"}
                                        </p>
                                    </div>
                                </Space>
                                {getTypeTag(staff.leaveType)}
                            </Flex>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-xs text-center my-4">
                        No special schedule for this day.
                    </p>
                )}
            </section>
        </div>
    );
};

export default CalendarDetailOverview;
