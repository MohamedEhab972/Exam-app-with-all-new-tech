import React from "react";
import { LoginForm } from "./_components/login-form";

export const metadata = {
    title: "Login | Exam App",
    description:
        "Login to Exam App and empower your learning journey with smart exams and tailored diplomas.",
    openGraph: {
        title: "Login | Exam App",
        description:
            "Login to Exam App and empower your learning journey with smart exams and tailored diplomas.",
        url: "http://localhost:3000/login",
        siteName: "Exam App",
        images: [
            {
                url: "https://via.placeholder.com/1200x630.png?text=login",
                width: 1200,
                height: 630,
                alt: "Exam App Login",
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
    return (
        <article className="w-full max-w-md" aria-labelledby="login-title">
            <LoginForm />
        </article>
    );
}
