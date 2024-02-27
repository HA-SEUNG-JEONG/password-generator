import { useState } from "react";

const useCheckBoxState = (
    onCheckboxChange: (isCheckboxChange: boolean) => void
) => {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked((checked) => !checked);
        onCheckboxChange(!isChecked);
    };

    return {
        isChecked,
        handleCheckboxChange
    };
};

export default useCheckBoxState;
