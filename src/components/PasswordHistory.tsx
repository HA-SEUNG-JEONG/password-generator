import { memo } from "react";
import { css } from "../../styled-system/css";
import CopyIcon from "./CopyIcon";
import { toast } from "react-toastify";
import { useLocale } from "../contexts/LocaleContext";

interface PasswordHistoryProps {
  history: string[];
}

const maskPassword = (password: string): string => {
  if (password.length <= 6) return password;
  return password.slice(0, 3) + "•".repeat(password.length - 6) + password.slice(-3);
};

const PasswordHistory = ({ history }: PasswordHistoryProps) => {
  const { t } = useLocale();

  const handleCopy = async (password: string) => {
    if (!navigator.clipboard) {
      toast.error(t.passwordDisplay.clipboardUnavailable);
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast.success(t.passwordDisplay.copySuccess);
    } catch (error) {
      toast.error(t.passwordDisplay.copyFailed);
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <details
      className={css({
        p: 4,
        borderRadius: "md",
        bg: "muted",
        cursor: "pointer"
      })}
    >
      <summary
        className={css({
          fontWeight: "medium",
          fontSize: "sm",
          color: "text",
          userSelect: "none",
          _hover: {
            opacity: 0.8
          }
        })}
      >
        {t.passwordHistory.title} ({history.length}/10)
      </summary>
      <div
        className={css({
          spaceY: 2,
          mt: 3
        })}
      >
        {history.map((password, index) => (
          <div
            key={`${password}-${index}`}
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              p: 2,
              bg: "card",
              borderRadius: "sm",
              fontSize: "sm"
            })}
          >
            <span
              className={css({
                fontFamily: "monospace",
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              })}
            >
              {maskPassword(password)}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(password)}
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "36px",
                minHeight: "36px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "text",
                borderRadius: "sm",
                padding: 1,
                transition: "all 0.2s",
                _hover: {
                  opacity: 0.8,
                  bg: "muted"
                },
                _focus: {
                  outline: "2px solid",
                  outlineColor: "ring",
                  outlineOffset: "2px"
                }
              })}
              aria-label={`${maskPassword(password)} ${t.passwordDisplay.copyButton}`}
            >
              <CopyIcon aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </details>
  );
};

export default memo(PasswordHistory);
