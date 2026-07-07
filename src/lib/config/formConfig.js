import CalendarForm from "../../features/calendar/CalendarForm";
import PackageForm from "../../features/management/PackageSection/PackageForm";
import StaffForm from "../../features/management/staff/StaffForm";

export const FORM_CONFIG = {
    Staff: {
        Component: StaffForm,
    },
    Calendar: {
        Component: CalendarForm,
    },
    Packages: {
        Component: PackageForm,
    },
};
