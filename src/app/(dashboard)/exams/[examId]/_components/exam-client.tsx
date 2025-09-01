"use client";

import { Exam } from "@/types/exams";
import Progressbar from "./progressbar";
import QuestionsForm from "./questions-form";
import ExamResult from "./result-component";
import { useExamStore } from "@/store/useExamStore";
import { ResultData } from "@/types/result";
import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";

export default function ExamClient({ data }: { data: Exam }) {
    const { result, setResult } = useExamStore();

    return (
        <>
            <div className="p-6 pb-4">
                <Progressbar data={data} />
            </div>
            {result ?
                <div className="p-6 flex flex-col gap-4">
                    <ExamResult data={result as ResultData} />
                    <div className="flex gap-4 geist-mono-medium text-[14px] pt-6">
                        <Button onClick={() => setResult(null)} className="flex-1 rounded-none bg-gray-200 text-black hover:bg-gray-300 flex gap-[10px]" type="button"><RotateCcw /> Restart</Button>
                        <Button className="flex-1 rounded-none bg-primary text-white hover:bg-primary/90 flex gap-[10px]" type="button"><FolderSearch /> Explore</Button>
                    </div>
                </div>
                : (
                    <QuestionsForm data={data} />
                )}
        </>
    );
}
