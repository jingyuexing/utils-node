export declare type Nullable<T> = T | null | undefined;
export declare type Method<T, R> = <T>() => R;
export declare type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};
export declare type NumberLike = `${number}` | number;

export declare type Dict<K extends string | number | symbol, V> = {
  [P in K]: V;
};
export declare type Union<T extends unknown[]> = T[number];

export declare type Literal<T extends number[] | string[] | symbol[]> = T[number];

export declare type DurationUnits = "Y" | "M" | "w" | "d" | "h" | "m" | "s";

export declare type Keyof<T> = keyof T;
export declare type MapKeys<T extends Map<any, any>> = T extends Map<infer K, any> ? K : never;
export declare type Entries<T extends Map<keyof T,T[keyof T]> | any[] | object> = T extends Map<infer K, infer V>
  ? [K,V][]
  : T extends object
  ? [keyof T, T[keyof T]][]
  : T extends any[]
  ? [keyof T, T[keyof T]][]
  : never;
export interface Some<T>{
  expect(msg:string):Some<T>;
  unwrap():T;
}