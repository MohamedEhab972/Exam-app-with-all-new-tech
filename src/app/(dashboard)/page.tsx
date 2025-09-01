import { Suspense } from "react";
import LoadingSubjects from "./loading";
import SubjectsList from "./_components/subjects-list";
import { fetchSubjects } from "@/lib/apis/diplomas.api";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Diploma Subjects",
    description: "Browse the list of available diploma subjects and details.",
    keywords: ["diploma", "subjects", "education", "courses"],
    openGraph: {
        title: "Diploma Subjects",
        description: "Browse the list of available diploma subjects and details.",
        type: "website",
        url: "https://yourdomain.com/diploma",
        images: [
            {
                url: "https://yourdomain.com/images/diploma-og.png",
                width: 1200,
                height: 630,
                alt: "Diploma Subjects",
            },
        ],
    },
};

export default async function Page() {
    const data = await fetchSubjects();

    return (
        <Suspense fallback={<LoadingSubjects />}>
            <SubjectsList
                subjects={data.subjects}
                metadata={data.metadata}
                message={data.message}
            />
        </Suspense>
    );
}
