export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeoutId: number;

    return function (this: any, ...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
