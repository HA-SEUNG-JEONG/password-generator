export const isNetworkError = (error: unknown): boolean => {
    if (error instanceof Error) {
        return error.message.includes("network") || error.message.includes("fetch");
    }
    return false;
};

export const isRateLimitError = (error: unknown): boolean => {
    if (error instanceof Error) {
        return error.message.includes("429") || error.message.includes("rate limit");
    }
    return false;
};

