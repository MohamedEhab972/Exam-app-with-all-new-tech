// CountdownTimer.tsx
"use client";
import { useCountdownStore } from "@/store/useCountdownStore";
import { useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CountdownProgressProps = {
    totalMinutes?: number;
    onFinish?: () => void;
};

const CountdownTimer = ({ totalMinutes, onFinish }: CountdownProgressProps) => {
    const timeLeft = useCountdownStore((s) => s.timeLeft);
    const startCountdown = useCountdownStore((s) => s.startCountdown);
    const tick = useCountdownStore((s) => s.tick);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasFinishedRef = useRef(false);

    useEffect(() => {
        if (!totalMinutes) return;

        startCountdown(totalMinutes * 60);

        intervalRef.current = setInterval(() => {
            const currentTime = useCountdownStore.getState().timeLeft;
            if (currentTime <= 0) {
                if (!hasFinishedRef.current) {
                    hasFinishedRef.current = true;
                    onFinish?.();
                }
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            } else {
                tick();
            }
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [totalMinutes, onFinish, startCountdown, tick]);

    if (!totalMinutes) return null;

    const totalSeconds = totalMinutes * 60;
    const percentage = Math.max(0, Math.min(100, (timeLeft / totalSeconds) * 100));

    return (
        <div className="w-15 h-15">
            <CircularProgressbar
                value={percentage}
                text={`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                    .toString()
                    .padStart(2, "0")}`}
                strokeWidth={15}
                styles={buildStyles({
                    pathColor: "#155DFC",
                    textColor: "#111",
                    trailColor: "#DBEAFE",
                    pathTransitionDuration: 0.5,
                    strokeLinecap: "butt",
                })}
            />
        </div>
    );
};

export default CountdownTimer;
