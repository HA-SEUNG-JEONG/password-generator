import { useEffect, useState } from "react";

interface PasswordStrength {
    level: string;
    message: string;
    score: number;
}

interface StrengthLevel {
    level: string;
    message: string;
    color: string;
    minScore: number;
}

const PASSWORD_PATTERNS = {
    SEQUENTIAL: /(123|234|345|456|567|678|789|987|876|765|654|543|432|321)/,
    COMMON_WORDS: /password|123456|qwerty|admin/i,
    MIXED_CHARS: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).$/
};

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const STRENGTH_LEVELS: StrengthLevel[] = [
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
            minScore: 0
        }
    ];

    const CRITERIA_MAP = {
        minLength: {
            test: (pwd: string) => pwd.length >= 8,
            message: "8자 이상"
        },
        recommendedLength: {
            test: (pwd: string) => pwd.length >= 12,
            message: "12자 이상 권장"
        },
        uppercase: {
            test: (pwd: string) => /[A-Z]/.test(pwd),
            message: "대문자"
        },
        lowercase: {
            test: (pwd: string) => /[a-z]/.test(pwd),
            message: "소문자"
        },
        numbers: {
            test: (pwd: string) => /[0-9]/.test(pwd),
            message: "숫자"
        },
        specialChars: {
            test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
            message: "특수문자"
        },
        sequential: {
            test: (pwd: string) => !PASSWORD_PATTERNS.SEQUENTIAL.test(pwd),
            message: "연속된 숫자 제거"
        },
        repeated: {
            test: (pwd: string) => !/(.)\1{2,}/.test(pwd),
            message: "반복된 문자 제거"
        },
        commonWords: {
            test: (pwd: string) => !PASSWORD_PATTERNS.COMMON_WORDS.test(pwd),
            message: "일반적인 패턴 제거"
        },
        mixedChars: {
            test: (pwd: string) => PASSWORD_PATTERNS.MIXED_CHARS.test(pwd),
            message: "문자 조합 다양화"
        }
    };

    const [strength, setStrength] = useState<PasswordStrength>({
        level: "입력 전",
        message: "비밀번호를 입력해주세요",
        score: 0
    });

    const calculatePasswordStrength = (password: string): PasswordStrength => {
        if (!password) {
            return {
                level: "입력 전",
                message: "비밀번호를 입력해주세요",
                score: 0
            };
        }

        const failedCriteria = Object.entries(CRITERIA_MAP)
            .filter(([_, { test }]) => !test(password))
            .map(([_, { message }]) => message);

        const score = Object.values(CRITERIA_MAP).filter(({ test }) =>
            test(password)
        ).length;

        const strengthLevel =
            STRENGTH_LEVELS.find((level) => score >= level.minScore) ||
            STRENGTH_LEVELS[STRENGTH_LEVELS.length - 1];

        if (strengthLevel.level === "매우 강함") {
            return {
                level: strengthLevel.level,
                message: strengthLevel.message,
                score
            };
        }

        if (failedCriteria.length) {
            return {
                level: strengthLevel.level,
                message: `${strengthLevel.message}. 개선사항: ${failedCriteria
                    .slice(0, 3)
                    .join(", ")}`,
                score
            };
        }

        return {
            level: strengthLevel.level,
            message:
                strengthLevel.level === "매우 강함"
                    ? strengthLevel.message
                    : failedCriteria.length
                    ? `${strengthLevel.message}. 개선사항: ${failedCriteria
                          .slice(0, 3)
                          .join(", ")}`
                    : strengthLevel.message,
            score
        };
    };

    useEffect(() => {
        setStrength(calculatePasswordStrength(password));
    }, [password]);

    const currentLevel = STRENGTH_LEVELS.find(
        (level) => level.level === strength.level
    ) || { color: "bg-gray-400" };

    return (
        <div className="space-y-2">
            <div
                className={`p-2 text-white rounded-xl flex justify-center items-center text-sm
                    ${currentLevel.color}`}
            >
                강도: {strength.level}
            </div>
            <div className="text-sm text-gray-600">{strength.message}</div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${currentLevel.color}`}
                    style={{ width: `${(strength.score / 10) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
