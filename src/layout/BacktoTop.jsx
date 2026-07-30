import { useEffect } from "react";
import { FloatButton } from "antd";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    // Reset container scroll position on route/page change
    useEffect(() => {
        const el = document.getElementById("main-content-container");
        if (el) {
            el.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <FloatButton.BackTop
            target={() =>
                document.getElementById("main-content-container") || window
            }
            visibilityHeight={100}
            duration={300}
            icon={<ArrowUp size={18} />}
            type="primary"
            tooltip="Back to top"
            style={{
                right: 24,
                bottom: 24,
            }}
        />
    );
};

export default ScrollToTop;
