import CalendarForm from "../../features/calendar/CalendarForm";
import ServiceForm from "../../features/management/services/ServiceForm";
import StaffForm from "../../features/management/staff/StaffForm";

export const FORM_CONFIG = {
    Staff: {
        Component: StaffForm,
    },
    Services: {
        Component: ServiceForm,
    },
    Calendar: {
        Component: CalendarForm,
    },
};
