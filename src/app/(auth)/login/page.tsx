import React from 'react'
import { LoginForm } from './_components/login-form'

export const metadata = {
    title: "Login | Exam App",
    description: "Login to Exam App and empower your learning journey with smart exams and tailored diplomas.",
    openGraph: {
        title: "Login | Exam App",
        description: "Login to Exam App and empower your learning journey with smart exams and tailored diplomas.",
        url: "https://yourdomain.com/login",
        siteName: "Exam App",
        images: [
            {
                url: "https://yourdomain.com/og-image.png",
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

    return <LoginForm />

}
