import DateTimeFormatter from "../app/core/functions/DateTimeFormatter";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center">
            <h3 className="text-white font-2xl">
                Welcome <span className="font-bold">Rebillet</span> !
            </h3>

            <div className="text-white">
                <span>Current Date: </span>
                <DateTimeFormatter />
            </div>
        </div>
    );
};

export default Navbar;
