import { PassphraseOptions } from "../types/password";

export const PASSWORD_LENGTH = {
  MIN: 8,
  RECOMMEND: 12,
  MAX: 30
} as const;

export const PASSPHRASE_CONFIG = {
  MIN_WORDS_LENGTH: 3,
  MAX_WORDS_LENGTH: 10
} as const;

export const DEFAULT_PASSPHRASE_OPTIONS: PassphraseOptions = {
  words: 5,
  language: "en",
  separator: " ",
  capitalize: false,
  includeNumber: false
} as const;
