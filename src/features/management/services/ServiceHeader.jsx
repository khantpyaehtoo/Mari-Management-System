import {
    ArrowLeftOutlined,
    // PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddForm from "../../../components/modals/AddForm";

const ServiceHeader = ({ title }) => {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsopen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <Space vertical size="large" className="w-full!">
                <Button
                    onClick={() =>
                        nav("/management/service", { replace: true })
                    }
                    className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-xl! group"
                >
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                    {title}
                </Button>

                <Space
                    size="large"
                    className="border-b-2 border-gray-300 py-10 px-3 w-full"
                >
                    <Input
                        value={searchText}
                        placeholder={`Search ${title}`}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                        prefix={<SearchOutlined className="px-3" />}
                        size="large"
                    />

                    {/* <Button
                        variant="solid"
                        icon={<PlusCircleOutlined />}
                        className="createFormBtn!"
                    >
                        Create {title}
                    </Button> */}

                    <AddForm
                        title={title}
                        isEdit={isEdit}
                        isOpen={isOpen}
                        // triggerCreate={createCategory}
                        // triggerEdit={editCategory}
                    />
                </Space>
            </Space>
        </>
    );
};

export default ServiceHeader;
