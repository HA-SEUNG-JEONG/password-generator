export interface CharacterOptions {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
    excludeAmbiguous: boolean;
}

export interface PasswordOptions extends CharacterOptions {
    length: number;
}

