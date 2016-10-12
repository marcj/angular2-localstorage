"use strict";
var webstorage_utiltiy_1 = require("../utility/webstorage.utiltiy");
function LocalStorage(key) {
    return WebStorage(localStorage, key);
}
exports.LocalStorage = LocalStorage;
function SessionStorage(key) {
    return WebStorage(sessionStorage, key);
}
exports.SessionStorage = SessionStorage;
function WebStorage(webStorage, key) {
    return function (target, propertyName) {
        key = key || propertyName;
        var storageKey = webstorage_utiltiy_1.WebStorageUtility.generateStorageKey(key);
        Object.defineProperty(target, propertyName, {
            get: function () {
                return webstorage_utiltiy_1.WebStorageUtility.get(webStorage, key);
            },
            set: function (value) {
                webstorage_utiltiy_1.WebStorageUtility.set(webStorage, key, value);
            }
        });
    };
}
//# sourceMappingURL=webstorage.js.map