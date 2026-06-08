import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { App } from "antd";
import { clearMessage } from "../app/core/notiSlice";

const NotificationHandler = () => {
    const dispatch = useDispatch();
    const { message } = App.useApp();
    const messageData = useSelector((state) => state?.noti?.message);
    const { msgType, msgContent } = messageData || {};

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
    }, [msgContent, msgType, dispatch, message]);

    return null;
};

export default NotificationHandler;
