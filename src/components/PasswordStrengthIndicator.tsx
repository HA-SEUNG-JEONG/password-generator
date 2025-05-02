import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import { StrengthLevel, strengthLevels } from "../utils/strengthLevel";
import zxcvbn from "zxcvbn";

interface PasswordStrength {
    level: string;
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
};

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const getCracklingTime = (password: string) => {
        return zxcvbn(password).crack_times_display
            .offline_fast_hashing_1e10_per_second;
    };

    const initialStrength = (): PasswordStrength => ({
        level: "입력 전",
        score: 0
    });

    const [strength, setStrength] =
        useState<PasswordStrength>(initialStrength());

    const calculateStrength = (password: string): PasswordStrength => {
        if (!password) return initialStrength();

        const crackTime = getCracklingTime(password); // 소문자로 변환

        const crackTimeMapping: { [key: string]: StrengthLevel } = {
            centuries: strengthLevels.find(
                (level) => level.level === "매우 강함"
            )!,
            years: strengthLevels.find((level) => level.level === "강함")!,
            months: strengthLevels.find((level) => level.level === "보통")!,
            days: strengthLevels.find((level) => level.level === "보통")!,
            minutes: strengthLevels.find((level) => level.level === "약함")!,
            seconds: strengthLevels.find(
                (level) => level.level === "매우 취약"
            )!
        };

        const normalizedCrackTime = Object.keys(crackTimeMapping).find((key) =>
            String(crackTime).includes(key)
        );

        const strengthLevel =
            normalizedCrackTime && crackTimeMapping[normalizedCrackTime]
                ? crackTimeMapping[normalizedCrackTime]
                : crackTimeMapping["seconds"]; // 기본값은 "매우 취약"

        return {
            level: strengthLevel.level,
            score: strengthLevel.score
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
                margin: "0 auto"
            })}
        >
            <div
                className={`${strengthStyles.indicator} ${
                    strengthStyles[
                        strength.level.replace(
                            " ",
                            "_"
                        ) as keyof typeof strengthStyles
                    ]
                }`}
            >
                <div className={css({ fontWeight: "bold" })}>
                    {strength.level} ({getCracklingTime(password)})
                </div>
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
