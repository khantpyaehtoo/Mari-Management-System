import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import SubHeaderSection from "../../../components/SubHeaderSection/SubHeaderSection";
import { useState } from "react";

const ServiceHeader = () => {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState("");

    return (
        <>
            <Button
                onClick={() => nav("/management/service", { replace: true })}
                className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-xl! group"
            >
                <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                Packages
            </Button>

            <SubHeaderSection setSearchText={setSearchText} />
        </>
    );
};

export default ServiceHeader;
