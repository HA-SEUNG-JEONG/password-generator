export const PASSWORD_CHARSET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
export const DEFAULT_PASSWORD_LENGTH = 16;

export const createCharacterSet = (options: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
}) => {
    const { lowercase, uppercase, numbers, special } = options;
    let charset = "";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (special) charset += "!@#$%^&*()-_=+[]{}|;:'\",.<>/?";
    return charset;
};

export const hasRepeatingCharacters = (password: string, char: string) => {
    for (let i = 0; i < password.length - 2; i++) {
        if (
            password[i] === password[i + 1] &&
            password[i] === password[i + 2]
        ) {
            return true;
        }
    }
    return false;
};

export const generatePassword = (length: number, charset: string) => {
    let password = "";
    let hasRepeatingChars = false;

    while (password.length < length) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        if (hasRepeatingCharacters(password, char)) {
            hasRepeatingChars = true;
            continue;
        }
        password += char;
    }

    return { password, hasRepeatingChars };
};
