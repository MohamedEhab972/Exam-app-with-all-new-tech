import { FormComponent } from "@/components/ui/form-component";
import React from "react";

export const metadata = {
    title: "Register | Exam App",
    description:
        "Create your account on Exam App and start your learning journey with smart exams and tailored diplomas.",
    openGraph: {
        title: "Register | Exam App",
        description:
            "Create your account on Exam App and start your learning journey with smart exams and tailored diplomas.",
        url: "http://localhost:3000/register", 
        siteName: "Exam App",
        images: [
            {
                url: "https://via.placeholder.com/1200x630.png?text=register", 
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
    return (
        <article className="w-full max-w-md" aria-labelledby="register-title">
            <FormComponent />
        </article>
    );
}
