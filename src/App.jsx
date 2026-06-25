import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import NotificationHandler from "./components/NotificationHandler";
import User from "./features/management/user/User.jsx";
import Services from "./features/management/services/Services.jsx";
import Booking from "./features/management/booking/Booking.jsx";
import Staff from "./features/management/staff/Staff.jsx";
import CalendarSection from "./features/calendar/Calendar.jsx";
import Settings from "./features/auth/Settings.jsx";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./features/auth/LoginForm.jsx";
import ForgetPasswordForm from "./features/auth/ForgetPasswordForm.jsx";
import NewPasswordForm from "./features/auth/NewPasswordForm.jsx";
import PageNotFound from "./pages/PageNotFound";
import WalkIn from "./features/walkIn/WalkIn.jsx";
// import IsAuth from "./components/Guards/IsAuth.jsx";
// import IsNotAuth from "./components/Guards/IsNotAuth.jsx";

export default function App() {
    return (
        <>
            <NotificationHandler />
            <Routes>
                <Route
                    path="/login"
                    element={
                        // <IsNotAuth>
                        <LoginForm />
                        // </IsNotAuth>
                    }
                />
                <Route path="/reset" element={<ForgetPasswordForm />} />
                <Route path="/new-password" element={<NewPasswordForm />} />

                <Route
                    path="/"
                    element={
                        // <IsAuth>
                        <MainLayout />
                        // </IsAuth>
                    }
                >
                    <Route index path="/" element={<Dashboard />} />
                    <Route path="/management">
                        <Route path="user" element={<User />} />
                        <Route path="service" element={<Services />} />
                        <Route path="booking" element={<Booking />} />
                        <Route path="staff" element={<Staff />} />
                    </Route>
                    <Route path="/walk-in" element={<WalkIn />} />
                    <Route path="/calendar" element={<CalendarSection />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}
