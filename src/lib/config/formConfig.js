import BookingForm from "../../features/management/booking/BookingForm";
import {
    useCreateBookingMutation,
    useUpdateBookingMutation,
} from "../../features/management/booking/bookingApi";
import ServiceForm from "../../features/management/services/ServiceForm";
import {
    useCreateServiceMutation,
    useUpdateServiceMutation,
} from "../../features/management/services/servicesApi";
import StaffForm from "../../features/management/staff/StaffForm";
import {
    useCreateStaffMutation,
    useUpdateStaffMutation,
} from "../../features/management/staff/staffApi";
import UserForm from "../../features/management/user/UserForm";
import {
    useCreateUserMutation,
    useUpdateUserMutation,
} from "../../features/management/user/userApi";

export const FORM_CONFIG = {
    User: {
        Component: UserForm,
        useCreateMutation: useCreateUserMutation,
        useEditMutation: useUpdateUserMutation,
    },
    Staff: {
        Component: StaffForm,
        useCreateMutation: useCreateStaffMutation,
        useEditMutation: useUpdateStaffMutation,
    },
    Booking: {
        Component: BookingForm,
        useCreateMutation: useCreateBookingMutation,
        useEditMutation: useUpdateBookingMutation,
    },
    Services: {
        Component: ServiceForm,
        useCreateMutation: useCreateServiceMutation,
        useEditMutation: useUpdateServiceMutation,
    },
};
