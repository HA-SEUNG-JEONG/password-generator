import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
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
