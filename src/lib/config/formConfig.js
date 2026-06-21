import CalendarForm from "../../features/calendar/CalendarForm";
import BookingForm from "../../features/management/booking/BookingForm";
import ServiceForm from "../../features/management/services/ServiceForm";
import StaffForm from "../../features/management/staff/StaffForm";
import UserForm from "../../features/management/user/UserForm";

export const FORM_CONFIG = {
    User: {
        Component: UserForm,
    },
    Staff: {
        Component: StaffForm,
    },
    Booking: {
        Component: BookingForm,
    },
    Services: {
        Component: ServiceForm,
    },
    Calendar: {
        Component: CalendarForm,
    },
};
