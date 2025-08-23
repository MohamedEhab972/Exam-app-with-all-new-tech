import { Suspense } from "react";
import Titlebar from "../_components/titlebar";
import LoadingSubjects from "../loading";
import ExamList from "./_components/exams-list";
import BackButton from "../_components/back-button";
import { getExams } from "@/lib/apis/exams.api";

export default async function Page() {
    const exams = await getExams();

    return (
        <>
            <div className="flex items-center gap-4">
                <BackButton />
                <Titlebar />
            </div>
            <Suspense fallback={<LoadingSubjects />}>
                <ExamList exams={exams} />
            </Suspense>
        </>
    );
}