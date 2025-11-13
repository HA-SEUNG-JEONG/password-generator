import { useState, memo } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { css } from "../../styled-system/css";
import CopyIcon from "./CopyIcon";
import RefreshIcon from "./RefreshIcon";

interface PasswordDisplayProps {
  password: string;
  onRefresh: () => void;
}

const PasswordDisplay = ({ password, onRefresh }: PasswordDisplayProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordCopy = async () => {
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

  return (
    <div
      className={css({
        p: 6,
        display: "flex",
        flexDirection: "column",
        gap: 4
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          borderRadius: "md",
          bg: "muted",
          position: "relative"
        })}
      >
        <div
          className={css({
            fontSize: "lg",
            fontWeight: "medium",
            wordBreak: "break-all",
            textAlign: "center",
            p: 2,
            borderRadius: "md",
            bg: "card",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            userSelect: "none"
          })}
        >
          <div
            className={css({
              width: "100%",
              textAlign: "center"
            })}
          >
            {password ? (
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                tabIndex={-1}
                aria-label="생성된 비밀번호"
                className={css({
                  width: "100%",
                  textAlign: "center",
                  border: "none",
                  color: "text",
                  fontFamily: "monospace",
                  outline: "none",
                  bg: "transparent"
                })}
              />
            ) : (
              "비밀번호를 생성해주세요"
            )}
          </div>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className={css({
              position: "absolute",
              right: "2",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2",
              display: "flex",
              alignItems: "center",
              color: "text", // Add this line
              _hover: {
                opacity: 0.8
              },
              _focus: {
                outline: "2px solid",
                outlineColor: "blue.500",
                outlineOffset: "2px"
              }
            })}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <img
              src={showPassword ? EyeOff : EyeOn}
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>

      <PasswordStrengthIndicator password={password} />

      <div
        className={css({
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            base: "1fr",
            sm: "repeat(auto-fit, minmax(120px, 1fr))"
          },
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto"
        })}
      >
        <button
          type="button"
          onClick={handlePasswordCopy}
          disabled={!password}
          className={css({
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            minWidth: "120px",
            background: "primary",
            borderRadius: "full",
            px: 4,
            py: 2,
            fontWeight: "bold",
            color: "primary-foreground",
            border: "none",
            cursor: "pointer",
            fontSize: "sm",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.2s",
            _hover: {
              background: "primary-hover",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }
          })}
          aria-label="비밀번호 복사하기"
        >
          <CopyIcon />
          복사하기
        </button>
        <button
          type="button"
          onClick={onRefresh}
          className={css({
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            minWidth: "120px",
            background: "secondary",
            borderRadius: "full",
            px: 4,
            py: 2,
            fontWeight: "bold",
            color: "secondary-foreground",
            border: "none",
            cursor: "pointer",
            fontSize: "sm",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.2s",
            _hover: {
              background: "secondary-hover",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }
          })}
          aria-label="새로운 비밀번호 생성하기"
        >
          <RefreshIcon />
          새로 생성
        </button>
        <KakaoButton
          options={{
            objectType: "text",
            text: `비밀번호 생성기를 사용해보세요!`,
            link: {
              webUrl: window.location.href
            }
          }}
        />
      </div>
    </div>
  );
};

export default memo(PasswordDisplay);
