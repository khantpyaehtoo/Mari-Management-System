import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { App } from "antd";
import { clearMessage } from "./notiSlice";

const NotificationHandler = () => {
    const dispatch = useDispatch();
    const { notification } = App.useApp();

    const messageData = useSelector((state) => state?.noti?.message);
    const placementData = useSelector((state) => state?.noti?.placement);

    const { msgType, msgContent, title, duration } = messageData || {};
    const { placeholderType } = placementData || {};

    useEffect(() => {
        if (msgContent) {
            const notiType = ["success", "error", "warning", "info"].includes(
                msgType,
            )
                ? msgType
                : "info";

            const validPlacement = placeholderType || "bottomRight";

            notification[notiType]({
                message: title || "Inbox Notification",
                description: msgContent,
                placement: validPlacement,
                duration: duration ?? 4,
            });

            // Reset state back to initial state
            dispatch(clearMessage());
        }
    }, [
        msgContent,
        msgType,
        title,
        duration,
        placeholderType,
        dispatch,
        notification,
    ]);

    return null;
};

export default NotificationHandler;
