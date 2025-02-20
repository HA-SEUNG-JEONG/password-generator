import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import { criteriaMap } from "../utils/criteria";
import { StrengthLevel, strengthLevels } from "../utils/strengthLevel";

interface PasswordStrength {
    level: string;
    message: string;
    score: number;
}

const strengthStyles = {
    base: css({
        h: "1.5",
        transition: "all 300ms"
    }),
    indicator: css({
        p: "2",
        color: "white",
        borderRadius: "xl",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "sm"
    }),
    매우_강함: css({ bg: "blue.600" }),
    강함: css({ bg: "green.600" }),
    보통: css({ bg: "yellow.500" }),
    약함: css({ bg: "orange.500" }),
    매우_취약: css({ bg: "red.600" }),
    "입력 전": css({ bg: "gray.400" })
} as const;

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

    return (
        <div
            className={css({
                gap: "2",
                display: "flex",
                flexDirection: "column"
            })}
        >
            <div
                className={`${strengthStyles.indicator} ${strengthStyles[strength.level.replace(" ", "_") as keyof typeof strengthStyles]}`}
            >
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
                    className={`${strengthStyles.base} ${strengthStyles[strength.level.replace(" ", "_") as keyof typeof strengthStyles]}`}
                    style={{ width: `${(strength.score / 10) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
