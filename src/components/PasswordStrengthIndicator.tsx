import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import { StrengthLevel, strengthLevels } from "../utils/strengthLevel";
import zxcvbn from "zxcvbn";

interface PasswordStrength {
    level: string;
    score: number;
    feedback: string;
}

const strengthStyles: { [key: string]: string } = {
    base: css({
        h: "1.5",
        transition: "all 300ms",
    }),
    indicator: css({
        p: "2",
        color: "white",
        borderRadius: "xl",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "sm",
    }),
    "매우 강함": css({ bg: "blue.600" }),
    강함: css({ bg: "green.600" }),
    보통: css({ bg: "yellow.500" }),
    약함: css({ bg: "orange.500" }),
    "매우 취약": css({ bg: "red.600" }),
    "입력 전": css({ bg: "gray.400" })
};

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const initialStrength = (): PasswordStrength => ({
        level: "입력 전",
        score: 0,
        feedback: "비밀번호를 입력해주세요."
    });

    const [strength, setStrength] =
        useState<PasswordStrength>(initialStrength());

    const calculateStrength = (password: string): PasswordStrength => {
        if (!password) return initialStrength();

        const result = zxcvbn(password);
        const score = result.score;

        const strengthLevel = 
            strengthLevels.find(level => level.score === score) || 
            strengthLevels[strengthLevels.length - 1];

        return {
            level: strengthLevel.level,
            score: strengthLevel.score,
            feedback: result.feedback.suggestions.join(" ") || ""
        };
    };

    useEffect(() => {
        setStrength(calculateStrength(password));
    }, [password]);

    return (
        <div
            className={css({
                gap: "2",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
            })}
        >
            <div
                className={`${strengthStyles.indicator} ${
                    strengthStyles[strength.level]
                }`}
            >
                <div className={css({ fontWeight: "bold" })}>
                    {strength.level}
                </div>
            </div>
            {strength.feedback && (
                <div className={css({ fontSize: "sm", color: "gray.600" })}>
                    {strength.feedback}
                </div>
            )}
        </div>
    );
};

export default PasswordStrengthIndicator;
