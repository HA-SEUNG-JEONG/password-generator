import { when } from "@/utils/when";
import { css } from "../../styled-system/css";
import { KakaoShareOptions } from "../global.d";
import { toast } from "react-toastify";

interface KakaoButtonProps {
    options: KakaoShareOptions;
}

const KakaoButton = ({ options }: KakaoButtonProps) => {
    const handleKakaoShare = () => {
        const kakaoKey = import.meta.env.VITE_REST_API_KEY;

        when(!window.Kakao, () => {
            toast.error("카카오 SDK를 불러오지 못했습니다.");
            return;
        });

        when(!kakaoKey, () => {
            toast.error("카카오 API 키가 설정되지 않았습니다.");
            return;
        });

        when(!options.text, () => {
            toast.error("공유할 비밀번호가 없습니다.");
            return;
        });

        if (!window.Kakao.isInitialized()) {
            try {
                window.Kakao.init(kakaoKey);
            } catch (error) {
                toast.error("카카오 SDK 초기화 실패");
                return;
            }
        }

        try {
            window.Kakao.Share.sendDefault(options);
        } catch (error) {
            toast.error("카카오톡 공유를 사용할 수 없습니다.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleKakaoShare}
            className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2",
                minWidth: "120px",
                py: "1",
                borderRadius: "full",
                bg: "#FEE500",
                color: "#181600",
                border: "none",
                cursor: "pointer",
                fontSize: "sm",
                fontWeight: "bold",
                transitionProperty: "transform",
                transition: "all 0.2s",
                transitionDuration: "200ms",
                _hover: {
                    background: "#FFE812",
                    transform: "translateY(-1px)"
                }
            })}
            aria-label="카카오톡 공유"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
            >
                <circle cx="20" cy="20" r="20" />

                <path
                    d="M20 10C14.4772 10 10 13.5899 10 18.0001C10 20.6352 11.9302 22.9172 14.7352 24.1842C14.3672 25.4292 13.5702 27.4292 13.5702 27.4292C13.5702 27.4292 13.5072 27.5702 13.5702 27.5702C13.6332 27.5702 13.7352 27.5072 13.7352 27.5072C15.3672 26.5702 16.3672 25.9292 16.7352 25.6842C17.7892 25.8942 18.8772 26.0001 20 26.0001C25.5228 26.0001 30 22.4102 30 18.0001C30 13.5899 25.5228 10 20 10Z"
                    fill="#000000"
                />
            </svg>
            카카오톡 공유
        </button>
    );
};

export default KakaoButton;
