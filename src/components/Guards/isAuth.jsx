import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const isAuth = ({ children }) => {
    const nav = useNavigate();
    const { token } = useSelector((state) => state.auth);

    if (token) {
        return children;
    } else {
        return nav("/login");
    }
};

export default isAuth;
