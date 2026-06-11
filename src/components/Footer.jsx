const AppFooter = () => {
    const currentYear = new Date();

    return (
        <div className="bg-blue-950 text-white font-semibold flex justify-center items-center h-12 ">
            &copy; <span> {currentYear.getFullYear()} </span>
            Created by Digital Base
        </div>
    );
};

export default AppFooter;
