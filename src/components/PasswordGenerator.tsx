// components/PasswordGenerator/index.tsx
import { useEffect, useState, useCallback } from "react";
import { checkPwnedPassword, generateSecurePassword } from "../utils/password";
import PasswordDisplay from "./PasswordDisplay";
import PasswordOptions from "./options/PasswordOption";
import { css } from "../../styled-system/css";
import { PasswordOptions as PasswordOptionsType } from "../types/password";
import { useDebounce } from "../utils/debounce";

const containerStyles = css({
  spaceY: "1.5",
  display: "flex",
  flexDirection: "column",
  padding: "3"
});

const warningStyles = css({
  fontSize: "sm",
  color: "red.500"
});

const loadingStyles = css({
  fontSize: "sm",
  color: "gray.600",
  display: "flex",
  alignItems: "center",
  gap: 2
});

const errorStyles = css({
  fontSize: "sm",
  color: "orange.500"
});

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptionsType>({
    length: 12,
    lowercase: true,
    uppercase: true,
    numbers: true,
    special: true,
    excludeAmbiguous: false
  });

  const [isPwned, setIsPwned] = useState<boolean>(false);
  const [isCheckingPwned, setIsCheckingPwned] = useState<boolean>(false);
  const [pwnedCheckError, setPwnedCheckError] = useState<string | null>(null);
  const [hasEmptyPasswordWarning, setHasEmptyPasswordWarning] = useState(false);

  const generateAndCheckPassword = useCallback(
    async (passwordOptions: PasswordOptionsType) => {
      const newPassword = generateSecurePassword(passwordOptions);

      if (newPassword === "") {
        setPwnedCheckError(null);
        setHasEmptyPasswordWarning(true);
        setPassword("");
        setIsPwned(false);
        setIsCheckingPwned(false);
        return;
      }

      setHasEmptyPasswordWarning(false);
      setPassword(newPassword);
      setIsCheckingPwned(true);
      setPwnedCheckError(null);

      try {
        const check = await checkPwnedPassword(newPassword);
        setIsPwned(check ?? false);
      } catch (error) {
        const errorMessage =
          error instanceof Error && error.message.includes("429")
            ? "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요."
            : error instanceof Error && error.message.includes("network")
              ? "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요."
              : "비밀번호 보안 검사 중 오류가 발생했습니다.";
        setPwnedCheckError(errorMessage);
        setIsPwned(false);
      } finally {
        setIsCheckingPwned(false);
      }
    },
    []
  );

  const debouncedCheckPwned = useDebounce(
    (passwordOptions: PasswordOptionsType) => {
      generateAndCheckPassword(passwordOptions);
    },
    500
  );

  const handleGeneratePassword = useCallback(() => {
    generateAndCheckPassword(options);
  }, [options, generateAndCheckPassword]);

  const onChangeOptions = useCallback(
    (newOptions: Partial<PasswordOptionsType>) => {
      setOptions((prevOptions: PasswordOptionsType) => {
        const updatedOptions = {
          ...prevOptions,
          ...newOptions
        };
        const newPassword = generateSecurePassword(updatedOptions);
        setPassword(newPassword);
        debouncedCheckPwned(updatedOptions);
        return updatedOptions;
      });
    },
    [debouncedCheckPwned]
  );

  useEffect(() => {
    generateAndCheckPassword(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={containerStyles}>
      <PasswordDisplay password={password} onRefresh={handleGeneratePassword} />
      {isCheckingPwned && (
        <div className={loadingStyles} role="status" aria-live="polite">
          <span
            className={css({
              display: "inline-block",
              width: "12px",
              height: "12px",
              border: "2px solid",
              borderColor: "gray.300",
              borderTopColor: "gray.600",
              borderRadius: "full",
              animation: "spin 0.6s linear infinite"
            })}
          />
          비밀번호 보안 검사 중...
        </div>
      )}
      {pwnedCheckError && (
        <div className={errorStyles} role="alert">
          {pwnedCheckError}
        </div>
      )}
      {!isCheckingPwned && !pwnedCheckError && isPwned && (
        <div className={warningStyles} role="alert">
          이 비밀번호는 데이터 유출 사고에 노출되었을 수 있습니다. 다른
          비밀번호를 사용하거나, 이 비밀번호를 사용하는 다른 서비스의 비밀번호를
          변경하세요.
        </div>
      )}
      {hasEmptyPasswordWarning && (
        <div className={warningStyles} role="alert">
          최소 하나 이상의 문자 유형을 선택해야 합니다.
        </div>
      )}
      <PasswordOptions options={options} onChange={onChangeOptions} />
    </div>
  );
};

export default PasswordGenerator;
