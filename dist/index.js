"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kvp_symbol = Symbol();
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
    if (this[kvp_symbol]) {
        for (const k in this)
            if (this.hasOwnProperty(k))
                yield { key: k, value: this[k] };
    }
    else
        for (const k in this)
            if (this.hasOwnProperty(k))
                yield k;
}
function* getNextDesc() {
    yield* loopThroughKeys.call(this, Object.keys(this).sort((a, b) => {
        if (a > b)
            return -1;
        else
            return (a < b);
    }));
}
function* getNextAsc() {
    yield* loopThroughKeys.call(this, Object.keys(this).sort());
}
function* loopThroughKeys(keys) {
    if (this[kvp_symbol])
        for (const k of keys)
            yield { key: k, value: this[k] };
    else
        for (const k of keys)
            yield k;
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
