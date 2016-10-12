"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var webstorage_utiltiy_1 = require("../utility/webstorage.utiltiy");
var WebStroageService = (function () {
    function WebStroageService(storage) {
        this.storage = storage;
    }
    WebStroageService.prototype.get = function (key) {
        return webstorage_utiltiy_1.WebStorageUtility.get(this.storage, key);
    };
    WebStroageService.prototype.set = function (key, value) {
        webstorage_utiltiy_1.WebStorageUtility.set(this.storage, key, value);
    };
    WebStroageService.prototype.remove = function (key) {
        webstorage_utiltiy_1.WebStorageUtility.remove(this.storage, key);
    };
    WebStroageService.prototype.clear = function () {
        this.storage.clear();
    };
    return WebStroageService;
}());
exports.WebStroageService = WebStroageService;
var LocalStorageService = (function (_super) {
    __extends(LocalStorageService, _super);
    function LocalStorageService() {
        _super.call(this, localStorage);
    }
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}(WebStroageService));
exports.LocalStorageService = LocalStorageService;
var SessionStorageService = (function (_super) {
    __extends(SessionStorageService, _super);
    function SessionStorageService() {
        _super.call(this, sessionStorage);
    }
    SessionStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SessionStorageService);
    return SessionStorageService;
}(WebStroageService));
exports.SessionStorageService = SessionStorageService;
//# sourceMappingURL=webstorage.service.js.map