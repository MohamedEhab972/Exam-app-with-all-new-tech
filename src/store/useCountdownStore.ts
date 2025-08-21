import { create } from "zustand";

type CountdownState = {
    deadline: number | null;
    startCountdown: (seconds: number) => void;
    getTimeLeft: () => number;
};

export const useCountdownStore = create<CountdownState>((set, get) => ({
    deadline: null,

    startCountdown: (seconds) => {
        const deadline = Date.now() + seconds * 1000;
        set({ deadline });
    },

    getTimeLeft: () => {
        const { deadline } = get();
        if (!deadline) return 0;
        return Math.max(0, Math.floor((deadline - Date.now()) / 1000));
    },
}));
