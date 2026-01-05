import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "react-toastify";

interface KakaoContextType {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
}

const KakaoContext = createContext<KakaoContextType | undefined>(undefined);

export const KakaoProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initKakao = () => {
      const kakaoKey = import.meta.env.VITE_REST_API_KEY;

      if (!kakaoKey) {
        setError("카카오 API 키가 설정되지 않았습니다.");
        setIsLoading(false);
        return;
      }

      if (!window.Kakao) {
        setError("카카오 SDK를 불러오지 못했습니다.");
        setIsLoading(false);
        return;
      }

      if (window.Kakao.isInitialized()) {
        setIsInitialized(true);
        setIsLoading(false);
        return;
      }

      try {
        window.Kakao.init(kakaoKey);
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        setError("카카오 SDK 초기화 실패");
        toast.error("카카오 SDK 초기화 실패");
      } finally {
        setIsLoading(false);
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
    <KakaoContext.Provider value={{ isInitialized, isLoading, error }}>
      {children}
    </KakaoContext.Provider>
  );
};

export const useKakaoSDK = (): KakaoContextType => {
  const context = useContext(KakaoContext);
  if (context === undefined) {
    throw new Error("useKakaoSDK는 KakaoProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

