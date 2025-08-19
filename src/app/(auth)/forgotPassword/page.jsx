import React from "react";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata = {
    title: "Forgot Password | Exam App",
    description:
        "Reset your password securely on Exam App and continue your learning journey with smart exams and tailored diplomas.",
    openGraph: {
        title: "Forgot Password | Exam App",
        description:
            "Reset your password securely on Exam App and continue your learning journey with smart exams and tailored diplomas.",
        url: "https://yourdomain.com/forgot-password",
        siteName: "Exam App",
        images: [
            {
                url: "https://yourdomain.com/og-forgot-password.png",
                width: 1200,
                height: 630,
                alt: "Forgot Password - Exam App",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function Page() {
    return <ForgotPasswordForm />;
}
