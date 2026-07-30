import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import User from "./features/management/user/User.jsx";
import CategorySection from "./features/management/services/CategorySection.jsx";
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
import CategoryDetails from "./features/management/services/CategoryDetails.jsx";
import ReportsPage from "./features/reports/ReportsPage.jsx";
import Packages from "./features/management/PackageSection/Packages.jsx";
import Notifications from "./features/send-notifications/Notifications.jsx";

import IsAuth from "./components/Guards/IsAuth.jsx";
import IsNotAuth from "./components/Guards/IsNotAuth.jsx";
import DisabledPackage from "./features/management/PackageSection/DisabledPackage.jsx";
import NotificationHandler from "./app/core/notifications/NotificationHandler.jsx";
import { NotificationListener } from "./components/Bars/IncomeNotifications/NotificationsListener.jsx";

export default function App() {
    return (
        <>
            <NotificationHandler />

            <Routes>
                <Route
                    path="/login"
                    element={
                        <IsNotAuth>
                            <LoginForm />
                        </IsNotAuth>
                    }
                />
                <Route path="/reset" element={<ForgetPasswordForm />} />
                <Route path="/new-password" element={<NewPasswordForm />} />

                <Route
                    path="/"
                    element={
                        <IsAuth>
                            <>
                                <NotificationListener />
                                <MainLayout />
                            </>
                        </IsAuth>
                    }
                >
                    <Route index path="/" element={<Dashboard />} />
                    <Route path="/calendar" element={<CalendarSection />} />
                    <Route path="/management">
                        <Route path="user" element={<User />} />
                        <Route path="service">
                            <Route index element={<CategorySection />} />
                            <Route path=":id" element={<CategoryDetails />} />
                        </Route>
                        <Route path="packages">
                            <Route index element={<Packages />} />
                            <Route
                                path="disabled"
                                element={<DisabledPackage />}
                            />
                        </Route>
                        <Route path="booking" element={<Booking />} />
                        <Route path="staff" element={<Staff />} />
                    </Route>
                    <Route path="/walk-in" element={<WalkIn />} />
                    <Route
                        path="/send-notifications"
                        element={<Notifications />}
                    />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}
