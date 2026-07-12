import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "비밀번호 생성기",
                short_name: "비밀번호 생성",
                description: "안전한 무작위 비밀번호를 생성하고 검증합니다",
                theme_color: "#1a1a1a",
                background_color: "#ffffff",
                lang: "ko"
            }
        })
    ],
    build: {
        outDir: "dist"
    },
    resolve: {
        alias: {
            "styled-system": "/styled-system",
            "@": "/src"
        }
    }
});
