export declare function exclude<T extends object>(obj: T, excludeName: (keyof T)[]): any;
export declare function renameKey<T extends object & {}>(obj: T, config: {
    [P in keyof T]: string;
}): any;
export declare function isArray(val: any): val is any[];
export declare function isMap(val: any): val is Map<any, any>;
export declare function isObject(val: any): val is Object;
export declare function entries<T extends any[] | Map<any, any> | Object & {}>(obj: T): [any, any][];
