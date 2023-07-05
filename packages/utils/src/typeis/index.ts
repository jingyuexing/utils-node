/**
 * check if an object is an array
 * @param  {unknown} val the target object
 * @return {boolean}  is an array is true else false
 */
export function isArray(val: unknown): val is any[] {
   return toString.call(val) === '[object Array]';
}
/**
 * check if an object is a Map
 * @param  {unknown} val the target object
 * @return {boolean}  is a Map is true else false
 */
export function isMap<K, V>(val: unknown): val is Map<K, V> {
   return toString.call(val) === '[object Map]';
}

/**
 * check if an object is an Object
 * @param  {unknown} val the target object
 * @return {boolean}  is a Object is true else false
 */
export function isObject<K extends number | string | symbol, V>(val: any): val is Utils.Dict<K, V> {
   return toString.call(val) === '[object Object]';
}

/**
 * check if an object is a string
 * @param  {unknown} val the target object
 * @return {boolean}  is a string is true else false
 */
export function isString(val: unknown): val is string {
   return toString.call(val) === '[object String]';
}

/**
 * check if an object is an null
 * @param  {unknown} val the target object
 * @return {boolean}  is a null is true else false
 */
export function isNull(val: unknown): val is null {
   return toString.call(val) === '[object Null]';
}

/**
 * check if an object is an Set
 * @param  {unknown} val the target object
 * @return {boolean}  is a Set is true else false
 */
export function isSet<T>(val: unknown): val is Set<T> {
   return toString.call(val) === '[object Set]';
}

/**
 * check if an object is an Object
 * @param  {unknown} val the target object
 * @return {boolean}  is a Object is true else false
 */
export function isNumber(val: any): val is number {
   return toString.call(val) === '[object Number]' && !Number.isNaN(val);
}

/**
 * check if an object is not a number
 * @param  {unknown} val the target object
 * @return {boolean}  is not a number is true else false
 */
export function isNaN(val: unknown): val is typeof NaN {
   return Number.isNaN(val);
}

/**
 * check if an object is like an array
 * @param  {unknown} val the target object
 * @return {boolean}  is like an array is true else false
 */
export function isArrayLike(val: unknown & { length: number }): boolean {
   return val.length !== undefined
}

/**
 * check if an object is an empty object
 * @param  {unknown} val the target object
 * @return {boolean}     if object an empty object is true else false
 */
export function isEmpty(val?: unknown): boolean {
   if (isArray(val)) {
      isString(val);
      return val.length === 0;
   } else if (isString(val)) {
      return val.trim().length === 0;
   } else if (isSet(val) || isMap(val)) {
      return val.size === 0;
   } else if (isObject(val)) {
      return Object.keys(val).length === 0;
   } else {
      return false;
   }
}

/**
 * check if an object is a undefined object
 * @param  {unknown} val the target object
 * @return {boolean}  is a undefined is true else false
 */
export function isUndefined(val: unknown): val is undefined {
   return toString.call(val) === '[object Undefined]';
}

/**
 * Check if an object is the expected object
 * @param val - The value to be checked
 * @param typeobject - The expected object type
 * @returns Whether the value is the expected object type
 */
export function isThat<T>(val: unknown, typeobject: { new(): T }): val is T {
   const typeString = Object.prototype.toString.call(new typeobject());
   const valString = Object.prototype.toString.call(val);
   return typeString === valString;
}
