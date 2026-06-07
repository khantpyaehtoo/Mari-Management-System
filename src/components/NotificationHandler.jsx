import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { clearMessage } from "../app/core/notiSlice";

const NotificationHandler = () => {
    const dispatch = useDispatch();
    const { msgType, msgContent } = useSelector((state) => state.noti.message);

    useEffect(() => {
        if (msgContent) {
            if (msgType === "success") {
                message.success(msgContent);
            } else if (msgType === "error") {
                message.error(msgContent);
            } else if (msgType === "warning") {
                message.warning(msgContent);
            } else {
                message.info(msgContent);
            }

            dispatch(clearMessage());
        }
    }, [msgContent, msgType, dispatch]);

    return null;
};

export default NotificationHandler;
