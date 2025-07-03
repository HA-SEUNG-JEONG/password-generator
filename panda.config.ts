import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {
            semanticTokens: {
                colors: {
                    primary: {
                        value: {
                            _light: "#4F46E5",
                            _dark: "#6366F1",
                        },
                    },
                    "primary-hover": {
                        value: {
                            _light: "#4338CA",
                            _dark: "#4F46E5",
                        },
                    },
                    "primary-foreground": {
                        value: {
                            _light: "#FFFFFF",
                            _dark: "#FFFFFF",
                        },
                    },
                    secondary: {
                        value: {
                            _light: "#6B7280",
                            _dark: "#9CA3AF",
                        },
                    },
                    "secondary-hover": {
                        value: {
                            _light: "#4B5563",
                            _dark: "#6B7280",
                        },
                    },
                    "secondary-foreground": {
                        value: {
                            _light: "#FFFFFF",
                            _dark: "#FFFFFF",
                        },
                    },
                    card: {
                        value: {
                            _light: "#FFFFFF",
                            _dark: "#1F2937",
                        },
                    },
                    "card-foreground": {
                        value: {
                            _light: "#1F2937",
                            _dark: "#F9FAFB",
                        },
                    },
                    muted: {
                        value: {
                            _light: "#F3F4F6",
                            _dark: "#374151",
                        },
                    },
                    text: {
                        value: {
                            _light: "#1F2937",
                            _dark: "#F9FAFB",
                        },
                    },
                },
            },
        },
    },

    // The output directory for your css system
    outdir: "styled-system",

    conditions: {
        extend: {
            light: '[data-theme="light"] &',
            dark: '[data-theme="dark"] &',
        },
    },
});
