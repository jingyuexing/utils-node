import { Dict } from "../types";

/**
 * check if an object is an array
 * @param  {unknown} val the target object
 * @return {boolean}  is an array is true else false
 */
export function isArray(val: unknown): val is unknown[] {
   return !isUndefined(Array.isArray) ? Array.isArray(val) : toString.call(val) === '[object Array]';
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
export function isObject<K extends number | string | symbol, V>(val: unknown): val is Dict<K, V> {
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
export function isNumber(val: unknown): val is number {
   return toString.call(val) === '[object Number]' && !Number.isNaN(val);
}

/**
 * check if an object is not a number
 * @param  {unknown} val the target object
 * @return {boolean}  is not a number is true else false
 */

export  function isNaN(val: unknown): val is typeof NaN {
   if(Number.isNaN){
      return Number.isNaN(val);
   }else{
      return typeof val === 'number' && (val).toString() === 'NaN'
   }
}

/**
 * check if an object is like an array
 * @param  {unknown} val the target object
 * @return {boolean}  is like an array is true else false
 */
export function isArrayLike(val: unknown & { length: number } & {size:number}): boolean {
   return val.length !== undefined || val.size !== undefined;
}

/**
 * check if an object is an empty object
 * @param  {unknown} val the target object
 * @return {boolean}     if object an empty object is true else false
 */
export function isEmpty(val?: unknown): boolean {
   if (isArray(val)) {
      return val.length === 0;
   } else if (isString(val)) {
      return val.trim().length === 0;
   } else if (isSet(val) || isMap(val)) {
      return val.size === 0;
   } else if (isObject(val)) {
      if(isUndefined(Reflect)){
         return Object.getOwnPropertyNames(val).length === 0
      }else{
         return Reflect.ownKeys(val).length === 0
      }
   } else if(isNull(val) || isUndefined(val)){
      return true
   }
   return false
}

/**
 * check if an object is an empty value, example: null,undefine,NaN
 * @param  {unknown} val the target value
 * @returns {boolean} is an empty value is true else false
 */
export function isNone(val:unknown):val is undefined | null | typeof NaN {
   return isNaN(val) || isUndefined(val) || isNull(val) || isInfinity(val)
}

/**
 * check if an object is a undefined object
 * @param  {unknown} val the target object
 * @return {boolean}  is a undefined is true else false
 */
export function isUndefined(val: unknown): val is undefined {
   return (typeof val) === "undefined";
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
/**
 * check if an object is default value is true otherwise is false
 * @param {unknown} val the value to be checked
 */
export function isZero(val:unknown){
   if(isArray(val)){
      return JSON.stringify(val) === "[]"
   }else if(isObject(val)){
      return JSON.stringify(val) === "{}"
   }else if(isNumber(val)){
      return val === 0
   }else if(isMap(val) || isSet(val)){
      return val.size === 0
   }else if(isString(val)){
      return val === ""
   }else{
      return false
   }
}

/**
 * check if an object is a Infinity value
 * @param  {unknown} val the target object
 * @return {boolean}  is a Infinity or -Infinity is true else false
 */
export function isInfinity(val:unknown){
   return val === Infinity || val === (-Infinity)
}

/**
 * [isAsyncFunction description]
 * @param  {unknown} val [description]
 * @return {val}         [description]
 */
export function isAsyncFunction(val:unknown): val is Promise<unknown>{
   return toString.call(val) === "[object AsyncFunction]"
}
/**
 * check if an object is a primitive type
 * @param  {unknown} val the target object
 * @return {boolean}  is a `string`,`number`,`undefined`,`bigint`,`boolean` is true else false
 */
export function isPrimitive(val:unknown):boolean {
   const type = typeof val;
   return (
      type === "string" ||
      type === "number" ||
      type === "undefined" ||
      type === "bigint" ||
      type === "boolean"
   )
}
/**
 * @deprecated
 * @param  {unknown} a [description]
 * @param  {unknown} b [description]
 * @return {boolean}   [description]
 */
export function isEqual(a:unknown,b:unknown):boolean{
   if(a === b) {
      // this case is 0 and -0
      return a !== 0 || 1 / a === 1 / (b as number)
   }else{
      return a === b
   }
}
