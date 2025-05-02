import { css } from "../styled-system/css";
import PasswordGenerator from "./components/PasswordGenerator";
import { useEffect } from "react";

const App = () => {
    useEffect(() => {
        const initKakao = () => {
            const kakaoKey = import.meta.env.VITE_REST_API_KEY;

            if (window.Kakao && !window.Kakao.isInitialized()) {
                try {
                    const result = window.Kakao.init(kakaoKey);
                    console.log("Kakao 초기화 결과:", result);
                } catch (error) {
                    console.error("Kakao 초기화 실패:", error);
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
                shadow: "sm"
            })}
        >
            <PasswordGenerator />
        </div>
    );
};

export default App;
