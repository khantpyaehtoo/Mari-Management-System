import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const isNotAuth = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    const nav = useNavigate();

    if (token) {
        return nav("/");
    } else {
        return children;
    }
};

export default isNotAuth;
