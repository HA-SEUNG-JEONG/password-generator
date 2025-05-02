import { css } from "../styled-system/css";
import PasswordGenerator from "./components/PasswordGenerator";
import { useEffect } from "react";
import { toast } from "react-toastify";

const App = () => {
    useEffect(() => {
        const initKakao = () => {
            const kakaoKey = import.meta.env.VITE_REST_API_KEY;

            if (window.Kakao && !window.Kakao.isInitialized()) {
                try {
                    window.Kakao.init(kakaoKey);
                } catch (error) {
                    // throw new Error("카카오 SDK 초기화 실패");
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
                shadow: "sm"
            })}
        >
            <PasswordGenerator />
        </div>
    );
};

export default App;
