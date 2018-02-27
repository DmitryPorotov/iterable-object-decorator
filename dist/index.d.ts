export declare class IterableObjectDecorator {
    static decorate(obj: any, returnKvp?: boolean, dir?: 'desc' | 'asc'): any;
}
export declare function Iterable(returnKvp?: boolean, dir?: 'desc' | 'asc'): (target: any, propertyKey: string) => void;
export interface IKeyValuePair {
    key: string;
    value: any;
}
