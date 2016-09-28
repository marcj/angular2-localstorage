/// <reference types="core-js" />
import { OnDestroy, NgZone, NgModuleRef } from "@angular/core";
export declare class LocalStorageEmitter {
    protected static subscribed: any;
    protected static ngZones: NgZone[];
    static register(ngZone: NgZone): void;
    protected static subscribers: any;
    static subscribe(callback: Function): void;
    static unregister(ngZone: NgZone): void;
}
export declare class LocalStorageService implements OnDestroy {
    private ngZone;
    constructor(ngZone: NgZone);
    ngOnDestroy(): void;
}
export declare function LocalStorageSubscriber(appPromise: Promise<NgModuleRef<any>>): void;
