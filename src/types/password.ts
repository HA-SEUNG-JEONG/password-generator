export interface CharacterOptions {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  special: boolean;
  excludeAmbiguous: boolean;
}

export interface PassphraseOptions {
  words: number;
  language: string;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
}

export interface PasswordOptions extends CharacterOptions {
  length: number;
  mode?: "password" | "passphrase";
  passphraseOptions?: Partial<PassphraseOptions>;
}
