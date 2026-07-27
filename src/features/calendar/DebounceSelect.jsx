import { Avatar, Select, Spin } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
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

    // Fetch Function
    const loadOptions = useCallback(
        (searchValue = "") => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setFetching(true);

            fetchOptions(searchValue)
                .then((newOptions) => {
                    if (!isMounted.current || fetchId !== fetchRef.current)
                        return;
                    setOptions(newOptions || []);
                    setFetching(false);
                })
                .catch(() => {
                    if (isMounted.current) setFetching(false);
                });
        },
        [fetchOptions],
    );

    // Debouncing Search
    const debouncedSearch = useDebounceCallback((value) => {
        loadOptions(value);
    }, debounceTimeout);

    // Dropdown Initial List Handler
    const handleDropdownVisibleChange = (open) => {
        if (open) {
            loadOptions("");
        }
        if (props.onDropdownVisibleChange) {
            props.onDropdownVisibleChange(open);
        }
    };

    return (
        <Select
            labelInValue
            showSearch
            filterOption={false}
            onSearch={debouncedSearch}
            onOpenChange={handleDropdownVisibleChange}
            placeholder="Select staff"
            allowClear
            notFoundContent={
                fetching ? (
                    <div style={{ textAlign: "center", padding: "8px 0" }}>
                        <Spin size="small" />
                    </div>
                ) : (
                    "No results found"
                )
            }
            {...props}
            options={options}
            optionRender={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    {option.data?.avatar && (
                        <Avatar
                            src={option.data.avatar}
                            style={{ marginInlineEnd: 8 }}
                            size="small"
                        />
                    )}
                    {option.label}
                </div>
            )}
        />
    );
}
