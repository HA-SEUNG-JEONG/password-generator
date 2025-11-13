import PasswordCharacterOptions from "./PasswordCharacterOptions";
import PasswordLengthControl from "../controls/PasswordControls";
import { css } from "../../../styled-system/css";
import { PasswordOptions as PasswordOptionsType } from "../../types/password";
import { PASSPHRASE_CONFIG } from "../../constants/passwordConfig";
import CheckboxOption from "./CheckboxOption";

interface PasswordOptionsProps {
  options: PasswordOptionsType;
  onChange: (options: Partial<PasswordOptionsType>) => void;
}

const PasswordOptions = ({ options, onChange }: PasswordOptionsProps) => {
  const containerStyles = css({
    spaceY: "4"
  });

  const modeToggleStyles = css({
    display: "flex",
    alignItems: "center",
    gap: "2",
    padding: "2",
    borderRadius: "md",
    border: "2px solid",
    borderColor: "gray.200",
    backgroundColor: "gray.50"
  });

  const modeButtonStyles = (isActive: boolean) =>
    css({
      flex: 1,
      padding: "2",
      borderRadius: "md",
      border: "none",
      cursor: "pointer",
      fontWeight: "medium",
      fontSize: "sm",
      transition: "all 0.2s",
      backgroundColor: isActive ? "blue.500" : "transparent",
      color: isActive ? "white" : "gray.700",
      _hover: {
        backgroundColor: isActive ? "blue.600" : "gray.100"
      },
      _focus: {
        outline: "2px solid",
        outlineColor: "blue.500",
        outlineOffset: "2px"
      }
    });

  const passphraseOptionsStyles = css({
    spaceY: "2",
    padding: "3",
    borderRadius: "md",
    border: "1px solid",
    borderColor: "gray.200",
    backgroundColor: "gray.50"
  });

  const inputStyles = css({
    w: "full",
    padding: "2",
    border: "1px solid",
    borderColor: "gray.300",
    borderRadius: "md",
    fontSize: "sm",
    _focus: {
      outline: "2px solid",
      outlineColor: "blue.500",
      outlineOffset: "2px"
    }
  });

  const labelStyles = css({
    fontSize: "sm",
    fontWeight: "medium",
    color: "text",
    marginBottom: "1"
  });

  const isPassphraseMode = options.mode === "passphrase";
  const passphraseOptions = options.passphraseOptions || {
    words: 5,
    language: "en",
    separator: " ",
    capitalize: false,
    includeNumber: false
  };

  return (
    <div
      className={containerStyles}
      role="group"
      aria-label="비밀번호 생성 옵션"
    >
      <div className={modeToggleStyles}>
        <button
          type="button"
          onClick={() => onChange({ mode: "password" })}
          className={modeButtonStyles(!isPassphraseMode)}
          aria-pressed={!isPassphraseMode}
        >
          비밀번호
        </button>
        <button
          type="button"
          onClick={() => onChange({ mode: "passphrase" })}
          className={modeButtonStyles(isPassphraseMode)}
          aria-pressed={isPassphraseMode}
        >
          Passphrase
        </button>
      </div>

      {isPassphraseMode ? (
        <div className={passphraseOptionsStyles}>
          <div>
            <label className={labelStyles} htmlFor="passphrase-words">
              단어 개수: {passphraseOptions.words || 5}
            </label>
            <input
              id="passphrase-words"
              type="range"
              min={PASSPHRASE_CONFIG.MIN_WORDS_LENGTH}
              max={PASSPHRASE_CONFIG.MAX_WORDS_LENGTH}
              value={passphraseOptions.words || 5}
              onChange={(e) =>
                onChange({
                  passphraseOptions: {
                    ...passphraseOptions,
                    words: Number(e.target.value)
                  }
                })
              }
              className={inputStyles}
            />
          </div>
          <div>
            <label className={labelStyles} htmlFor="passphrase-separator">
              구분자
            </label>
            <input
              id="passphrase-separator"
              type="text"
              value={passphraseOptions.separator || " "}
              onChange={(e) =>
                onChange({
                  passphraseOptions: {
                    ...passphraseOptions,
                    separator: e.target.value
                  }
                })
              }
              className={inputStyles}
              maxLength={1}
              placeholder=" "
            />
          </div>
          <CheckboxOption
            checked={passphraseOptions.capitalize || false}
            onChange={(checked) =>
              onChange({
                passphraseOptions: {
                  ...passphraseOptions,
                  capitalize: checked
                }
              })
            }
            label="단어 첫 글자 대문자화"
            description="각 단어의 첫 글자를 대문자로 변환"
          />
          <CheckboxOption
            checked={passphraseOptions.includeNumber || false}
            onChange={(checked) =>
              onChange({
                passphraseOptions: {
                  ...passphraseOptions,
                  includeNumber: checked
                }
              })
            }
            label="숫자 포함"
            description="랜덤 숫자를 passphrase에 추가"
          />
        </div>
      ) : (
        <>
          <PasswordLengthControl
            length={options.length}
            onLengthChange={(length) => onChange({ length })}
          />
          <PasswordCharacterOptions
            options={options}
            onOptionsChange={onChange}
          />
        </>
      )}
    </div>
  );
};

export default PasswordOptions;
