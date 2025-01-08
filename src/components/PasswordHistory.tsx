// PasswordHistory.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface PasswordHistoryProps {
    currentPassword: string;
}

// 암호화 키 생성 함수
async function generateKey() {
    const key = await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );

    const exportedKey = await window.crypto.subtle.exportKey("raw", key);
    const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
    sessionStorage.setItem("encryptionKey", keyBase64);

    return key;
}

// 암호화 함수
const encryptPassword = async (password: string, key: CryptoKey) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedPassword = new TextEncoder().encode(password);

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv
        },
        key,
        encodedPassword
    );

    const encryptedArray = new Uint8Array(encryptedData);
    return {
        encrypted: btoa(String.fromCharCode(...encryptedArray)),
        iv: btoa(String.fromCharCode(...iv))
    };
};

const decryptPassword = async (
    encryptedData: string,
    iv: string,
    key: CryptoKey
) => {
    const encryptedArray = Uint8Array.from(atob(encryptedData), (c) =>
        c.charCodeAt(0)
    );
    const ivArray = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));

    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: ivArray
        },
        key,
        encryptedArray
    );

    return new TextDecoder().decode(decryptedData);
};

const PasswordHistory = ({ currentPassword }: PasswordHistoryProps) => {
    const [history, setHistory] = useState<
        Array<{ password: string; iv: string }>
    >([]);
    const [key, setKey] = useState<CryptoKey | null>(null);

    // 키 초기화
    useEffect(() => {
        const initKey = async () => {
            try {
                const savedKey = sessionStorage.getItem("encryptionKey");
                if (savedKey) {
                    const keyArray = Uint8Array.from(atob(savedKey), (c) =>
                        c.charCodeAt(0)
                    );
                    const importedKey = await window.crypto.subtle.importKey(
                        "raw",
                        keyArray,
                        "AES-GCM",
                        true,
                        ["encrypt", "decrypt"]
                    );
                    setKey(importedKey);
                } else {
                    const newKey = await generateKey();
                    setKey(newKey);
                }
            } catch (error) {
                console.error("키 초기화 실패:", error);
                toast.error("보안 초기화에 실패했습니다.");
            }
        };

        initKey();
    }, []);

    // 저장된 히스토리 로드
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const savedHistory = localStorage.getItem("passwordHistory");
                if (savedHistory && key) {
                    setHistory(JSON.parse(savedHistory));
                }
            } catch (error) {
                console.error("히스토리 로드 실패:", error);
                toast.error("히스토리 로드에 실패했습니다.");
            }
        };

        if (key) {
            loadHistory();
        }
    }, [key]);

    // 새 비밀번호 저장
    useEffect(() => {
        const savePassword = async () => {
            if (currentPassword && key) {
                try {
                    const encrypted = await encryptPassword(
                        currentPassword,
                        key
                    );
                    const newHistory = [encrypted, ...history].slice(0, 10);
                    setHistory(newHistory);
                    localStorage.setItem(
                        "passwordHistory",
                        JSON.stringify(newHistory)
                    );
                } catch (error) {
                    console.error("비밀번호 저장 실패:", error);
                    toast.error("비밀번호 저장에 실패했습니다.");
                }
            }
        };

        if (key) {
            savePassword();
        }
    }, [currentPassword, key]);

    // 비밀번호 복사 핸들러
    const handleCopyPassword = async (
        encryptedPassword: string,
        iv: string
    ) => {
        try {
            if (!key) throw new Error("암호화 키가 없습니다.");

            const decrypted = await decryptPassword(encryptedPassword, iv, key);
            await navigator.clipboard.writeText(decrypted);
            toast.success("이전 비밀번호가 복사되었습니다.");
        } catch (error) {
            console.error("비밀번호 복사 실패:", error);
            toast.error("비밀번호 복사에 실패했습니다.");
        }
    };

    return (
        <div>
            <div className="text-red-500 text-sm mb-2">
                ⚠️ 주의: 브라우저에 저장된 비밀번호는 세션이 종료되면 접근할 수
                없습니다.
            </div>
            {/* 나머지 JSX 코드... */}
        </div>
    );
};

export default PasswordHistory;
