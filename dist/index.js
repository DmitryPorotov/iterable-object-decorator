"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IterableObjectDecorator {
    static decorate(obj, returnKvp, dir) {
        obj[kvp_symbol] = !!returnKvp;
        if (!dir) {
            obj[Symbol.iterator] = getNext;
        }
        else if ('desc' === dir) {
            obj[Symbol.iterator] = getNextDesc;
        }
        else {
            obj[Symbol.iterator] = getNextAsc;
        }
        return obj;
    }
}
exports.IterableObjectDecorator = IterableObjectDecorator;
function* getNext() {
    for (const p in this) {
        if (this.hasOwnProperty(p)) {
            if (this[kvp_symbol]) {
                yield {
                    key: p,
                    value: this[p]
                };
            }
            else {
                yield p;
            }
        }
    }
}
const kvp_symbol = Symbol();
function* getNextDesc() {
    const keys = Object.keys(this).sort();
    yield* loopThroughKeys.call(this, keys);
}
function* getNextAsc() {
    const keys = Object.keys(this).sort((a, b) => {
        if (a > b) {
            return -1;
        }
        else {
            return (a < b);
        }
    });
    yield* loopThroughKeys.call(this, keys);
}
function* loopThroughKeys(keys) {
    for (let i = 0; i < keys.length; ++i) {
        if (this[kvp_symbol]) {
            yield {
                key: keys[i],
                value: this[keys[i]]
            };
        }
        else {
            yield keys[i];
        }
    }
}
function Iterable(returnKvp, dir) {
    return function (target, propertyKey) {
        const s = Symbol();
        Object.defineProperty(target.constructor.prototype, propertyKey, {
            set: function (val) {
                this[s] = val;
                if (!dir) {
                    this[s][Symbol.iterator] = getNext;
                }
                else if ('desc' === dir) {
                    this[s][Symbol.iterator] = getNextDesc;
                }
                else {
                    this[s][Symbol.iterator] = getNextAsc;
                }
                this[s][kvp_symbol] = !!returnKvp;
            },
            get: function () {
                return this[s];
            }
        });
    };
}
exports.Iterable = Iterable;
