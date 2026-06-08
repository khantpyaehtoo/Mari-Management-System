import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
    // const nav = useNavigate();
    const { token } = useSelector((state) => state.auth);

    if (token) {
        return children;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default IsAuth;
