import { create } from "zustand";

type CountdownState = {
    deadline: number | null;
    timeLeft: number;
    isFinished: boolean;
    startCountdown: (seconds: number) => void;
    tick: () => void;
    resetCountdown: () => void;
};

export const useCountdownStore = create<CountdownState>((set, get) => ({
    deadline: null,
    timeLeft: 0,
    isFinished: false,

    startCountdown: (seconds) => {
        const deadline = Date.now() + seconds * 1000;
        set({ deadline, timeLeft: seconds, isFinished: false });
    },

    tick: () => {
        const { deadline } = get();
        if (!deadline) return set({ timeLeft: 0, isFinished: true });

        const left = Math.max(0, Math.floor((deadline - Date.now()) / 1000));

        set({
            timeLeft: left,
            isFinished: left === 0,
        });
    },

    resetCountdown: () =>
        set({ deadline: null, timeLeft: 0, isFinished: false }),
}));
