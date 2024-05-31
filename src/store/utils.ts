export function getStoreValueFromLocalStorage(key: string) {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        localStorage.removeItem(key);
        throw new Error(`Error parsing '${key}' from localStorage: ${error}`);
    }
    return {};
}
