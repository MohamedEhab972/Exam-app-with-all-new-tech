"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    return <Toaster
        position="bottom-right"
        toastOptions={{
            success: {
                duration: 4000,
                className: "geist-mono-regular ",
                style: {
                    background: "#1F2937",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "500",
                    fontStyle: "medium",
                    width: "400px",
                    height: "47px",
                    padding: "16px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                },
                icon: "✅",
            },
            error: {
                duration: 4000,
                style: {
                    background: "#f44336",
                    color: "#fff",
                },
                icon: "❌",
            },
        }}
    />;
};

export default ToastProvider;
