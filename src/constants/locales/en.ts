import { Messages } from "./types";

const messages: Messages = {
  app: {
    darkModeLabel: "Switch to dark mode",
    lightModeLabel: "Switch to light mode",
  },
  passwordDisplay: {
    clipboardUnavailable: "Clipboard functionality is unavailable.",
    copySuccess: "Copied ✓",
    copyFailed: "Failed to copy password.",
    generatePassword: "Generate a password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    copyButton: "Copy",
    copiedButton: "Copied ✓",
    refreshButton: "Generate",
    passphraseStrengthLabel: (strength: string) =>
      `Passphrase strength: ${strength}`,
    entropyLevelAriaLabel: "Passphrase entropy level",
    strengthLevelAriaLabel: "Password strength level",
  },
  passwordGenerator: {
    securityCheckInProgress: "Checking password security...",
  },
  passwordHistory: {
    title: "History",
    noHistory: "No history",
  },
  passwordOptions: {
    mode: "Mode",
    passwordMode: "Password",
    passphraseMode: "Passphrase",
    length: "Length",
    words: "Words",
    separator: "Separator",
    lowercase: "Lowercase",
    uppercase: "Uppercase",
    numbers: "Numbers",
    special: "Special characters",
    excludeAmbiguous: "Exclude ambiguous characters",
    customExclude: "Exclude characters",
    capitalize: "Capitalize",
    includeNumber: "Include number",
    optionsLabel: "Password generation options",
    wordsLabel: (count: number) => `Word count: ${count}`,
    securityLevel: (level: string, entropy: number, isWeak: boolean) =>
      `Security level: ${level} (${entropy.toFixed(1)} bits)${isWeak ? " ⚠ 4+ words recommended" : ""}`,
    separatorLabel: "Separator",
    space: "Space",
    custom: "Custom",
    customSeparatorLabel: "Custom separator",
    capitalizeLabel: "Capitalize first letter",
    capitalizeDesc: "Convert the first letter of each word to uppercase",
    includeNumberLabel: "Include number",
    includeNumberDesc: "Add a random number to the passphrase",
    minLength: (min: number) => `Minimum ${min} characters`,
    maxLength: (max: number) => `Maximum ${max} characters`,
    lengthDisplay: (length: number, recommend: number) =>
      `Password length: ${length} characters (recommended: ${recommend}+ characters)`,
    lengthDisplaySimple: (length: number) => `Password length: ${length} characters`,
    requireAtLeastOne: "At least 1 option required",
    customExcludeLabel: "Exclude characters",
    customExcludePlaceholder: "Enter characters to exclude (e.g. !@#)",
    lengthControlLabel: "Password length control",
    lengthControlDescription: (min: number, max: number) =>
      `You can adjust the password length between ${min} and ${max} characters.`,
    lengthInputLabel: "Password length",
    lengthSliderLabel: "Password length slider",
  },
  kakao: {
    apiKeyNotSet: "Kakao API key is not configured.",
    sdkLoadFailed: "Failed to load Kakao SDK.",
    initializationFailed: "Kakao SDK initialization failed",
    shareText: "Try the password generator!",
    missingShareText: "There is nothing to share.",
  },
  errors: {
    tooManyRequests: "Too many requests. Please try again later.",
    networkError: "Network error occurred. Please check your internet connection.",
    pwnedCheckGeneric: "An error occurred while checking password security.",
    emptyPasswordWarning: "You must select at least one character type.",
    passwordPwnedWarning:
      "This password may have been exposed in a data breach. Use a different password or change the password for other services using this password.",
    passphraseWordsRange: (min: number, max: number) =>
      `Words must be between ${min} and ${max}.`,
    passwordLengthMax: (max: number) => `Password must not exceed ${max} characters.`,
  },
  locale: {
    ariaLabel: "Switch language",
  },
  strengthLevels: {
    veryWeak: {
      level: "Very weak",
      message: "Very weak password",
    },
    weak: {
      level: "Weak",
      message: "Weak password",
    },
    fair: {
      level: "Fair",
      message: "Fair password",
    },
    strong: {
      level: "Strong",
      message: "Strong password",
    },
    veryStrong: {
      level: "Very strong",
      message: "Very strong password",
    },
  },
  criteria: {
    minLength: "8+ characters",
    recommendedLength: "12+ characters recommended",
    uppercase: "Uppercase",
    lowercase: "Lowercase",
    numbers: "Numbers",
    specialChars: "Special characters",
    sequential: "No sequential numbers",
    repeated: "No repeated characters",
    commonWords: "No common patterns",
    mixedChars: "Mixed character types",
  },
};

export default messages;
export type { Messages };
