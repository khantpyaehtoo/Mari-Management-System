import CalendarForm from "../../features/calendar/CalendarForm";
import {
    useCreateCalendarDataMutation,
    useDeleteCalendarDataMutation,
    useUpdateCalendarDataMutation,
} from "../../features/calendar/calendarApi";
import BookingForm from "../../features/management/booking/BookingForm";
import {
    useCreateBookingMutation,
    useDeleteBookingMutation,
    useUpdateBookingMutation,
} from "../../features/management/booking/bookingApi";
import ServiceForm from "../../features/management/services/ServiceForm";
import {
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useUpdateServiceMutation,
} from "../../features/management/services/servicesApi";
import StaffForm from "../../features/management/staff/StaffForm";
import {
    useCreateStaffMutation,
    useDeleteStaffMutation,
    useUpdateStaffMutation,
} from "../../features/management/staff/staffApi";
import UserForm from "../../features/management/user/UserForm";
import {
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
} from "../../features/management/user/userApi";

export const FORM_CONFIG = {
    User: {
        Component: UserForm,
        useCreateMutation: useCreateUserMutation,
        useEditMutation: useUpdateUserMutation,
        useDeleteMutation: useDeleteUserMutation,
    },
    Staff: {
        Component: StaffForm,
        useCreateMutation: useCreateStaffMutation,
        useEditMutation: useUpdateStaffMutation,
        useDeleteMutation: useDeleteStaffMutation,
    },
    Booking: {
        Component: BookingForm,
        useCreateMutation: useCreateBookingMutation,
        useEditMutation: useUpdateBookingMutation,
        useDeleteMutation: useDeleteBookingMutation,
    },
    Services: {
        Component: ServiceForm,
        useCreateMutation: useCreateServiceMutation,
        useEditMutation: useUpdateServiceMutation,
        useDeleteMutation: useDeleteServiceMutation,
    },
    Calendar: {
        Component: CalendarForm,
        useCreateMutation: useCreateCalendarDataMutation,
        useEditMutation: useUpdateCalendarDataMutation,
        useDeleteMutation: useDeleteCalendarDataMutation,
    },
};
