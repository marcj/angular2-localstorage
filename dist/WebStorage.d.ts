export interface WebStorageOptions {
    storageKey?: string;
    serialize?: (deserialized: any) => string;
    deserialize?: (serialized: string) => any;
}
export declare function LocalStorage(storageKeyOrOptions?: string | WebStorageOptions): (target: Object, decoratedPropertyName?: string) => void;
export declare function SessionStorage(storageKeyOrOptions?: string | WebStorageOptions): (target: Object, decoratedPropertyName?: string) => void;
