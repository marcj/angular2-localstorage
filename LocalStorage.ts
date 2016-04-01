import {LocalStorageEmitter} from './LocalStorageEmitter';

export function LocalStorage(storageKey?:string) {
    return (target:Object, decoratedPropertyName?:string):void => {
        if (!localStorage) {
            return;
        }

        if (!storageKey) {
            storageKey = '' + '/' + decoratedPropertyName;
        }

        Object.defineProperty(target, '_' + decoratedPropertyName + '_mapped', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });

        var instances = [];
        var values = {};

        var storageValue = localStorage.getItem(storageKey) || null;
        var storageValueJSON = storageValue;
        if ('string' === typeof storageValue) {
            try {
                storageValue = JSON.parse(storageValue);
            } catch(e) {
                storageValue = null;
                storageValueJSON = 'null';
            }
        }
        var oldJSONValues = {};

        Object.defineProperty(target, decoratedPropertyName, {
            get: function () {
                if (false === this['_' + decoratedPropertyName + '_mapped']) {
                    this['_' + decoratedPropertyName + '_mapped'] = instances.length;

                    //first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;

                    instances.push(this);
                }
                return values[this['_' + decoratedPropertyName + '_mapped']];
            },
            set: function (newValue) {
                if (false === this['_' + decoratedPropertyName + '_mapped']) {
                    this['_' + decoratedPropertyName + '_mapped'] = instances.length;

                    //first registration triggers a setting to localStorage value
                    values[instances.length] = storageValue;
                    oldJSONValues[instances.length] = storageValueJSON;

                    instances.push(this);
                    //first 'set' call is ignored if we have already a value from the localStorage
                    if (storageValue) {
                        return;
                    }
                }
                values[this['_' + decoratedPropertyName + '_mapped']] = newValue;
            },
            enumerable: true,
            configurable: true
        });

        LocalStorageEmitter.subscribe(() => {
            for (let instance of instances) {
                var currentValue = JSON.stringify(instance[decoratedPropertyName]);
                var oldJSONValue = oldJSONValues[this['_' + decoratedPropertyName + '_mapped']];
                if (currentValue !== oldJSONValue) {
                    oldJSONValues[this['_' + decoratedPropertyName + '_mapped']] = currentValue;
                    localStorage.setItem(storageKey, currentValue);
                }
            }
        });
    }
}
