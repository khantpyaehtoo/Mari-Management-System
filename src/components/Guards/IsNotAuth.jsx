import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsNotAuth = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (token) {
        return <Navigate to={"/"} />;
    } else {
        return children;
    }
};

export default IsNotAuth;
