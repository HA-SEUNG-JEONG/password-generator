import { useState, useRef, useCallback } from "react";
import { checkPwnedPassword } from "../utils/passwordGenerator";
import { ERROR_MESSAGES } from "../constants/messages";

/**
 * Pwned 비밀번호 검사를 위한 커스텀 훅
 * Race condition을 방지하기 위해 요청 ID를 사용하여 최신 요청만 처리합니다.
 */
export const usePwnedCheck = () => {
    const [isPwned, setIsPwned] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const requestIdRef = useRef<number>(0);

    const checkPassword = useCallback(async (password: string): Promise<void> => {
        if (!password) {
            setIsPwned(false);
            setIsChecking(false);
            setError(null);
            return;
        }

        // Race condition 방지를 위한 요청 ID 생성
        requestIdRef.current += 1;
        const currentRequestId = requestIdRef.current;

        setIsChecking(true);
        setError(null);

        try {
            const check = await checkPwnedPassword(password);
            // 최신 요청인 경우에만 상태 업데이트
            if (currentRequestId === requestIdRef.current) {
                setIsPwned(check);
            }
        } catch (err) {
            // 최신 요청인 경우에만 에러 상태 업데이트
            if (currentRequestId === requestIdRef.current) {
                const errorMessage = getErrorMessage(err);
                setError(errorMessage);
                setIsPwned(false);
            }
        } finally {
            // 최신 요청인 경우에만 로딩 상태 해제
            if (currentRequestId === requestIdRef.current) {
                setIsChecking(false);
            }
        }
    }, []);

    const reset = useCallback(() => {
        setIsPwned(false);
        setIsChecking(false);
        setError(null);
    }, []);

    return {
        isPwned,
        isChecking,
        error,
        checkPassword,
        reset
    };
};

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return ERROR_MESSAGES.PWNED_CHECK_GENERIC;
};

