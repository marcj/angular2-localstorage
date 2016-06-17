import { OnDestroy } from "@angular/core";
import { NgZone } from "@angular/core";
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
import { ComponentRef } from "@angular/core";
export declare function LocalStorageSubscriber(appPromise: Promise<ComponentRef<any>>): void;
