import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";

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

        const failedCriteriaList = Object.entries(CRITERIA_MAP).filter(
            ([_, { test }]) => !test(password)
        );

        const failedCriteriaMessages = failedCriteriaList.map(
            ([_, { message }]) => message
        );

        const score = Object.values(CRITERIA_MAP).filter(({ test }) =>
            test(password)
        ).length;

        const strengthLevel =
            STRENGTH_LEVELS.find((level) => score >= level.minScore) ||
            STRENGTH_LEVELS[STRENGTH_LEVELS.length - 1];

        const improvementMessage = `${strengthLevel.message}. 개선사항: ${failedCriteriaMessages
            .slice(0, 3)
            .join(", ")}`;

        let finalMessage = "";

        if (
            strengthLevel.level === "매우 강함" ||
            score === strengthLevel.minScore
        ) {
            finalMessage = strengthLevel.message;
        } else if (strengthLevel.level === "강함") {
            finalMessage = improvementMessage;
        } else if (strengthLevel.level === "보통") {
            finalMessage = improvementMessage;
        }
        return {
            level: strengthLevel.level,
            message: finalMessage,
            score
        };
    };

    useEffect(() => {
        setStrength(calculatePasswordStrength(password));
    }, [password]);

    const getStrengthColor = (level: string) => {
        switch (level) {
            case "매우 강함":
                return "blue.600";
            case "강함":
                return "green.600";
            case "보통":
                return "yellow.500";
            case "약함":
                return "orange.500";
            case "매우 취약":
                return "red.600";
            default:
                return "gray.400";
        }
    };

    const strengthIndicatorStyles = css({
        p: "2",
        color: "white",
        borderRadius: "xl",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "sm",
        bg: getStrengthColor(strength.level)
    });

    const progressBarStyles = css({
        h: "1.5",
        transition: "all 300ms",
        bg: getStrengthColor(strength.level)
    });

    return (
        <div
            className={css({
                gap: "2",
                display: "flex",
                flexDirection: "column"
            })}
        >
            <div className={strengthIndicatorStyles}>
                강도: {strength.level}
            </div>
            <div className={css({ fontSize: "sm" })}>{strength.message}</div>
            <div
                className={css({
                    w: "full",
                    bg: "gray.200",
                    h: "1.5",
                    borderRadius: "full",
                    overflow: "hidden"
                })}
            >
                <div
                    className={progressBarStyles}
                    style={{ width: `${(strength.score / 10) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
