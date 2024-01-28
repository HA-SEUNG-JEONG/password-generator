import { IncludeLowercase } from "./components/IncludeLowercase";
import IncludeNumbers from "./components/IncludeNumbers";
import IncludeSpecialCharacter from "./components/IncludeSpecialCharacter";
import IncludeUppercase from "./components/IncludeUppercase";
import PasswordInput from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";

function App() {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-2xl font-bold">PassWord Generator</div>
                <div className="text-sm text-muted-foreground">
                    Generate a strong password using the options below
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <PasswordInput />
                        <PasswordLength />
                    </div>
                    <div className="space-y-2">
                        <IncludeUppercase />
                        <IncludeLowercase />
                        <IncludeNumbers />
                        <IncludeSpecialCharacter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
