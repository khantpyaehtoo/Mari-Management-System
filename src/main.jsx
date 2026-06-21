import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ConfigProvider, App as AntdApp } from "antd";

const config = {
    token: {
        colorPrimary: "#FBB1BD",
        Table: {
            headerBg: "#FBB1BD",
            headerColor: "#fff",
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
                    </AntdApp>
                </ConfigProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
