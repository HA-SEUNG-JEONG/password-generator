import { memo, useMemo } from "react";
import { css } from "styled-system/css";
import CheckboxOption from "./CheckboxOption";
import { CharacterOptions } from "../../types/password";
import { useLocale } from "../../contexts/LocaleContext";

interface PasswordCharacterOptionsProps {
  options: CharacterOptions;
  onOptionsChange: (options: Partial<CharacterOptions>) => void;
}

const PasswordCharacterOptions = ({
  options,
  onOptionsChange
}: PasswordCharacterOptionsProps) => {
  const { t } = useLocale();

  const OPTIONS = useMemo(() => [
    { key: "lowercase" as const, label: t.passwordOptions.lowercase, description: "a-z" },
    { key: "uppercase" as const, label: t.passwordOptions.uppercase, description: "A-Z" },
    { key: "numbers" as const, label: t.passwordOptions.numbers, description: "0-9" },
    { key: "special" as const, label: t.passwordOptions.special, description: "!@#$%^&*" },
    {
      key: "excludeAmbiguous" as const,
      label: t.passwordOptions.excludeAmbiguous,
      description: "l, 1, o, 0, i, O, I"
    }
  ], [t]);

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
    return checkedCount === 1 && options[key as keyof CharacterOptions] === true;
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
      aria-label={t.passwordOptions.optionsLabel}
    >
      {OPTIONS.map(({ key, label, description }) => {
        const isDisabled = isLastOption(key);
        const finalDescription = isDisabled
          ? `${description} (${t.passwordOptions.requireAtLeastOne})`
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
          {t.passwordOptions.customExcludeLabel}
        </label>
        <input
          id="custom-exclude"
          type="text"
          value={options.customExclude || ""}
          onChange={(e) => onOptionsChange({ customExclude: e.target.value })}
          className={inputStyles}
          placeholder={t.passwordOptions.customExcludePlaceholder}
        />
      </div>
    </div>
  );
};

export default memo(PasswordCharacterOptions);
