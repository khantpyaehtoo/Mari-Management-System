import { Input } from "antd";
import { useState } from "react";

const SearchBar = () => {
    const { Search } = Input;
    const [isText, setIsText] = useState("");

    const searchContext = (e) => {
        setIsText(e.target.value);
    };
    return (
        <div>
            <Search
                className="!w-64"
                size="large"
                onSearch={(e) => setIsText(e.target.value)}
                placeholder="Search"
                name="search-fn"
            />
            <h1>{isText}</h1>
        </div>
    );
};

export default SearchBar;
