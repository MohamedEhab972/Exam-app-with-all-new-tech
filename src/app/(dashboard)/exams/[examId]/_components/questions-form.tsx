"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { getQuestionsByExamId } from "@/lib/apis/exams.api";
import { Exam } from "@/types/exams";
import { Question } from "@/types/question";
import { useExamStore } from "@/store/useExamStore";
import CountdownTimer from "@/components/shared/countdownTimer";
import { useCountdownStore } from "@/store/useCountdownStore";
import { useCheckAnswers } from "../_hooks/useCheckAnswers";
import { ButtonNavigator } from "./ButtonNavigator";
import { AutoSubmit } from "./AutoSubmit";

type FormValues = {
    answers: {
        [questionId: string]: string;
    };
};

export default function QuestionsForm({ data }: { data?: Exam }) {
    const checkAnswersMutation = useCheckAnswers();
    const [questions, setQuestions] = useState<Question[]>([]);
    const { control, handleSubmit, watch, formState: { isSubmitting }, } = useForm<FormValues>({
        defaultValues: { answers: {} },
    });

    const {
        currentIndex,
        nextQuestion,
        prevQuestion,
        setCurrentIndex,
        settotalQuestions,
    } = useExamStore();

    const { resetCountdown, timeLeft, isFinished } = useCountdownStore();
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (!data?._id) return;

        getQuestionsByExamId(data._id)
            .then((res) => {
                setQuestions(res);
                setCurrentIndex(0);
                settotalQuestions(res.length);
            })
            .catch(console.error);
    }, [data?._id, setCurrentIndex, settotalQuestions]);

    useEffect(() => {
        return () => {
            resetCountdown();
        };
    }, [resetCountdown]);

    if (!data?._id) return <p>No exam selected</p>;
    if (!questions.length) return <p>Loading questions...</p>;

    const currentQuestion = questions[currentIndex];
    const selectedAnswer = watch(`answers.${currentQuestion._id}`);

    const onSubmit = (values: FormValues) => {
        const formattedAnswers = Object.entries(values.answers).map(
            ([questionId, correct]) => ({
                questionId,
                correct,
            })
        );

        const payload = {
            answers: formattedAnswers,
            time: timeLeft,
        };

        const setResult = useExamStore.getState().setResult;

        checkAnswersMutation.mutate(payload, {
            onSuccess: (data) => {
                setResult(data);
            },
            onError: (err) => {
                console.error("Check answers error:", err);
            },
        });
    };

    const handleNext = () => {
        if (!selectedAnswer) return;
        nextQuestion();
    };


    return (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Question */}
            <h2 className="geist-mono-semibold text-primary mb-4">
                {currentQuestion.question}
            </h2>

            {/* Options */}
            <Controller
                key={currentQuestion._id}
                control={control}
                name={`answers.${currentQuestion._id}`}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        className="space-y-3"
                    >
                        {currentQuestion.answers.map((option) => (
                            <div
                                key={option.key}
                                className="flex items-center space-x-2 p-4 geist-mono-regular h-[50px] bg-gray-50 hover:bg-gray-100 rounded-md"
                            >
                                <RadioGroupItem
                                    value={option.key}
                                    id={`${currentQuestion._id}-${option.key}`}
                                />
                                <Label htmlFor={`${currentQuestion._id}-${option.key}`}>
                                    {option.answer}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />

            {/* Navigation */}
            <div className="mt-6 flex justify-between gap-4">
                {/* Previous */}
                <Button
                    className="h-12 font-medium text-[14px] flex-1"
                    type="button"
                    variant="outline"
                    disabled={currentIndex === 0}
                    onClick={prevQuestion}
                >
                    Previous
                </Button>

                {/* Timer */}
                <CountdownTimer totalMinutes={data.duration} />

                {/* Next / Submit */}
                <ButtonNavigator
                    hasAnswer={!!selectedAnswer}
                    isLast={currentIndex === questions.length - 1}
                    isLoading={checkAnswersMutation.isPending || isSubmitting}
                    onNext={handleNext}
                />
            </div>

            <AutoSubmit formRef={formRef} isFinished={isFinished} />
        </form>
    );
}
