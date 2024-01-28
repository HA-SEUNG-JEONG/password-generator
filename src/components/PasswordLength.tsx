const PasswordLength = ({
    passwordLength,
    onPasswordLengthChange
}: {
    passwordLength: number;
    onPasswordLengthChange: (value: number) => void;
}) => {
    return (
        <>
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="length"
            >
                Password Length: {passwordLength}
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                id="length"
                placeholder="Enter password length"
                required
                type="range"
                min="1"
                max="20"
                value={passwordLength}
                onChange={(event) =>
                    onPasswordLengthChange(Number(event.target.value))
                }
            />
        </>
    );
};

export default PasswordLength;
