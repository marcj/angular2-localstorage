import {Injectable, OnDestroy} from 'angular2/core';
import {NgZone} from 'angular2/src/core/zone';

export class LocalStorageEmitter {

    protected static subscribed = [];
    protected static ngZones:NgZone[] = [];

    public static register(ngZone:NgZone) {
        let index:number = LocalStorageEmitter.ngZones.indexOf(ngZone);
        if (index === -1) {
            index = LocalStorageEmitter.ngZones.push(ngZone) - 1;
        }
        LocalStorageEmitter.subscribed[index] = ngZone.onMicrotaskEmpty.subscribe(() => {
            for (let callback of LocalStorageEmitter.subscribers) {
                callback();
            }
        });
    }

    protected static subscribers = [];

    public static subscribe(callback:Function) {
        LocalStorageEmitter.subscribers.push(callback);
    }

    public static unregister(ngZone:NgZone) {
        let index:number = LocalStorageEmitter.ngZones.indexOf(ngZone);
        if (index >= 0) {
            LocalStorageEmitter.subscribed[index].unsubscribe();
        }
    }
}

@Injectable()
class LocalStorageService implements OnDestroy {
    constructor(private ngZone:NgZone) {
        LocalStorageEmitter.register(this.ngZone);
    }

    ngOnDestroy() {
        LocalStorageEmitter.unregister(this.ngZone);
    }
}

import {Type} from "angular2/src/facade/lang";
import {provide} from 'angular2/src/core/di';
import {ComponentRef} from 'angular2/core';

export function LocalStorageSubscriber(appPromise:Promise<ComponentRef>) {
    appPromise.then((bla) => {
        bla.injector.resolveAndInstantiate(<Type>LocalStorageService);
    });
}
