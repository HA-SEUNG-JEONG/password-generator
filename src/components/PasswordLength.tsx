import { css } from "../../styled-system/css";
import { PASSWORD_LENGTH } from "../constants/passwordConfig";
import { useLocale } from "../contexts/LocaleContext";

const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
  const { t } = useLocale();
  const containerStyles = css({
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontSize: "lg",
    fontWeight: "semibold",
    minWidth: "7rem",
    color:
      passwordLength === 0
        ? "red.700"
        : passwordLength < PASSWORD_LENGTH.MIN ||
            passwordLength > PASSWORD_LENGTH.MAX
          ? "orange.700"
          : "text"
  });

  const lengthDisplayStyles = css({
    minWidth: "7rem"
  });

  const getLengthMessage = (length: number) => {
    if (length < PASSWORD_LENGTH.MIN) {
      return t.passwordOptions.minLength(PASSWORD_LENGTH.MIN);
    }
    if (length > PASSWORD_LENGTH.MAX) {
      return t.passwordOptions.maxLength(PASSWORD_LENGTH.MAX);
    }
    if (length < PASSWORD_LENGTH.RECOMMEND) {
      return t.passwordOptions.lengthDisplay(length, PASSWORD_LENGTH.RECOMMEND);
    }
    return t.passwordOptions.lengthDisplaySimple(length);
  };

  return (
    <div
      className={containerStyles}
      role="status"
      aria-live="polite"
      aria-label={getLengthMessage(passwordLength)}
    >
      <div className={lengthDisplayStyles}>
        {getLengthMessage(passwordLength)}
      </div>
    </div>
  );
};

export default PasswordLength;
