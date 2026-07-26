// src/app/core/notifications/NotificationListener.jsx
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "./notiSlice";
import {
    useGetIncomingCustomerNotisQuery,
    useGetIncomingStaffNotisQuery,
} from "./incomeNotiApi";

export const NotificationListener = () => {
    const dispatch = useDispatch();

    // Latest Noti IDs
    const lastCustomerNotiIdRef = useRef(null);
    const lastStaffNotiIdRef = useRef(null);

    // Customer Notifications Polling
    const { data: customerData } = useGetIncomingCustomerNotisQuery(
        { tab: "all" },
        { pollingInterval: 10000 },
    );

    // Staff Notifications Polling
    const { data: staffData } = useGetIncomingStaffNotisQuery(
        { tab: "all" },
        { pollingInterval: 10000 },
    );

    // Customer Noti Listener
    useEffect(() => {
        const latestNoti = customerData?.content?.[0];

        if (latestNoti) {
            // First Load
            if (lastCustomerNotiIdRef.current === null) {
                lastCustomerNotiIdRef.current = latestNoti.id;
                return;
            }

            if (latestNoti.id !== lastCustomerNotiIdRef.current) {
                lastCustomerNotiIdRef.current = latestNoti.id;

                dispatch(
                    setMessage({
                        msgType: "info",
                        title: latestNoti.title || "Customer Notification",
                        msgContent:
                            latestNoti.message ||
                            latestNoti.description ||
                            "You have a new customer notification",
                        isInbox: true,
                    }),
                );
            }
        }
    }, [customerData, dispatch]);

    // Staff Noti Listener
    useEffect(() => {
        const latestNoti = staffData?.content?.[0];

        if (latestNoti) {
            if (lastStaffNotiIdRef.current === null) {
                lastStaffNotiIdRef.current = latestNoti.id;
                return;
            }

            if (latestNoti.id !== lastStaffNotiIdRef.current) {
                lastStaffNotiIdRef.current = latestNoti.id;

                dispatch(
                    setMessage({
                        msgType: "info",
                        title: latestNoti.title || "Staff Notification",
                        msgContent:
                            latestNoti.message ||
                            latestNoti.description ||
                            "You have a new staff notification",
                        isInbox: true,
                    }),
                );
            }
        }
    }, [staffData, dispatch]);

    return null;
};
