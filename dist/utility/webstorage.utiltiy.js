"use strict";
var KEY_PREFIX = "angular2ws";
var WebStorageUtility = (function () {
    function WebStorageUtility() {
    }
    WebStorageUtility.generateStorageKey = function (key) {
        return KEY_PREFIX + "_" + key;
    };
    WebStorageUtility.get = function (storage, key) {
        var storageKey = WebStorageUtility.generateStorageKey(key);
        var value = storage.getItem(storageKey);
        return WebStorageUtility.getGettable(value);
    };
    WebStorageUtility.set = function (storage, key, value) {
        var storageKey = WebStorageUtility.generateStorageKey(key);
        storage.setItem(storageKey, WebStorageUtility.getSettable(value));
    };
    WebStorageUtility.remove = function (storage, key) {
        var storageKey = WebStorageUtility.generateStorageKey(key);
        storage.removeItem(storageKey);
    };
    WebStorageUtility.getSettable = function (value) {
        return typeof value === "string" ? value : JSON.stringify(value);
    };
    WebStorageUtility.getGettable = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    };
    return WebStorageUtility;
}());
exports.WebStorageUtility = WebStorageUtility;
//# sourceMappingURL=webstorage.utiltiy.js.map