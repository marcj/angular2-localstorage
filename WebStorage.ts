import {LocalStorageEmitter} from "./LocalStorageEmitter";

interface IWebStorage {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => void;
}

export function LocalStorage(storageKey?: string) {
    return WebStorage(storageKey, localStorage);
}

export function SessionStorage(storageKey?: string) {
    return WebStorage(storageKey, sessionStorage);
}

function WebStorage(storageKey: string, webStorage: IWebStorage) {
    return (target: Object, decoratedPropertyName?: string): void => {
        if (!webStorage) {
            return;
        }

        if (!storageKey) {
            storageKey = "" + "/" + decoratedPropertyName;
        }

        Object.defineProperty(target, "_" + decoratedPropertyName + "_mapped", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });

        let instances: any = [];
        let values = {};

        let storageValue = webStorage.getItem(storageKey) || null;
        let storageValueJSON = storageValue;
        if ("string" === typeof storageValue) {
            try {
                storageValue = JSON.parse(storageValue);
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
                let currentValue = JSON.stringify(instance[decoratedPropertyName]);
                let oldJSONValue = oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]];
                if (currentValue !== oldJSONValue) {
                    oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]] = currentValue;
                    webStorage.setItem(storageKey, currentValue);
                }
            }
        });
    };
}
