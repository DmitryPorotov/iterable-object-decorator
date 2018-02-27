export class IterableObjectDecorator {
    public static decorate(obj: any, returnKvp?: boolean, dir?: 'desc' | 'asc'): any {
        obj[kvp_symbol] = !!returnKvp;
        if (!dir) {
            obj[Symbol.iterator] = getNext;
        } else if ('desc' === dir) {
            obj[Symbol.iterator] = getNextDesc;
        } else {
            obj[Symbol.iterator] = getNextAsc;
        }

        return obj;
    }
}

function* getNext(this: any): IterableIterator<string | IKeyValuePair> {
    for (const p in this) {
        if (this.hasOwnProperty(p)) {
            if (this[kvp_symbol]) {
                yield {
                    key: p,
                    value: this[p]
                };
            } else {
                yield p;
            }
        }
    }
}

const kvp_symbol = Symbol();

function* getNextDesc(this: any): IterableIterator<string | IKeyValuePair> {
    const keys = Object.keys(this).sort((a, b) => {
        if (a > b) {
            return -1;
        } else {
            return (a < b) as any;
        }
    });
    yield* loopThroughKeys.call(this, keys);
}

function* getNextAsc(this: any): IterableIterator<string | IKeyValuePair> {
    const keys = Object.keys(this).sort();
    yield* loopThroughKeys.call(this, keys);
}

function* loopThroughKeys(this: any, keys: string[]): IterableIterator<string | IKeyValuePair> {
    for (let i = 0; i < keys.length; ++i) {
        if (this[kvp_symbol]) {
            yield {
                key: keys[i],
                value: this[keys[i]]
            };
        } else {
            yield keys[i];
        }
    }
}

export function Iterable(returnKvp?: boolean, dir?: 'desc' | 'asc'): (target: any, propertyKey: string) => void {

    return function (this: any, target: any, propertyKey: string): void {
        const s = Symbol();

        Object.defineProperty(target.constructor.prototype, propertyKey, <PropertyDescriptor>{
            set: function (this: any, val: any): void {
                this[s] = val;
                if (!dir) {
                    this[s][Symbol.iterator] = getNext;
                } else if ('desc' === dir) {
                    this[s][Symbol.iterator] = getNextDesc;
                } else {
                    this[s][Symbol.iterator] = getNextAsc;
                }
                this[s][kvp_symbol] = !!returnKvp;
            },
            get: function (this: any): any {
                return this[s];
            }
        });
    };
}

export interface IKeyValuePair {
    key: string;
    value: any;
}
