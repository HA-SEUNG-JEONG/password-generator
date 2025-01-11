const { text } = require("stream/consumers");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: "#1a1a1a",
                    text: "#ffffff",
                    border: "#333333",
                    input: "#2a2a2a"
                }
            }
        }
    },
    plugins: []
};
