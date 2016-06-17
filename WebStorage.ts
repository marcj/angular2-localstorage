import {LocalStorageEmitter} from "./LocalStorageEmitter";

interface IWebStorage {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => void;
}

export interface WebStorageOptions {
    storageKey?: string,
    serialize?:  (deserialized: any) => string;
    deserialize?: (serialized: string) => any;
}

export function LocalStorage(storageKeyOrOptions: string|WebStorageOptions = {}) {
    if ("string" === typeof storageKeyOrOptions) {
        return WebStorage(localStorage, {storageKey: storageKeyOrOptions as string});
    }
    else {
        return WebStorage(localStorage, storageKeyOrOptions);
    }
}

export function SessionStorage(storageKeyOrOptions: string|WebStorageOptions = {}) {
    if ("string" === typeof storageKeyOrOptions) {
        return WebStorage(sessionStorage, {storageKey: storageKeyOrOptions as string});
    }
    else {
        return WebStorage(sessionStorage, storageKeyOrOptions);
    }
}

function WebStorage(webStorage: IWebStorage, options: WebStorageOptions) {
    return (target: Object, decoratedPropertyName?: string): void => {
        if (!webStorage) {
            return;
        }

        if (!options.storageKey) {
            options.storageKey = "" + "/" + decoratedPropertyName;
        }

        if (!options.serialize) {
            options.serialize = JSON.stringify;
        }

        if (!options.deserialize) {
            options.deserialize = JSON.parse;
        }

        Object.defineProperty(target, "_" + decoratedPropertyName + "_mapped", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });

        let instances: any = [];
        let values = {};

        let storageValue = webStorage.getItem(options.storageKey) || null;
        let storageValueJSON = storageValue;
        if ("string" === typeof storageValue) {
            try {
                storageValue = options.deserialize(storageValue);
            } catch (e) {
                storageValue = null;
                storageValueJSON = "null";
            }
        }
        let oldJSONValues = {};

        Object.defineProperty(target, decoratedPropertyName, {
            get: function () {
                if (false === this["_" + decoratedPropertyName + "_mapped"]) {
                    this["_" + decoratedPropertyName + "_mapped"] = instances.length;

                    // first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;

                    instances.push(this);
                }
                return values[this["_" + decoratedPropertyName + "_mapped"]];
            },
            set: function (newValue) {
                if (false === this["_" + decoratedPropertyName + "_mapped"]) {
                    this["_" + decoratedPropertyName + "_mapped"] = instances.length;

                    // first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;

                    instances.push(this);
                    // first "set" call is ignored if we have already a value from the localStorage
                    if (storageValue) {
                        return;
                    }
                }
                values[this["_" + decoratedPropertyName + "_mapped"]] = newValue;
            },
            enumerable: true,
            configurable: true
        });

        LocalStorageEmitter.subscribe(() => {
            for (let instance of instances) {
                let currentValue = options.serialize(instance[decoratedPropertyName]);
                let oldJSONValue = oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]];
                if (currentValue !== oldJSONValue) {
                    oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]] = currentValue;
                    webStorage.setItem(options.storageKey, currentValue);
                }
            }
        });
    };
}
