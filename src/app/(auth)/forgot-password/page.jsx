import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata = {
    title: "Forgot Password | Exam App",
    description:
        "Reset your password securely on Exam App and continue your learning journey with smart exams and tailored diplomas.",
    openGraph: {
        title: "Forgot Password | Exam App",
        description:
            "Reset your password securely on Exam App and continue your learning journey with smart exams and tailored diplomas.",
        url: "http://localhost:3000/forgot-password",
        siteName: "Exam App",
        images: [
            {
                url: "https://via.placeholder.com/1200x630.png?text=Forgot+Password", 
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
    return (
        <article
            className="w-full max-w-md"
            aria-labelledby="forgot-password-title"
        >
            <ForgotPasswordForm />
        </article>
    );
}
