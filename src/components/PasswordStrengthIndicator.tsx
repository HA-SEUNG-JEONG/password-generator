import React, { FC, useState, useEffect } from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const [strength, setStrength] = useState('Very Weak');

  useEffect(() => {
    setStrength(determinePasswordStrength(password));
  }, [password]);

  const determinePasswordStrength = (password: string): string => {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[^A-Za-z0-9]/.test(password);

    if (lengthCriteria && uppercaseCriteria && lowercaseCriteria && numberCriteria && specialCharCriteria) {
      return 'Strong';
    } else if (lengthCriteria && (uppercaseCriteria || lowercaseCriteria) && (numberCriteria || specialCharCriteria)) {
      return 'Medium';
    } else {
      return 'Very Weak';
    }
  };

  const getStrengthClass = (strength: string): string => {
    switch (strength) {
      case 'Strong':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Very Weak':
        return 'bg-red-500';
      default:
        return '';
    }
  };

  return (
    <div className={`p-2 text-white ${getStrengthClass(strength)}`}>
      {strength}
    </div>
  );
};

export default PasswordStrengthIndicator;
