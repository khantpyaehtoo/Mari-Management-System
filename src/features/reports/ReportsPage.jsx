import { Typography } from "antd";
import SubHeaderSection from "../../components/SubHeaderSection/SubHeaderSection";
import DashboardCard from "../../components/dashboard/DashboardCard";

const items = [
    {
        title: "Total Revenue This Month (June,2026)",
        value: "476K",
    },
    {
        title: "Total Bookings This Month (June,2026)",
        value: "100",
    },
    {
        title: "Total Customers (June,2026)",
        value: "876",
    },
];

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

                <div className="grid-items-4 mx-auto!">
                    {items.map((item, idx) => (
                        <DashboardCard
                            key={idx}
                            title={item.title}
                            value={item.value}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default ReportsPage;
