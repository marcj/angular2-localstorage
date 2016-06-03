import {Injectable, OnDestroy} from "@angular/core";
import {NgZone} from "@angular/core";

export class LocalStorageEmitter {

    protected static subscribed: any = [];
    protected static ngZones: NgZone[] = [];

    public static register(ngZone: NgZone) {
        let index: number = LocalStorageEmitter.ngZones.indexOf(ngZone);
        if (index === -1) {
            index = LocalStorageEmitter.ngZones.push(ngZone) - 1;
        }
        LocalStorageEmitter.subscribed[index] = ngZone.onMicrotaskEmpty.subscribe(() => {
            for (let callback of LocalStorageEmitter.subscribers) {
                callback();
            }
        });
    }

    protected static subscribers: any = [];

    public static subscribe(callback: Function) {
        LocalStorageEmitter.subscribers.push(callback);
    }

    public static unregister(ngZone: NgZone) {
        let index: number = LocalStorageEmitter.ngZones.indexOf(ngZone);
        if (index >= 0) {
            LocalStorageEmitter.subscribed[index].unsubscribe();
        }
    }
}

@Injectable()
export class LocalStorageService implements OnDestroy {
    constructor(private ngZone: NgZone) {
        LocalStorageEmitter.register(this.ngZone);
    }

    ngOnDestroy() {
        LocalStorageEmitter.unregister(this.ngZone);
    }
}

import {Type} from "@angular/core/src/facade/lang";
import {provide} from "@angular/core/src/di";
import {ComponentRef} from "@angular/core";

export function LocalStorageSubscriber(appPromise: Promise<ComponentRef<any>>) {
    appPromise.then((bla) => {
        bla.injector.get(<Type>LocalStorageService);
    });
}
