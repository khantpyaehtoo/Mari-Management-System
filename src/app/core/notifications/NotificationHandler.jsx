import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { App } from "antd";
import { clearMessage } from "./notiSlice";

const NotificationHandler = () => {
    const dispatch = useDispatch();

    const { message, notification } = App.useApp();

    const messageData = useSelector((state) => state?.noti?.message);
    const { msgType, msgContent, title, isInbox } = messageData || {};

    useEffect(() => {
        if (msgContent) {
            const type = ["success", "error", "warning", "info"].includes(
                msgType,
            )
                ? msgType
                : "info";

            if (isInbox) {
                notification[type]({
                    message: title || "Inbox Notification",
                    description: msgContent,
                    placement: "bottomRight",
                    duration: 4,
                    // closable: true,
                    className: "border border-primary! rounded-xl shadow-lg",
                });
            } else {
                message[type](msgContent);
            }

            dispatch(clearMessage());
        }
    }, [msgContent, msgType, title, isInbox, dispatch, message, notification]);

    return null;
};

export default NotificationHandler;
