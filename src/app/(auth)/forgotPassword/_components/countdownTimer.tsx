"use client";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        setTimeLeft(60);
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p
            className="text-center font-mono font-medium text-[14px] leading-[100%] tracking-[0px] text-gray-600"
        >
            You can request another code in: {timeLeft}s
        </p>
    );
};
export default CountdownTimer;