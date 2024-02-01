class LocalStorageService {
    private static instance: LocalStorageService | null = null;

    private constructor() {
        // Private constructor to prevent external instantiation
    }

    static getInstance(): LocalStorageService {
        if (!LocalStorageService.instance) {
            LocalStorageService.instance = new LocalStorageService();
        }
        return LocalStorageService.instance;
    }

    // Retrieve an item from local storage
    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    // Save an item to local storage
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    // Remove an item from local storage
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}

export default LocalStorageService.getInstance();
