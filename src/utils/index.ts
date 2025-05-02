export const when = (
    condition: boolean,
    fn: () => void,
    elseFn?: () => void
) => {
    if (condition) {
        fn();
    } else {
        elseFn?.();
    }
};
