import { Typography } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import ReportCards from "./ReportCards";

const ReportsPage = () => {
    return (
        <>
            <SubHeaderSection
                title="Reports & Analystics"
                subTitle="View detailed reports and insights about bookings, revenue, and customer activity."
            />

            <section>
                <Typography.Title
                    level={2}
                    className="text-xl! font-medium! px-3 mb-10!"
                >
                    Report Summary (May, 2026)
                </Typography.Title>

                <div className="mx-auto">
                    <ReportCards />
                </div>
            </section>
        </>
    );
};

export default ReportsPage;
