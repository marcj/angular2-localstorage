"use strict";
var LocalStorageEmitter_1 = require("./LocalStorageEmitter");
function LocalStorage(storageKeyOrOptions) {
    if (storageKeyOrOptions === void 0) { storageKeyOrOptions = {}; }
    if ("string" === typeof storageKeyOrOptions) {
        return WebStorage(localStorage, { storageKey: storageKeyOrOptions });
    }
    else {
        return WebStorage(localStorage, storageKeyOrOptions);
    }
}
exports.LocalStorage = LocalStorage;
function SessionStorage(storageKeyOrOptions) {
    if (storageKeyOrOptions === void 0) { storageKeyOrOptions = {}; }
    if ("string" === typeof storageKeyOrOptions) {
        return WebStorage(sessionStorage, { storageKey: storageKeyOrOptions });
    }
    else {
        return WebStorage(sessionStorage, storageKeyOrOptions);
    }
}
exports.SessionStorage = SessionStorage;
function WebStorage(webStorage, options) {
    return function (target, decoratedPropertyName) {
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
        var instances = [];
        var values = {};
        var storageValue = webStorage.getItem(options.storageKey) || null;
        var storageValueJSON = storageValue;
        if ("string" === typeof storageValue) {
            try {
                storageValue = options.deserialize(storageValue);
            }
            catch (e) {
                storageValue = null;
                storageValueJSON = "null";
            }
        }
        var oldJSONValues = {};
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
        LocalStorageEmitter_1.LocalStorageEmitter.subscribe(function () {
            for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
                var instance = instances_1[_i];
                var currentValue = options.serialize(instance[decoratedPropertyName]);
                var oldJSONValue = oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]];
                if (currentValue !== oldJSONValue) {
                    oldJSONValues[instance["_" + decoratedPropertyName + "_mapped"]] = currentValue;
                    webStorage.setItem(options.storageKey, currentValue);
                }
            }
        });
    };
}
//# sourceMappingURL=WebStorage.js.map