import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import { criteriaMap } from "../utils/criteria";
import { StrengthLevel, strengthLevels } from "../utils/strengthLevel";

interface PasswordStrength {
    level: string;
    message: string;
    score: number;
}

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const initialStrength = (): PasswordStrength => ({
        level: "입력 전",
        message: "비밀번호를 입력해주세요",
        score: 0
    });

    const [strength, setStrength] =
        useState<PasswordStrength>(initialStrength());

    const calculateStrength = (pwd: string): PasswordStrength => {
        if (!pwd) return initialStrength();

        const failedCriteria = getFailedCriteria(pwd);
        const score = Object.values(criteriaMap).filter(({ test }) =>
            test(pwd)
        ).length;

        const strengthLevel =
            strengthLevels.find((level) => score >= level.minScore) ||
            strengthLevels[strengthLevels.length - 1];
        const improvementMessage = getImprovementMessage(
            strengthLevel,
            failedCriteria
        );

        return {
            level: strengthLevel.level,
            message: improvementMessage,
            score
        };
    };

    const getFailedCriteria = (pwd: string) => {
        return Object.entries(criteriaMap)
            .filter(([_, { test }]) => !test(pwd))
            .map(([_, { message }]) => message);
    };

    const getImprovementMessage = (
        strengthLevel: StrengthLevel,
        failedCriteriaMessages: string[]
    ) => {
        const improvementMessage = `${strengthLevel.message}. 개선사항: ${failedCriteriaMessages.slice(0, 3).join(", ")}`;
        return strengthLevel.level === "매우 강함" ||
            strength.score === strengthLevel.minScore
            ? strengthLevel.message
            : improvementMessage;
    };

    useEffect(() => {
        setStrength(calculateStrength(password));
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
