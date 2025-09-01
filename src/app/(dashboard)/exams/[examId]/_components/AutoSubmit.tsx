"use client";

import { useEffect } from "react";

type AutoSubmitProps = {
    formRef: React.RefObject<HTMLFormElement>;
    isFinished: boolean;
};

export function AutoSubmit({ formRef, isFinished }: AutoSubmitProps) {
    useEffect(() => {
        if (isFinished) {
            formRef.current?.requestSubmit();
        }
    }, [isFinished]);

    return null;
}


