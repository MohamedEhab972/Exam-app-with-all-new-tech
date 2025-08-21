"use client";
import { useCountdownStore } from "@/store/useCountdownStore";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
    const getTimeLeft = useCountdownStore((s) => s.getTimeLeft);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            const left = getTimeLeft();
            setTimeLeft(left);

            if (left === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [getTimeLeft]);

    return (
        <p className="text-center font-mono font-medium text-[14px] text-gray-600">
            You can request another code in: {timeLeft}s
        </p>
    );
};

export default CountdownTimer;
