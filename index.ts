const kvp_symbol = Symbol();

export function decorateIterableObject(obj: any, dir?: 'desc' | 'asc', returnKvp?: boolean) {
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

function* getNext(this: any): IterableIterator<string | IKeyValuePair> {
  if (this[kvp_symbol]) {
    for (const k in this)
      if (this.hasOwnProperty(k)) yield {key: k, value: this[k]};
  } else
    for (const k in this)
      if (this.hasOwnProperty(k)) yield k;
}

function* getNextDesc(this: any): IterableIterator<string | IKeyValuePair> {
  yield* loopThroughKeys.call(this, Object.keys(this).sort((a, b) => {
    if (a > b) return -1;
    else return (a < b) as any;
  }));
}

function* getNextAsc(this: any): IterableIterator<string | IKeyValuePair> {
  yield* loopThroughKeys.call(this, Object.keys(this).sort());
}

function* loopThroughKeys(this: any, keys: string[]): IterableIterator<string | IKeyValuePair> {
  if (this[kvp_symbol])
    for (const k of keys) yield {key: k, value: this[k]};
  else
    for (const k of keys) yield k;
}

export function Iterable(dir?: 'desc' | 'asc', returnKvp?: boolean): (target: any, propertyKey: string) => void {
  return function (this: any, target: any, propertyKey: string): void {
    const s = Symbol();
    Object.defineProperty(target.constructor.prototype, propertyKey, <PropertyDescriptor>{
      set: function (this: any, val: any): void {
        this[s] = decorateIterableObject(val, dir, returnKvp);
      },
      get: function (this: any): any {
        return this[s];
      }
    });
  };
}

export interface IKeyValuePair {
  key: string,
  value: any
}