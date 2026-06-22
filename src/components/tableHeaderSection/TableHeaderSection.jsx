import { Select } from "antd";

const TableHeaderSection = ({ renderlists, options, setFilterValue }) => {
    const handleChange = (value) => {
        console.log("clicked", value);
        setFilterValue(value || null);
    };

    return (
        <div className="flex justify-between items-center p-3">
            <ul className="flex gap-4">
                {renderlists?.map((lists, index) => (
                    <li key={index}>{lists}</li>
                ))}
            </ul>
            <Select
                allowClear
                placeholder="Status"
                style={{ width: 130 }}
                onChange={handleChange}
                options={options}
            />
        </div>
    );
};

export default TableHeaderSection;
