export function isArray(val: any): val is any[] {
   return toString.call(val) === "[object Array]"
}
export function isMap<K, V>(val: any): val is Map<K, V> {
   return toString.call(val) === "[object Map]"
}
export function isObject<K extends number | string | symbol, V>(val: any): val is Utils.Dict<K, V> {
   return toString.call(val) === "[object Object]"
}

export function isString(val: unknown): val is string {
   return toString.call(val) === "[object String]";
}

export function isNull(val: unknown): val is null {
   return toString.call(val) === "[object Null]"
}

export function isSet<T>(val: unknown): val is Set<T> {
   return toString.call(val) === "[object Set]";
}

export function isArrayLike(val: unknown): boolean {
   return val?.length !== undefined;
}

export function isEmpty(val?: unknown): boolean {
   if (isArray(val)) {
      isString(val)
      return val.length === 0;
   } else if (isString(val)) {
      return val.trim().length === 0;
   } else if (isSet(val) || isMap(val)) {
      return val.size === 0;
   } else if (isObject(val)) {
      return Object.keys(val).length === 0;
   } else {
      return false
   }
}

export function isUndefined(val: unknown): val is undefined {
   return toString.call(val) === "[object Undefined]"
}
