export declare class WebStorageUtility {
    static generateStorageKey(key: string): string;
    static get(storage: Storage, key: string): any;
    static set(storage: Storage, key: string, value: any): void;
    static remove(storage: Storage, key: string): void;
    private static getSettable(value);
    private static getGettable(value);
}
