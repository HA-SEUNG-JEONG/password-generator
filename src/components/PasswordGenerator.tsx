import { useState, useCallback, useRef, useEffect } from "react";
import { generateSecurePassword } from "../utils/passwordGenerator";
import PasswordDisplay from "./PasswordDisplay";
import PasswordOptions from "./options/PasswordOption";
import { css } from "../../styled-system/css";
import { PasswordOptions as PasswordOptionsType } from "../types/password";
import { useDebounce } from "../utils/debounce";
import { DEFAULT_PASSPHRASE_OPTIONS } from "../constants/passwordConfig";
import { ERROR_MESSAGES } from "../constants/messages";
import { usePwnedCheck } from "../hooks/usePwnedCheck";
import { DEBOUNCE_DELAY } from "../constants/timing";

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

const DEFAULT_PASSWORD_OPTIONS: PasswordOptionsType = {
  length: 12,
  lowercase: true,
  uppercase: true,
  numbers: true,
  special: true,
  excludeAmbiguous: false,
  mode: "password",
  passphraseOptions: DEFAULT_PASSPHRASE_OPTIONS
};

const PasswordGenerator = () => {
  // 초기 비밀번호 생성을 lazy initialization으로 처리
  const [password, setPassword] = useState(() => {
    return generateSecurePassword({
      ...DEFAULT_PASSWORD_OPTIONS,
      mode: DEFAULT_PASSWORD_OPTIONS.mode || "password",
      passphraseOptions: DEFAULT_PASSWORD_OPTIONS.passphraseOptions
    });
  });

  const [options, setOptions] = useState<PasswordOptionsType>(DEFAULT_PASSWORD_OPTIONS);

  const [hasEmptyPasswordWarning, setHasEmptyPasswordWarning] = useState(false);
  const {
    isPwned,
    isChecking: isCheckingPwned,
    error: pwnedCheckError,
    checkPassword: checkPwned
  } = usePwnedCheck();

  // 초기 렌더링 여부 추적
  const isInitialMount = useRef(true);

  const handlePasswordGeneration = useCallback(
    (passwordOptions: PasswordOptionsType) => {
      const newPassword = generateSecurePassword({
        ...passwordOptions,
        mode: passwordOptions.mode || "password",
        passphraseOptions: passwordOptions.passphraseOptions
      });

      if (newPassword === "") {
        setHasEmptyPasswordWarning(true);
        setPassword("");
        return;
      }

      setHasEmptyPasswordWarning(false);
      setPassword(newPassword);
      checkPwned(newPassword);
    },
    [checkPwned]
  );

  const debouncedGeneratePassword = useDebounce(
    (passwordOptions: PasswordOptionsType) => {
      handlePasswordGeneration(passwordOptions);
    },
    DEBOUNCE_DELAY.PASSWORD_GENERATION
  );

  const handleGeneratePassword = useCallback(() => {
    handlePasswordGeneration(options);
  }, [options, handlePasswordGeneration]);

  const onChangeOptions = useCallback(
    (newOptions: Partial<PasswordOptionsType>) => {
      setOptions((prevOptions: PasswordOptionsType) => {
        const updatedOptions = {
          ...prevOptions,
          ...newOptions
        };
        debouncedGeneratePassword(updatedOptions);
        return updatedOptions;
      });
    },
    [debouncedGeneratePassword]
  );

  // 초기 마운트 시 한 번만 Pwned 체크
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      checkPwned(password);
    }
  }, [password, checkPwned]);

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
          {ERROR_MESSAGES.PASSWORD_PWNED_WARNING}
        </div>
      )}
      {hasEmptyPasswordWarning && (
        <div className={warningStyles} role="alert">
          {ERROR_MESSAGES.PASSWORD_EMPTY_WARNING}
        </div>
      )}
      <PasswordOptions options={options} onChange={onChangeOptions} />
    </div>
  );
};

export default PasswordGenerator;
