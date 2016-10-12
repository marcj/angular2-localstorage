export declare class WebStroageService {
    private storage;
    constructor(storage: Storage);
    get(key: string): any;
    set(key: string, value: any): void;
    remove(key: string): void;
    clear(): void;
}
export declare class LocalStorageService extends WebStroageService {
    constructor();
}
export declare class SessionStorageService extends WebStroageService {
    constructor();
}
