export declare function decorateIterableObject(obj: any, dir?: 'desc' | 'asc', returnKvp?: boolean): any;
export declare function Iterable(dir?: 'desc' | 'asc', returnKvp?: boolean): (target: any, propertyKey: string) => void;
export interface IKeyValuePair {
    key: string;
    value: any;
}
