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
                        Pending: "text-progress",
                        "In Progress": "text-available",
                        Confirm: "text-confirm",
                        Completed: "text-green-700",
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
