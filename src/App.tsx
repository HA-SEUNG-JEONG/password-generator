import { css } from "../styled-system/css";
import PasswordGenerator from "./components/PasswordGenerator";
import { useEffect, useState } from "react";
import { KakaoProvider } from "./contexts/KakaoContext";
import { LocaleProvider, useLocale } from "./contexts/LocaleContext";

const AppContent = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "light";
    });

    const { locale, setLocale, t } = useLocale();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const toggleLocale = () => {
        setLocale(locale === "ko" ? "en" : "ko");
    };

    return (
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
            <div
                className={css({
                    position: "absolute",
                    top: "4",
                    right: "4",
                    display: "flex",
                    gap: "2",
                    alignItems: "center"
                })}
            >
                <button
                    onClick={toggleLocale}
                    aria-label={t.locale.ariaLabel}
                    aria-pressed={locale === "en"}
                    type="button"
                    className={css({
                        bg: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "sm",
                        fontWeight: "bold",
                        color: "text",
                        padding: "2",
                        borderRadius: "md",
                        minWidth: "40px",
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
                    {locale === "ko" ? "EN" : "KO"}
                </button>
                <button
                    onClick={toggleTheme}
                    aria-label={theme === "light" ? t.app.darkModeLabel : t.app.lightModeLabel}
                    aria-pressed={theme === "dark"}
                    type="button"
                    className={css({
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
            </div>
            <PasswordGenerator />
        </div>
    );
};

const App = () => {
    return (
        <LocaleProvider>
            <KakaoProvider>
                <AppContent />
            </KakaoProvider>
        </LocaleProvider>
    );
};

export default App;
