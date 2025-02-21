import { ThemeProvider } from "./context/ThemeContext";
import PasswordGenerator from "./components/PasswordGenerator";
import { css } from "../styled-system/css";

const App = () => {
    return (
        <ThemeProvider>
            {/* <div className="min-h-screen transition-colors duration-200  rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-dark-bg dark:text-dark-text">
                <PasswordGenerator />
            </div> */}
            <div
                className={css({
                    minHeight: "screen",
                    transition:
                        "colors duration-200 rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-dark-bg dark:text-dark-text"
                })}
            >
                <PasswordGenerator />
            </div>
        </ThemeProvider>
    );
};

export default App;
