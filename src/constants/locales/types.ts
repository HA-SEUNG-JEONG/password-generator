export interface Messages {
  app: {
    darkModeLabel: string;
    lightModeLabel: string;
  };
  passwordDisplay: {
    clipboardUnavailable: string;
    copySuccess: string;
    copyFailed: string;
    generatePassword: string;
    showPassword: string;
    hidePassword: string;
    copyButton: string;
    copiedButton: string;
    refreshButton: string;
    passphraseStrengthLabel: (strength: string) => string;
    entropyLevelAriaLabel: string;
    strengthLevelAriaLabel: string;
  };
  passwordGenerator: {
    securityCheckInProgress: string;
  };
  passwordHistory: {
    title: string;
    noHistory: string;
  };
  passwordOptions: {
    mode: string;
    passwordMode: string;
    passphraseMode: string;
    length: string;
    words: string;
    separator: string;
    lowercase: string;
    uppercase: string;
    numbers: string;
    special: string;
    excludeAmbiguous: string;
    customExclude: string;
    capitalize: string;
    includeNumber: string;
    optionsLabel: string;
    wordsLabel: (count: number) => string;
    securityLevel: (level: string, entropy: number, isWeak: boolean) => string;
    separatorLabel: string;
    space: string;
    custom: string;
    customSeparatorLabel: string;
    capitalizeLabel: string;
    capitalizeDesc: string;
    includeNumberLabel: string;
    includeNumberDesc: string;
    minLength: (min: number) => string;
    maxLength: (max: number) => string;
    lengthDisplay: (length: number, recommend: number) => string;
    lengthDisplaySimple: (length: number) => string;
    requireAtLeastOne: string;
    customExcludeLabel: string;
    customExcludePlaceholder: string;
    lengthControlLabel: string;
    lengthControlDescription: (min: number, max: number) => string;
    lengthInputLabel: string;
    lengthSliderLabel: string;
  };
  kakao: {
    apiKeyNotSet: string;
    sdkLoadFailed: string;
    initializationFailed: string;
    shareText: string;
    missingShareText: string;
  };
  errors: {
    tooManyRequests: string;
    networkError: string;
    pwnedCheckGeneric: string;
    emptyPasswordWarning: string;
    passwordPwnedWarning: string;
    passphraseWordsRange: (min: number, max: number) => string;
    passwordLengthMax: (max: number) => string;
  };
  locale: {
    ariaLabel: string;
  };
  strengthLevels: {
    veryWeak: {
      level: string;
      message: string;
    };
    weak: {
      level: string;
      message: string;
    };
    fair: {
      level: string;
      message: string;
    };
    strong: {
      level: string;
      message: string;
    };
    veryStrong: {
      level: string;
      message: string;
    };
  };
  criteria: {
    minLength: string;
    recommendedLength: string;
    uppercase: string;
    lowercase: string;
    numbers: string;
    specialChars: string;
    sequential: string;
    repeated: string;
    commonWords: string;
    mixedChars: string;
  };
}
