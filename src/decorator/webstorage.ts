import {WebStorageUtility} from "../utility/webstorage.utiltiy";

export function LocalStorage(key?: string) {
    return WebStorage(localStorage, key);
}

export function SessionStorage(key?: string) {
    return WebStorage(sessionStorage, key);
}

function WebStorage(webStorage: Storage, key: string) {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;

        let storageKey = WebStorageUtility.generateStorageKey(key);

        Object.defineProperty(target, propertyName, {
            get: function() {
                return WebStorageUtility.get(webStorage, key);
            },
            set: function(value: any) {
                WebStorageUtility.set(webStorage, key, value);
            }
        });
    }
}
