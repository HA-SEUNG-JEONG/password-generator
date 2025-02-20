export interface StrengthLevel {
    level: string;
    message: string;
    color: string;
    minScore: number;
}

export const strengthLevels: StrengthLevel[] = [
    {
        level: "매우 강함",
        message: "매우 안전한 비밀번호입니다",
        color: "bg-blue-600",
        minScore: 9
    },
    {
        level: "강함",
        message: "안전한 비밀번호입니다",
        color: "bg-green-600",
        minScore: 7
    },
    {
        level: "보통",
        message: "적정 수준의 비밀번호입니다",
        color: "bg-yellow-500",
        minScore: 5
    },
    {
        level: "약함",
        message: "취약한 비밀번호입니다",
        color: "bg-orange-500",
        minScore: 3
    },
    {
        level: "매우 취약",
        message: "매우 취약한 비밀번호입니다",
        color: "bg-red-600",
        minScore: 1
    }
];
