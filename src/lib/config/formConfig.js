import CalendarForm from "../../features/calendar/CalendarForm";
import PackageForm from "../../features/management/PackageSection/PackageForm";
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
    Packages: {
        Component: PackageForm,
    },
};
