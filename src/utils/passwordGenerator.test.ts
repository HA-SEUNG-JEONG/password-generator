import { describe, it, expect, vi } from "vitest";

vi.mock("react-toastify", () => ({ toast: vi.fn() }));

import { wordLists } from "../constants/wordLists";
import { PASSPHRASE_CONFIG } from "../constants/passwordConfig";
import {
    generateSecurePassphrase,
    getPassphraseEntropy,
    generateSecurePassword
} from "./passwordGenerator";

describe("wordLists.en", () => {
    it("EFF Large 7776개", () => {
        expect(wordLists.en.length).toBe(7776);
    });

    it("중복 없음", () => {
        expect(new Set(wordLists.en).size).toBe(wordLists.en.length);
    });

    it("공백 포함 단어 없음", () => {
        expect(wordLists.en.every((w) => !/\s/.test(w))).toBe(true);
    });
});

describe("generateSecurePassphrase", () => {
    it("단어 수 일치", () => {
        const result = generateSecurePassphrase({ words: 5, separator: " " });
        expect(result.split(" ").length).toBe(5);
    });

    it("구분자 적용", () => {
        const result = generateSecurePassphrase({ words: 4, separator: "-" });
        expect(result.split("-").length).toBe(4);
    });

    it("빈 구분자는 공백으로 fallback", () => {
        const result = generateSecurePassphrase({ words: 4, separator: "" });
        expect(result.split(" ").length).toBe(4);
    });

    it("capitalize 시 각 단어 첫 글자 대문자", () => {
        const result = generateSecurePassphrase({
            words: 5,
            separator: " ",
            capitalize: true
        });
        for (const word of result.split(" ")) {
            expect(word.charAt(0)).toBe(word.charAt(0).toUpperCase());
        }
    });

    it("includeNumber 시 10-99 숫자 토큰 1개 포함", () => {
        const result = generateSecurePassphrase({
            words: 5,
            separator: " ",
            includeNumber: true
        });
        const tokens = result.split(" ");
        expect(tokens.length).toBe(6);
        const numbers = tokens.filter((t) => /^\d+$/.test(t));
        expect(numbers.length).toBe(1);
        const n = Number(numbers[0]);
        expect(n).toBeGreaterThanOrEqual(10);
        expect(n).toBeLessThanOrEqual(99);
    });

    it("범위 밖 단어 수는 clamp", () => {
        const tooMany = generateSecurePassphrase({
            words: PASSPHRASE_CONFIG.MAX_WORDS_LENGTH + 10,
            separator: " "
        });
        expect(tooMany.split(" ").length).toBe(PASSPHRASE_CONFIG.MAX_WORDS_LENGTH);

        const tooFew = generateSecurePassphrase({
            words: PASSPHRASE_CONFIG.MIN_WORDS_LENGTH - 1,
            separator: " "
        });
        expect(tooFew.split(" ").length).toBe(PASSPHRASE_CONFIG.MIN_WORDS_LENGTH);
    });
});

describe("getPassphraseEntropy", () => {
    it("5단어 EFF ≈ 64.6 bits", () => {
        expect(getPassphraseEntropy({ words: 5, includeNumber: false })).toBeCloseTo(
            5 * Math.log2(7776),
            1
        );
    });

    it("3단어 ≈ 38.8 bits", () => {
        expect(getPassphraseEntropy({ words: 3, includeNumber: false })).toBeCloseTo(
            3 * Math.log2(7776),
            1
        );
    });

    it("includeNumber 가산", () => {
        const base = getPassphraseEntropy({ words: 5, includeNumber: false });
        const withNumber = getPassphraseEntropy({ words: 5, includeNumber: true });
        expect(withNumber).toBeCloseTo(base + Math.log2(90) + Math.log2(6), 5);
    });
});

describe("generateSecurePassword with customExclude", () => {
    it("제외 문자 포함 안 됨", () => {
        const password = generateSecurePassword({
            length: 50,
            lowercase: true,
            uppercase: true,
            numbers: true,
            special: true,
            excludeAmbiguous: false,
            customExclude: "!@#"
        });

        expect(password).not.toMatch(/[!@#]/);
    });

    it("여러 제외 문자 필터링", () => {
        const password = generateSecurePassword({
            length: 100,
            lowercase: true,
            uppercase: true,
            numbers: true,
            special: true,
            excludeAmbiguous: false,
            customExclude: "abc123"
        });

        expect(password).not.toMatch(/[abc123]/);
    });

    it("모든 문자가 제외되면 빈 문자열", () => {
        const password = generateSecurePassword({
            length: 12,
            lowercase: true,
            uppercase: false,
            numbers: false,
            special: false,
            excludeAmbiguous: false,
            customExclude: "abcdefghijklmnopqrstuvwxyz"
        });

        expect(password).toBe("");
    });

    it("빈 customExclude는 모든 문자 포함", () => {
        const password = generateSecurePassword({
            length: 12,
            lowercase: true,
            uppercase: true,
            numbers: true,
            special: true,
            excludeAmbiguous: false,
            customExclude: ""
        });

        expect(password.length).toBe(12);
        expect(password).not.toBe("");
    });

    it("customExclude 없으면 정상 작동", () => {
        const password = generateSecurePassword({
            length: 12,
            lowercase: true,
            uppercase: true,
            numbers: true,
            special: true,
            excludeAmbiguous: false
        });

        expect(password.length).toBe(12);
        expect(password).not.toBe("");
    });
});
