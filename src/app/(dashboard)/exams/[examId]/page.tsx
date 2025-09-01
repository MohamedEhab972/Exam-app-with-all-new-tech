import { getExamById } from "@/lib/apis/exams.api";
import ExamClient from "./_components/exam-client";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { examId: string } }): Promise<Metadata> {
    const data = await getExamById(params.examId);

    return {
        title: data?.title || "Exam",
        description: `Take the exam: ${data?.title || "Exam details and questions"}`,
    };
}

export default async function Page({ params }: { params: { examId: string } }) {
    const data = await getExamById(params.examId);

    return <ExamClient data={data} />;
}
