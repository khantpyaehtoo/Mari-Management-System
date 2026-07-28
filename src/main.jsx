import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ConfigProvider, App as AntdApp } from "antd";
import { Analytics } from "@vercel/analytics/react";

const config = {
    token: {
        colorPrimary: "#FBB1BD",
        Table: {
            headerBg: "#FBB1BD",
            headerColor: "#fff",
        },
        Form: {
            labelFontSize: 14,
        },
        Input: {
            colorBorder: "transparent",
            colorBorderHover: "transparent",
            activeBorderColor: "transparent",
            controlOutline: "transparent",
            borderRadius: 0,
        },
        DatePicker: {
            colorBorder: "transparent",
            colorBorderHover: "transparent",
            // activeBorderColor: "transparent",
            controlOutline: "transparent",
            borderRadius: 0,
        },
        Dropdown: {
            paddingBlock: 12,
        },
    },
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ConfigProvider theme={config}>
                    <AntdApp>
                        <App />
                        <Analytics />
                    </AntdApp>
                </ConfigProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
