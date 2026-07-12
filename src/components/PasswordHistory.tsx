import { memo } from "react";
import { css } from "../../styled-system/css";
import CopyIcon from "./CopyIcon";
import { toast } from "react-toastify";

interface PasswordHistoryProps {
  history: string[];
}

const maskPassword = (password: string): string => {
  if (password.length <= 6) return password;
  return password.slice(0, 3) + "•".repeat(password.length - 6) + password.slice(-3);
};

const PasswordHistory = ({ history }: PasswordHistoryProps) => {
  const handleCopy = async (password: string) => {
    if (!navigator.clipboard) {
      toast.error("클립보드 기능을 사용할 수 없습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast.success("비밀번호가 복사되었습니다.");
    } catch (error) {
      toast.error("비밀번호 복사에 실패했습니다.");
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
        생성 이력 ({history.length}/10)
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
              title={password}
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
              aria-label={`${maskPassword(password)} 복사하기`}
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
