export declare function decorateIterableObject(obj: any, returnKvp?: boolean, dir?: 'desc' | 'asc'): any;
export declare function Iterable(returnKvp?: boolean, dir?: 'desc' | 'asc'): (target: any, propertyKey: string) => void;
export declare class KeyValuePair {
    key: string;
    value: any;
    constructor(key: string, value: any);
    toString(): string;
}
