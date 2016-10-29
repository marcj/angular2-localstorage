export declare class WebStorageService {
    private storage;
    constructor(storage: Storage);
    get(key: string): any;
    set(key: string, value: any): void;
    remove(key: string): void;
    clear(): void;
}
export declare class LocalStorageService extends WebStorageService {
    constructor();
}
export declare class SessionStorageService extends WebStorageService {
    constructor();
}
