import { useEffect, useState } from "react";
import { strengthLevels, StrengthLevel } from "@/utils/strengthLevel";
import zxcvbn from "zxcvbn";

interface PasswordStrengthIndicatorProps {
    password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
    const { score } = zxcvbn(password);

    const getStrengthLevel = (score: number): StrengthLevel => {
        return strengthLevels.find(level => level.score === score) || strengthLevels[0];
    };

    const currentStrength = getStrengthLevel(score);

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className={`h-2.5 rounded-full ${currentStrength.color}`}
                    style={{ width: `${(score + 1) * 20}%` }}
                ></div>
            </div>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {currentStrength.message}
            </p>
        </div>
    );
};

export default PasswordStrengthIndicator;
