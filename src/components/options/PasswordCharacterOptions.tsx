import { memo } from "react";
import { css } from "styled-system/css";
import CheckboxOption from "./CheckboxOption";
import { CharacterOptions } from "../../types/password";

const OPTIONS = [
  { key: "lowercase" as const, label: "소문자 포함", description: "a-z" },
  { key: "uppercase" as const, label: "대문자 포함", description: "A-Z" },
  { key: "numbers" as const, label: "숫자 포함", description: "0-9" },
  { key: "special" as const, label: "특수문자 포함", description: "!@#$%^&*" },
  {
    key: "excludeAmbiguous" as const,
    label: "모호한 문자 제외",
    description: "l, 1, o, 0, i, O, I"
  }
];

interface PasswordCharacterOptionsProps {
  options: CharacterOptions;
  onOptionsChange: (options: Partial<CharacterOptions>) => void;
}

const PasswordCharacterOptions = ({
  options,
  onOptionsChange
}: PasswordCharacterOptionsProps) => {
  const containerStyles = css({
    spaceY: "2"
  });

  // Count checked character options (excluding excludeAmbiguous)
  const checkedCount = [
    options.lowercase,
    options.uppercase,
    options.numbers,
    options.special
  ].filter(Boolean).length;

  const isLastOption = (key: string) => {
    // Only main character options can be last, not excludeAmbiguous
    if (key === "excludeAmbiguous") return false;
    return checkedCount === 1 && options[key as keyof CharacterOptions];
  };

  const labelStyles = css({
    fontSize: "sm",
    fontWeight: "medium",
    color: "text",
    marginBottom: "1"
  });

  const inputStyles = css({
    w: "full",
    padding: "2",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "md",
    fontSize: "sm",
    _focus: {
      outline: "2px solid",
      outlineColor: "primary",
      outlineOffset: "2px"
    }
  });

  return (
    <div
      className={containerStyles}
      role="group"
      aria-label="비밀번호 문자 옵션"
    >
      {OPTIONS.map(({ key, label, description }) => {
        const isDisabled = isLastOption(key);
        const finalDescription = isDisabled
          ? `${description} (최소 1개 옵션 필수)`
          : description;

        return (
          <CheckboxOption
            key={key}
            checked={options[key]}
            onChange={(checked) => {
              if (!isDisabled || checked) {
                onOptionsChange({ [key]: checked });
              }
            }}
            label={label}
            description={finalDescription}
            disabled={isDisabled}
          />
        );
      })}
      <div className={css({ spaceY: "1" })}>
        <label className={labelStyles} htmlFor="custom-exclude">
          제외할 문자
        </label>
        <input
          id="custom-exclude"
          type="text"
          value={options.customExclude || ""}
          onChange={(e) => onOptionsChange({ customExclude: e.target.value })}
          className={inputStyles}
          placeholder="제외할 문자를 입력하세요 (예: !@#)"
        />
      </div>
    </div>
  );
};

export default memo(PasswordCharacterOptions);
