export declare function LocalStorage(key?: string): (target: Object, propertyName: string) => void;
export declare function SessionStorage(key?: string): (target: Object, propertyName: string) => void;
export declare let WebStorage: (webStorage: Storage, key: string) => (target: Object, propertyName: string) => void;
