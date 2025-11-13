import { useEffect, useState, useCallback } from "react";
import { generateSecurePassword } from "../utils/passwordGenerator";
import PasswordDisplay from "./PasswordDisplay";
import PasswordOptions from "./options/PasswordOption";
import { css } from "../../styled-system/css";
import { PasswordOptions as PasswordOptionsType } from "../types/password";
import { useDebounce } from "../utils/debounce";
import { DEFAULT_PASSPHRASE_OPTIONS } from "../constants/passwordConfig";
import { ERROR_MESSAGES } from "../constants/messages";
import { usePwnedCheck } from "../hooks/usePwnedCheck";

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
    excludeAmbiguous: false,
    mode: "password",
    passphraseOptions: DEFAULT_PASSPHRASE_OPTIONS
  });

  const [hasEmptyPasswordWarning, setHasEmptyPasswordWarning] = useState(false);
  const {
    isPwned,
    isChecking: isCheckingPwned,
    error: pwnedCheckError,
    checkPassword: checkPwned
  } = usePwnedCheck();

  const generatePassword = useCallback(
    (passwordOptions: PasswordOptionsType): string => {
      return generateSecurePassword({
        ...passwordOptions,
        mode: passwordOptions.mode || "password",
        passphraseOptions: passwordOptions.passphraseOptions
      });
    },
    []
  );

  const handlePasswordGeneration = useCallback(
    (passwordOptions: PasswordOptionsType) => {
      const newPassword = generatePassword(passwordOptions);

      if (newPassword === "") {
        setHasEmptyPasswordWarning(true);
        setPassword("");
        return;
      }

      setHasEmptyPasswordWarning(false);
      setPassword(newPassword);
      checkPwned(newPassword);
    },
    [generatePassword, checkPwned]
  );

  const debouncedGeneratePassword = useDebounce(
    (passwordOptions: PasswordOptionsType) => {
      handlePasswordGeneration(passwordOptions);
    },
    500
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

  useEffect(() => {
    handlePasswordGeneration(options);
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
