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
export declare type Entries<T extends Map<keyof T, T[keyof T]> | any[] | object> = T extends Map<infer K, infer V>
  ? [K, V][]
  : T extends object
  ? [keyof T, T[keyof T]][]
  : T extends any[]
  ? [keyof T, T[keyof T]][]
  : never;
export declare type OptionsCallback<T> = (value: T) => boolean;
export declare type OptionsInspectCallback<T> = (value: T) => void;
/**
 * Represents an optional value that may or may not exist.
 */
export declare interface Options<T> {
   /**
   * Checks if the option contains a value (Some).
   * @returns `true` if the option contains a value, `false` otherwise.
   */
  isSome(): boolean;
  /**
   * Checks if the option is empty (None).
   * @returns `true` if the option is empty, `false` otherwise.
   */
  isNone(): boolean;
  /**
   * Retrieves the value from the option.
   * @returns The value if it exists, or 'None' if the option is empty.
   */
  unwrap(): T | 'None';
  /**
   * Retrieves the value from the option, or returns a default value if the option is empty.
   * @param defaultValue The default value to return if the option is empty.
   * @returns The value if it exists, or the specified default value.
   */
  unwrapOr<V>(defaultValue: V): V|T;
  /**
   * Checks if the option contains a value (Some) and satisfies a condition.
   * @param callback The condition to check against the value.
   * @returns `true` if the option contains a value and the condition is satisfied, `false` otherwise.
   */
  isSomeAnd(callback: OptionsCallback<T>): boolean;
  /**
   * Retrieves the value from the option, or throws an error with a custom error message if the option is empty.
   * @param msg The error message to throw if the option is empty.
   * @returns The value if it exists.
   * @throws Error with the specified error message if the option is empty.
   */
  expect(msg: string): T;
  /**
   * Performs a side effect operation on the value of the option.
   * @param callback The callback function to invoke with the value.
   * @returns The option itself.
   */
  inspect(callback: OptionsInspectCallback<T>): Options<T>;
}

export declare interface OptionsSome<T> extends Options<T> {
   unwrap():T | 'None'
   isSome(): true
   isNone(): false
}

export declare interface OptionsNone<T> extends Options<T> {
   unwrap():'None'
   isSome(): false
   isNone(): true
}
