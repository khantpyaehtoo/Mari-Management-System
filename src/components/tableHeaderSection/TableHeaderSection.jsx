import { Select } from "antd";

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
                    return (
                        <li key={index}>
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
