export interface KakaoShareOptions {
    objectType?: string;
    text: string;
    link: {
        webUrl: string;
    };
}

declare global {
    interface Window {
        Kakao: {
            init: (key: string) => boolean;
            isInitialized: () => boolean;
            Share: {
                sendDefault: (options: KakaoShareOptions) => void;
            };
        };
    }
}

export {};
