export type Nullable<T> = T | null | undefined;
export type Method<T, R> = <T>() => R;
export type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};
export type NumberLike = `${number}` | number;

export type Dict<K extends string | number | symbol, V> = {
  [P in K]: V;
};
export type Union<T extends unknown[]> = T[number];

export type Literal<T extends number[] | string[] | symbol[]> = T[number];

export type DurationUnits = "Y" | "M" | "w" | "d" | "h" | "m" | "s";

export type Keyof<T> = keyof T;

export type Entries<T extends Map<K, V> | any[] | object> = T extends Map<K, V>
  ? [K, V][]
  : T extends object
  ? [keyof T, T[keyof T]][]
  : T extends any[]
  ? [keyof T, T[keyof T]][]
  : never;
