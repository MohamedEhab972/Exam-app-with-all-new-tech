import React from "react";
import LeftSideAuth from "@/app/(auth)/_components/leftSide-auth";
import { RegisterForm } from "./_components/register-form";

export const metadata = {
    title: "Register | Exam App",
    description:
        "Create your account on Exam App and start your learning journey with smart exams and tailored diplomas.",
    openGraph: {
        title: "Register | Exam App",
        description:
            "Create your account on Exam App and start your learning journey with smart exams and tailored diplomas.",
        url: "https://yourdomain.com/register",
        siteName: "Exam App",
        images: [
            {
                url: "https://yourdomain.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "Exam App Register",
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

    return <RegisterForm />;

}
