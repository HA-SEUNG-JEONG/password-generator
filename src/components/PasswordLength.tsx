const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    return (
        <>
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="length"
            >
                Password Length: {passwordLength}
            </label>
        </>
    );
};

export default PasswordLength;
