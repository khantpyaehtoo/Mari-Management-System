import { MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../layout/LayoutSlice";
import DateTimeFormatter from "../app/core/functions/DateTimeFormatter";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
                <button
                    className="text-white text-xl lg:hidden cursor-pointer"
                    onClick={() => dispatch(toggleSidebar(true))}
                >
                    <MenuOutlined />
                </button>
                <h3 className="text-white text-lg md:text-2xl">
                    Welcome <span className="font-bold">Rebillet</span> !
                </h3>
            </div>

            <div className="text-white hidden md:block">
                <span>Current Date: </span>
                <DateTimeFormatter />
            </div>
        </div>
    );
};

export default Navbar;
