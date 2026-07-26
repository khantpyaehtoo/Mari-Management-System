import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white-back flex flex-col items-center justify-center p-6 text-center">
            <div className="relative flex flex-col items-center max-w-md">
                <h1 className="text-8xl sm:text-9xl font-extrabold text-[#f87596] tracking-widest drop-shadow-sm select-none">
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 mb-2">
                    Page Not Found
                </h2>

                <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
                    Oops! The page you are looking for doesn't exist, was
                    removed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-primary text-primary font-medium hover:bg-[#fff0f4] transition-all duration-200 cursor-pointer"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full sm:w-auto px-6 py-2.5 
                        rounded-xl bg-primary text-white font-medium hover:bg-[#f87596] shadow-md shadow-pink-100 transition-all duration-200 cursor-pointer"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
