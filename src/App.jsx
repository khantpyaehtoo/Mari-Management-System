import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import User from "./pages/management/User";
import Staff from "./pages/management/Staff";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Booking from "./pages/management/Booking";
import Services from "./pages/management/Services";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/auth/LoginForm";
import PageNotFound from "./pages/PageNotFound";
import ForgetPasswordForm from "./pages/auth/ForgetPasswordForm";
import NotificationHandler from "./components/NotificationHandler";
// import IsAuth from "./components/Guards/IsAuth.jsx";
// import IsNotAuth from "./components/Guards/IsNotAuth.jsx";

export default function App() {
    return (
        <>
            <NotificationHandler />
            <Routes>
                <Route
                    index
                    path="/login"
                    element={
                        // <IsNotAuth>
                        <LoginForm />
                        // {/* </IsNotAuth> */}
                    }
                />
                <Route index path="/reset" element={<ForgetPasswordForm />} />

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
                    <Route index path="/report" element={<Report />} />
                    <Route index path="/settings" element={<Settings />} />
                </Route>
                <Route index path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}
