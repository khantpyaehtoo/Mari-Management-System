import { Select } from "antd";
import { cn } from "../../lib/utils";

const TableHeaderSection = ({
    renderlists,
    options,
    setFilterValue,
    statusCounts,
}) => {
    const handleChange = (value) => {
        console.log("clicked", value);
        setFilterValue(value || null);
    };

    return (
        <div className="flex justify-between items-center p-3">
            <ul className="flex gap-4">
                {renderlists?.map((lists, index) => {
                    const counts = statusCounts?.[lists] || 0;
                    const statusClasses = {
                        "In Progress": "text-progress",
                        Pending: "text-pending",
                        Confirm: "text-confirm",
                        Completed: "text-completed",
                        Available: "text-available",
                        Unavailable: "text-unavailable",
                        Reject: "text-unavailable",
                    };

                    return (
                        <li
                            key={index}
                            className={cn(
                                "font-medium",
                                statusClasses[lists] || "text-gray-500",
                                "hover:underline",
                            )}
                        >
                            {lists} <span>{counts}</span>
                        </li>
                    );
                })}
            </ul>
            <Select
                allowClear
                placeholder="All Status"
                style={{ width: 130 }}
                onChange={handleChange}
                options={options}
            />
        </div>
    );
};

export default TableHeaderSection;
