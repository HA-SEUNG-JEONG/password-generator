import { useEffect, useState } from "react";

interface PasswordStrength {
    level: string;
    message: string;
    score: number;
}

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const [strength, setStrength] = useState<PasswordStrength>({
        level: "입력 전",
        message: "비밀번호를 입력해주세요",
        score: 0
    });

    const checkPasswordCriteria = (password: string) => {
        const criteria = {
            minLength: password.length >= 8,
            recommendedLength: password.length >= 12,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /[0-9]/.test(password),
            specialChars: /[^A-Za-z0-9]/.test(password),
            sequential:
                !/(123|234|345|456|567|678|789|987|876|765|654|543|432|321)/.test(
                    password
                ),
            repeated: !/(.)\1{2,}/.test(password),
            commonWords: !/password|123456|qwerty|admin/i.test(password),
            mixedChars:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(
                    password
                )
        };

        return {
            ...criteria,
            score: Object.values(criteria).filter(Boolean).length
        };
    };

    const determinePasswordStrength = (password: string): PasswordStrength => {
        if (!password) {
            return {
                level: "입력 전",
                message: "비밀번호를 입력해주세요",
                score: 0
            };
        }

        const criteria = checkPasswordCriteria(password);
        const missingCriteria = [];

        if (!criteria.minLength) missingCriteria.push("8자 이상");
        if (!criteria.recommendedLength) missingCriteria.push("12자 이상 권장");
        if (!criteria.uppercase) missingCriteria.push("대문자");
        if (!criteria.lowercase) missingCriteria.push("소문자");
        if (!criteria.numbers) missingCriteria.push("숫자");
        if (!criteria.specialChars) missingCriteria.push("특수문자");
        if (!criteria.sequential) missingCriteria.push("연속된 숫자 제거");
        if (!criteria.repeated) missingCriteria.push("반복된 문자 제거");
        if (!criteria.commonWords) missingCriteria.push("일반적인 패턴 제거");
        if (!criteria.mixedChars) missingCriteria.push("문자 조합 다양화");

        if (criteria.score >= 9) {
            return {
                level: "매우 강함",
                message: "매우 안전한 비밀번호입니다",
                score: criteria.score
            };
        } else if (criteria.score >= 7) {
            return {
                level: "강함",
                message: `안전한 비밀번호입니다. 더 강화하려면 ${missingCriteria.join(
                    ", "
                )}를 고려하세요`,
                score: criteria.score
            };
        } else if (criteria.score >= 5) {
            return {
                level: "보통",
                message: `적정 수준입니다. ${missingCriteria.join(
                    ", "
                )}를 추가하면 더 안전합니다`,
                score: criteria.score
            };
        } else if (criteria.score >= 3) {
            return {
                level: "약함",
                message: `취약한 비밀번호입니다. ${missingCriteria
                    .slice(0, 3)
                    .join(", ")}를 추가하세요`,
                score: criteria.score
            };
        }

        return {
            level: "매우 취약",
            message: `매우 취약한 비밀번호입니다. ${missingCriteria
                .slice(0, 3)
                .join(", ")}가 필요합니다`,
            score: criteria.score
        };
    };

    useEffect(() => {
        setStrength(determinePasswordStrength(password));
    }, [password]);

    const getStrengthClass = (level: string) => {
        switch (level) {
            case "매우 강함":
                return "bg-blue-600";
            case "강함":
                return "bg-green-600";
            case "보통":
                return "bg-yellow-500";
            case "약함":
                return "bg-orange-500";
            case "매우 취약":
                return "bg-red-600";
            default:
                return "bg-gray-400";
        }
    };

    return (
        <div className="space-y-2">
            <div
                className={`p-2 text-white rounded-xl flex justify-center items-center text-sm
                    ${getStrengthClass(strength.level)}`}
            >
                강도: {strength.level}
            </div>
            <div className="text-sm text-gray-600">{strength.message}</div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${getStrengthClass(
                        strength.level
                    )}`}
                    style={{ width: `${(strength.score / 10) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
