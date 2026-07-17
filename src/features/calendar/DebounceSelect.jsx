import { Avatar, Select, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "../../lib/hooks/useDebounceCallback";

export default function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    ...props
}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const debouncedSearch = useDebounceCallback((value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);

        fetchOptions(value)
            .then((newOptions) => {
                // Condition
                if (!isMounted.current || fetchId !== fetchRef.current) return;
                setOptions(newOptions);
                setFetching(false);
            })
            .catch(() => {
                if (isMounted.current) setFetching(false);
            });
    }, debounceTimeout);

    return (
        <Select
            labelInValue
            showSearch
            filterOption={false}
            onSearch={debouncedSearch}
            placeholder="Select staff"
            allowClear
            notFoundContent={
                fetching ? <Spin size="small" /> : "No results found"
            }
            {...props}
            options={options}
            optionRender={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    {option.data?.avatar && (
                        <Avatar
                            src={option.data.avatar}
                            style={{ marginInlineEnd: 8 }}
                        />
                    )}
                    {option.label}
                </div>
            )}
        />
    );
}
