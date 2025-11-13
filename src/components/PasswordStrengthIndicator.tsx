import { strengthLevels, StrengthLevel } from "@/utils/strengthLevel";
import zxcvbn from "zxcvbn";
import { useState, useEffect } from "react";
import { css } from "../../styled-system/css";
import { useDebounce } from "../utils/debounce";

interface PasswordStrengthIndicatorProps {
    password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
    password
}) => {
    const [currentStrength, setCurrentStrength] = useState<StrengthLevel>(strengthLevels[0]);
    const [score, setScore] = useState(0);

    const getStrengthLevel = (score: number): StrengthLevel => {
        return (
            strengthLevels.find((level) => level.score === score) ||
            strengthLevels[0]
        );
    };

    const updateStrength = useDebounce((pwd: string) => {
        const result = zxcvbn(pwd);
        const strength = getStrengthLevel(result.score);
        setScore(result.score);
        setCurrentStrength(strength);
    }, 200);

    useEffect(() => {
        updateStrength(password);
    }, [password, updateStrength]);

    const containerStyles = css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "4"
    });

    const progressBarContainerStyles = css({
        width: "100%",
        backgroundColor: "gray.200",
        borderRadius: "full",
        height: "2.5",
        _dark: {
            backgroundColor: "gray.700"
        }
    });

    const progressBarStyles = css({
        height: "2.5",
        borderRadius: "full",
        transition: "width 0.3s ease",
        width: `${(score + 1) * 20}%`,
        backgroundColor: currentStrength.colorValue
    });

    const messageStyles = css({
        fontSize: "sm",
        marginTop: "2",
        color: "gray.600",
        _dark: {
            color: "gray.300"
        }
    });

    return (
        <div className={containerStyles}>
            <div className={progressBarContainerStyles}>
                <div className={progressBarStyles}></div>
            </div>
            <p className={messageStyles}>
                {currentStrength.message}
            </p>
        </div>
    );
};

export default PasswordStrengthIndicator;
