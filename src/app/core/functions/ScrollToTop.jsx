import { useEffect } from "react";
import { FloatButton } from "antd";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    // Reset container scroll position on route navigation
    useEffect(() => {
        const container = document.getElementById("main-content-container");
        if (container) {
            container.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <FloatButton.BackTop
            // Target the scrollable main content div
            target={() =>
                document.getElementById("main-content-container") || window
            }
            visibilityHeight={200}
            duration={300}
            icon={<ArrowUp size={18} />}
            type="primary"
            tooltip="Back to Top"
            style={{
                right: 32,
                bottom: 32,
                zIndex: 9999,
            }}
        />
    );
};

export default ScrollToTop;
