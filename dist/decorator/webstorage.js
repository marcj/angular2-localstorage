"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webstorage_utiltiy_1 = require("../utility/webstorage.utiltiy");
function LocalStorage(key) {
    return exports.WebStorage(localStorage, key);
}
exports.LocalStorage = LocalStorage;
function SessionStorage(key) {
    return exports.WebStorage(sessionStorage, key);
}
exports.SessionStorage = SessionStorage;
// initialization cache
var cache = {};
exports.WebStorage = function (webStorage, key) {
    return function (target, propertyName) {
        key = key || propertyName;
        var storageKey = webstorage_utiltiy_1.WebStorageUtility.generateStorageKey(key);
        var storedValue = webstorage_utiltiy_1.WebStorageUtility.get(webStorage, key);
        Object.defineProperty(target, propertyName, {
            get: function () {
                return webstorage_utiltiy_1.WebStorageUtility.get(webStorage, key);
            },
            set: function (value) {
                if (!cache[key]) {
                    // first setter handle
                    if (storedValue === null) {
                        // if no value in localStorage, set it to initializer
                        webstorage_utiltiy_1.WebStorageUtility.set(webStorage, key, value);
                    }
                    cache[key] = true;
                    return;
                }
                webstorage_utiltiy_1.WebStorageUtility.set(webStorage, key, value);
            },
        });
    };
};
//# sourceMappingURL=webstorage.js.map