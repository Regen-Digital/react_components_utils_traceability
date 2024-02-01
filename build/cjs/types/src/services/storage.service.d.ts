declare class LocalStorageService {
    private static instance;
    private constructor();
    static getInstance(): LocalStorageService;
    get(key: string): string | null;
    set(key: string, value: string): void;
    remove(key: string): void;
}
declare const _default: LocalStorageService;
export default _default;
