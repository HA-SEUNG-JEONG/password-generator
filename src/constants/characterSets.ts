export const CHARACTER_SETS = {
    LOWERCASE: "abcdefghijklmnopqrstuvwxyz",
    UPPERCASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    NUMBERS: "0123456789",
    SPECIAL: "!@#$%^&*",
    AMBIGUOUS: /[l1o0iOI]/g
} as const;

export const removeAmbiguousChars = (chars: string): string => {
    return chars.replace(CHARACTER_SETS.AMBIGUOUS, "");
};

