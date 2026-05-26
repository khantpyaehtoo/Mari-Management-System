const Navbar = () => {
    const currentYear = new Date();

    return (
        <div className="flex justify-between items-center">
            <h3 className="text-white font-2xl">
                Welcome <span className="font-bold">Rebillet</span> !
            </h3>

            <div className="text-white">
                <span>Current Date: </span>
                {currentYear.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
            </div>
        </div>
    );
};

export default Navbar;
