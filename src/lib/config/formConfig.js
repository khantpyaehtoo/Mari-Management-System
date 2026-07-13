import PackageForm from "../../features/management/PackageSection/PackageForm";
import CategoryForm from "../../features/management/services/CategoryForm";
import ServiceForm from "../../features/management/services/ServiceForm";
import StaffForm from "../../features/management/staff/StaffForm";
import SentNotificationsForm from "../../features/send-notifications/SentNotificationsForm";

export const FORM_CONFIG = {
    Staff: {
        Component: StaffForm,
    },
    Packages: {
        Component: PackageForm,
    },
    Services: {
        Component: ServiceForm,
    },
    Category: {
        Component: CategoryForm,
    },
    // notifications
    "To Staff": {
        Component: SentNotificationsForm,
    },
    "To Customer": {
        Component: SentNotificationsForm,
    },
};
