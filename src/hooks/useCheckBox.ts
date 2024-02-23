import { useState } from "react";

const useCheckBox = (
    initialState: boolean,
    onCheckboxChange: (isCheckboxChange: boolean) => void
) => {
    const [isChecked, setIsChecked] = useState(initialState);

    const handleCheckboxChange = () => {
        setIsChecked((checked) => !checked);
        onCheckboxChange(!isChecked);
    };

    return {
        isChecked,
        handleCheckboxChange
    };
};

export default useCheckBox;
