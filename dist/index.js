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
    yield* loopThroughKeys.call(this, Object.keys(this));
}
const kvp_symbol = Symbol();
function* getNextDesc() {
    yield* loopThroughKeys.call(this, Object.keys(this).sort((a, b) => {
        if (a > b) {
            return -1;
        }
        else {
            return (a < b);
        }
    }));
}
function* getNextAsc() {
    yield* loopThroughKeys.call(this, Object.keys(this).sort());
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
