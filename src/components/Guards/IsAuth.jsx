import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IsAuth = ({ children }) => {
    const nav = useNavigate();
    const { token } = useSelector((state) => state.auth);

    if (token) {
        return children;
    } else {
        return nav("/login");
    }
};

export default IsAuth;
