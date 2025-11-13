const generateSha1 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const checkPwnedPassword = async (password: string) => {
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    const MAX_RETRIES = 3;
    let retries = 0;
    try {
        const hash = await generateSha1(password);
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);
        while (retries < MAX_RETRIES) {
            try {
                const res = await fetch(
                    `https://api.pwnedpasswords.com/range/${prefix}`
                );
                if (res.status === 429) {
                    retries++;
                    await delay(Math.pow(2, retries) * 1000);
                    continue;
                } else if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.text();
                return data
                    .split("\n")
                    .some((line) => line.startsWith(suffix.toUpperCase()));
            } catch (error) {
                retries++;
                if (retries === MAX_RETRIES) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
                        throw new Error("429");
                    }
                    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
                        throw new Error("network");
                    }
                    throw error;
                }
                await delay(Math.pow(2, retries) * 1000);
            }
        }
    } catch (error) {
        console.error("Password check failed:", error);
        throw error;
    }
};

const getSecureRandom = (max: number) => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return Math.floor((array[0] / (0xffffffff + 1)) * max);
};

const secureShuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getSecureRandom(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// 비밀번호 생성 함수
export const generateSecurePassword = (options: {
    length: number;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
    excludeAmbiguous: boolean;
}): string => {
    const { length, lowercase, uppercase, numbers, special, excludeAmbiguous } =
        options;

    let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberChars = "0123456789";
    let specialChars = "!@#$%^&*";

    if (excludeAmbiguous) {
        lowercaseChars = lowercaseChars.replace(/[l1o0iOI]/g, "");
        uppercaseChars = uppercaseChars.replace(/[l1o0iOI]/g, "");
        numberChars = numberChars.replace(/[l1o0iOI]/g, "");
        specialChars = specialChars.replace(/[l1o0iOI]/g, "");
    }

    let allChars = "";
    if (lowercase) allChars += lowercaseChars;
    if (uppercase) allChars += uppercaseChars;
    if (numbers) allChars += numberChars;
    if (special) allChars += specialChars;

    if (allChars.length === 0) {
        return ""; // 모든 옵션이 비활성화된 경우 빈 문자열 반환
    }

    const selectedTypes = [lowercase, uppercase, numbers, special].filter(
        Boolean
    ).length;

    // 요청된 길이가 선택된 문자 유형 수보다 작은 경우 처리
    if (length < selectedTypes) {
        let passwordChars: string[] = [];
        for (let i = 0; i < length; i++) {
            passwordChars.push(getRandomChar(allChars));
        }
        return secureShuffleArray(passwordChars).join("");
    }

    const passwordChars: string[] = [];

    // 각 문자 유형별로 최소 1개씩 포함 (선택된 경우에만)
    if (lowercase && lowercaseChars.length > 0)
        passwordChars.push(getRandomChar(lowercaseChars));
    if (uppercase && uppercaseChars.length > 0)
        passwordChars.push(getRandomChar(uppercaseChars));
    if (numbers && numberChars.length > 0)
        passwordChars.push(getRandomChar(numberChars));
    if (special && specialChars.length > 0)
        passwordChars.push(getRandomChar(specialChars));

    // 나머지 길이만큼 랜덤 문자 추가
    for (let i = passwordChars.length; i < length; i++) {
        passwordChars.push(getRandomChar(allChars));
    }

    // 문자열을 랜덤하게 섞기
    return secureShuffleArray(passwordChars).join("");
};

function getRandomChar(charset: string): string {
    const randomIndex = getSecureRandom(charset.length);
    return charset[randomIndex];
}
