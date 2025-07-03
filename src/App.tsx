import { css } from "../styled-system/css";
import PasswordGenerator from "./components/PasswordGenerator";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

    useEffect(() => {
        const initKakao = () => {
            const kakaoKey = import.meta.env.VITE_REST_API_KEY;

            if (window.Kakao && !window.Kakao.isInitialized()) {
                try {
                    window.Kakao.init(kakaoKey);
                } catch (error) {
                    toast.error("카카오 SDK 초기화 실패");
                }
            }
        };

        if (document.readyState === "complete") {
            initKakao();
        } else {
            window.addEventListener("load", initKakao);
        }

        return () => {
            window.removeEventListener("load", initKakao);
        };
    }, []);

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
            <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"}`}
                title={`Switch to ${theme === "light" ? "dark" : "light"}`}
                className={css({
                    position: "absolute",
                    top: "4",
                    right: "4",
                    bg: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "xl",
                    color: "text",
                    "&:focus": {
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
    );
};

export default App;
