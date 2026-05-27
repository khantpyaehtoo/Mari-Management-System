import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import User from "./pages/User";
import Staff from "./pages/Staff";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Booking from "./pages/Booking";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/auth/LoginForm";
import PageNotFound from "./pages/PageNotFound";
import ForgetPasswordForm from "./pages/auth/ForgetPasswordForm";

export default function App() {
    return (
        <Routes>
            <Route index path="/login" element={<LoginForm />} />
            <Route index path="/reset" element={<ForgetPasswordForm />} />

            <Route path="/" element={<MainLayout />}>
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
    );
}
