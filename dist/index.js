"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iterable = exports.decorateIterableObject = void 0;
const kvp_symbol = Symbol();
function decorateIterableObject(obj, dir, returnKvp) {
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
exports.decorateIterableObject = decorateIterableObject;
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
function Iterable(dir, returnKvp) {
    return function (target, propertyKey) {
        const s = Symbol();
        Object.defineProperty(target.constructor.prototype, propertyKey, {
            set(val) {
                this[s] = decorateIterableObject(val, dir, returnKvp);
            },
            get() {
                return this[s];
            }
        });
    };
}
exports.Iterable = Iterable;
