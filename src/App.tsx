import { css } from "../styled-system/css";
import PasswordGenerator from "./components/PasswordGenerator";
import { useEffect, useState } from "react";
import { KakaoProvider } from "./contexts/KakaoContext";

const App = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <KakaoProvider>
            <div
                className={css({
                    minHeight: "screen",
                    transitionProperty: "colors",
                    transitionDuration: "200ms",
                    borderRadius: "lg",
                    border: "1px solid",
                    bg: "card",
                    color: "card-foreground",
                    shadow: "sm",
                    p: { base: "4", md: "8" },
                    maxWidth: "500px",
                    margin: "0 auto"
                })}
            >
            <button
                onClick={toggleTheme}
                aria-label={`${theme === "light" ? "다크" : "라이트"} 모드로 전환`}
                aria-pressed={theme === "dark"}
                type="button"
                className={css({
                    position: "absolute",
                    top: "4",
                    right: "4",
                    bg: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "xl",
                    color: "text",
                    padding: "2",
                    borderRadius: "md",
                    _hover: {
                        opacity: 0.8
                    },
                    _focus: {
                        outline: "2px solid",
                        outlineOffset: "2px",
                        outlineColor: "ring"
                    }
                })}
            >
                {theme === "light" ? "🌙" : "☀️"}
            </button>
                <PasswordGenerator />
            </div>
        </KakaoProvider>
    );
};

export default App;
