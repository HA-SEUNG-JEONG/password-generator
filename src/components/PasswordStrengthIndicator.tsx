import { useEffect, useState } from "react";

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const [strength, setStrength] = useState("매우 약함");

    const determinePasswordStrength = (password: string) => {
        const lengthCriteria = password.length >= 8;
        const uppercaseCriteria = /[A-Z]/.test(password);
        const lowercaseCriteria = /[a-z]/.test(password);
        const numberCriteria = /[0-9]/.test(password);
        const specialCharCriteria = /[^A-Za-z0-9]/.test(password);

        if (
            lengthCriteria &&
            uppercaseCriteria &&
            lowercaseCriteria &&
            numberCriteria &&
            specialCharCriteria
        ) {
            return "강함";
        } else if (
            lengthCriteria &&
            (uppercaseCriteria || lowercaseCriteria) &&
            (numberCriteria || specialCharCriteria)
        ) {
            return "보통";
        }
        return "매우 약함";
    };

    useEffect(() => {
        setStrength(determinePasswordStrength(password));
    }, [password]);

    const getStrengthClass = (strength: string) => {
        switch (strength) {
            case "강함":
                return "bg-green-500";
            case "보통":
                return "bg-yellow-500";
            case "매우 약함":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div
            className={`p-2 text-white w-28 rounded-xl flex justify-center items-center text-sm ${getStrengthClass(
                strength
            )} `}
        >
            강도: {strength}
        </div>
    );
};

export default PasswordStrengthIndicator;
