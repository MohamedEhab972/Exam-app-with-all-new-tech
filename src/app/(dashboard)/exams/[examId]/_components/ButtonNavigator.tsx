"use client";

import { Button } from "@/components/ui/button";

export function ButtonNavigator({
    hasAnswer,
    isLast,
    isLoading,
    onNext,
}: {
    hasAnswer: boolean;
    isLast: boolean;
    isLoading: boolean;
    onNext: () => void;
}) {
    if (!isLast) {
        return (
            <Button
                className="h-12 bg-primary hover:bg-primary/90 text-white font-medium text-[14px] flex-1"
                type="button"
                disabled={!hasAnswer}
                onClick={onNext}
            >
                Next
            </Button>
        );
    }

    return (
        <Button
            disabled={!hasAnswer || isLoading}
            className="h-12 bg-primary hover:bg-primary/90 text-white font-medium text-[14px] flex-1"
            type="submit"
        >
            {isLoading ? "Loading..." : "Submit"}
        </Button>
    );
}
