import { strengthLevels, StrengthLevel } from "@/utils/strengthLevel";
import zxcvbn from "zxcvbn";
import { useState, useEffect, useRef, useCallback } from "react";
import { css } from "../../styled-system/css";
import { useDebounce } from "../utils/debounce";
import { DEBOUNCE_DELAY } from "../constants/timing";

interface PasswordStrengthIndicatorProps {
    password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
    password
}) => {
    const [currentStrength, setCurrentStrength] = useState<StrengthLevel>(strengthLevels[0]);
    const [score, setScore] = useState(0);

    const getStrengthLevel = useCallback((score: number): StrengthLevel => {
        return (
            strengthLevels.find((level) => level.score === score) ||
            strengthLevels[0]
        );
    }, []);

    // useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
    const updateStrengthCallback = useCallback((pwd: string) => {
        if (!pwd) {
            setScore(0);
            setCurrentStrength(strengthLevels[0]);
            return;
        }
        const result = zxcvbn(pwd);
        const strength = getStrengthLevel(result.score);
        setScore(result.score);
        setCurrentStrength(strength);
    }, [getStrengthLevel]);

    const updateStrength = useDebounce(
        updateStrengthCallback,
        DEBOUNCE_DELAY.STRENGTH_CHECK
    );

    // debounce된 함수를 ref로 관리하여 의존성 배열에서 제외
    const updateStrengthRef = useRef(updateStrength);
    
    useEffect(() => {
        updateStrengthRef.current = updateStrength;
    }, [updateStrength]);

    useEffect(() => {
        updateStrengthRef.current(password);
    }, [password]);

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
        <div 
            className={containerStyles}
            id="password-strength"
            role="status"
            aria-live="polite"
            aria-label={`비밀번호 강도: ${currentStrength.message}`}
        >
            <div 
                className={progressBarContainerStyles}
                role="progressbar"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="비밀번호 강도 수준"
            >
                <div className={progressBarStyles}></div>
            </div>
            <p className={messageStyles}>
                {currentStrength.message}
            </p>
        </div>
    );
};

export default PasswordStrengthIndicator;
