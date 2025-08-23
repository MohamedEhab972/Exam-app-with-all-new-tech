import { Suspense } from "react";
import LoadingSubjects from "./loading";
import SubjectsList from "./_components/subjects-list";
import Titlebar from "./_components/titlebar";
import { fetchSubjects } from "@/lib/apis/diplomas.api";


export default async function Page() {
    const data = await fetchSubjects();

    return (
        <>
            <Suspense fallback={<LoadingSubjects />}>
                <Titlebar />
                <SubjectsList subjects={data.subjects} metadata={data.metadata} message={data.message} />
            </Suspense>
        </>
    );
}
