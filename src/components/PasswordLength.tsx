const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    return (
        <>
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="length"
            >
                비밀번호 길이: {passwordLength}
            </label>
        </>
    );
};

export default PasswordLength;
