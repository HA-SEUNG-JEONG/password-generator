import PasswordCharacterOptions from "./PasswordCharacterOptions";
import PasswordLengthControl from "../controls/PasswordControls";
import { css } from "../../../styled-system/css";
import { PasswordOptions as PasswordOptionsType } from "../../types/password";

const PASSPHRASE_CONFIG = {
  MIN_WORDS_LENGTH: 3,
  MAX_WORDS_LENGTH: 10
} as const;

interface PasswordOptionsProps {
  options: PasswordOptionsType;
  onChange: (options: Partial<PasswordOptionsType>) => void;
}

const PasswordOptions = ({ options, onChange }: PasswordOptionsProps) => {
  const containerStyles = css({
    spaceY: "4"
  });

  const separatorOptions = [
    { value: "-", label: "하이픈 (-)" },
    { value: " ", label: "공백 ( )" },
    { value: ".", label: "마침표 (.)" },
    { value: ",", label: "쉼표 (,)" },
    { value: "_", label: "언더스코어 (_)" }
  ];

  const handlePassphraseOptionChange = (key: string, value: any) => {
    onChange({
      passphraseOptions: {
        ...options.passphraseOptions,
        [key]: value
      }
    });
  };

  return (
    <div
      className={containerStyles}
      role="group"
      aria-label="비밀번호 생성 옵션"
    >
      <PasswordLengthControl
        length={options.length}
        onLengthChange={(length) => onChange({ length })}
      />
      <PasswordCharacterOptions options={options} onOptionsChange={onChange} />
    </div>
  );
};

export default PasswordOptions;
