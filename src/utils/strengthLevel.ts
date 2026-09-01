import { Messages } from "../constants/locales/types";

const ENTROPY_WARNING_THRESHOLD = 50;

export interface StrengthLevel {
    level: string;
    message: string;
    color: string;
    colorValue: string;
    score: number;
}

export const buildStrengthLevels = (strengthMessages: Messages["strengthLevels"]): StrengthLevel[] => [
    {
        level: strengthMessages.veryWeak.level,
        message: strengthMessages.veryWeak.message,
        color: "bg-red-600",
        colorValue: "#dc2626",
        score: 0
    },
    {
        level: strengthMessages.weak.level,
        message: strengthMessages.weak.message,
        color: "bg-orange-500",
        colorValue: "#f97316",
        score: 1
    },
    {
        level: strengthMessages.fair.level,
        message: strengthMessages.fair.message,
        color: "bg-yellow-500",
        colorValue: "#eab308",
        score: 2
    },
    {
        level: strengthMessages.strong.level,
        message: strengthMessages.strong.message,
        color: "bg-green-600",
        colorValue: "#16a34a",
        score: 3
    },
    {
        level: strengthMessages.veryStrong.level,
        message: strengthMessages.veryStrong.message,
        color: "bg-blue-600",
        colorValue: "#2563eb",
        score: 4
    }
];

export const getStrengthLabel = (bits: number, strengthMessages: Messages["strengthLevels"]): string => {
    if (bits >= 80) return strengthMessages.veryStrong.level;
    if (bits >= 60) return strengthMessages.strong.level;
    if (bits >= ENTROPY_WARNING_THRESHOLD) return strengthMessages.fair.level;
    return strengthMessages.weak.level;
};
