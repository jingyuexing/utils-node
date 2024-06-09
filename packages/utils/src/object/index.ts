import { isArray, isEmpty, isMap, isNone, isObject, isWeakMap, isZeroValue, typeis } from "../typeis";
import type { Entries, Keyof } from "../types";
import { getRandomInt } from "../math";
/**
 * exclude specified fields
 * @type {T}
 * @param {T} obj the target object
 * @param {(keyof T)[]} excludeName the exclude fields
 */
export function exclude<T extends object>(obj: T, excludeName: (keyof T)[]) {
   const keys = Object.keys(obj) as unknown as (keyof T)[];
   const result: any = {};
   keys.forEach((key) => {
      if (!excludeName.includes(key)) {
         result[key] = obj[key];
      }
   });
   return result;
}

type Rename<T extends object, Key extends Record<keyof T, string | number | symbol>> = {
   [K in keyof T as K extends keyof Key ? Key[K] : K]: K extends keyof T ? T[K] : never;
};

/**
 * rename object field
 * @param {T} obj the target object
 * @param {{ [P in keyof T]: string }} config change config
 */
export function renameKey<T extends object & {}, Key extends Record<keyof T, string | number | symbol>>(
   obj: T,
   config: Key,
): Rename<T, Key> {
   const result = {};
   const configKeys = Object.keys(config);
   configKeys.forEach((key) => {
      (result as any)[(config as any)[key]] = (obj as any)[key];
   });
   const others = exclude(obj, configKeys as unknown as (keyof T)[]);

   return {
      ...result,
      ...others,
   };
}
/**
 * Convert object to entries form
 * @example
 * ```js
 * entries({a:"12",b:33})
 * // [["a","12"],["b",33]]
 * ```
 * @param {T} obj the target object
 * @return {Entries<T>}
 */
export function entries<T extends any[] | Map<any, any> | (Object & {})>(obj: T): Entries<T> {
   let entries_: [keyof T, any][] = [];
   if (isArray(obj)) {
      obj.forEach((val, index) => {
         entries_.push([index as Keyof<T>, val]);
      });
   } else if (isMap(obj)) {
      entries_ = [...obj.entries()] as [any, any][];
   } else if (isObject(obj)) {
      Object.keys(obj).forEach((key) => {
         entries_.push([key as Keyof<T>, (obj as any)[key]]);
      });
   }
   return entries_ as Entries<T>;
}

export function Extends(target: any, obj: any) {
   return Object.assign(target, Object.create(obj));
}

/**
 * @param {T} obj the target object
 * @param {K} path the key
 * @param {K} delimiter the delimiter, default "."
 * @type {T}
 */
export function objectPath<T extends { [key: string | number]: any }, K extends string | keyof T>(
   obj: T,
   path: K,
   delimiter = ".",
): any | undefined {
   return (path as string).split(delimiter).reduce((value, key) => {
      if (value && Object.prototype.hasOwnProperty.call(value, key)) {
         return value[key];
      }
      return undefined;
   }, obj);
}


type NestedPath<T extends string> = T extends `${infer First}.${infer Rest}`
   ? First extends string
   ? { [K in First]: NestedPath<Rest> }
   : never
   : T extends string
   ? { [K in T]: any }
   : never;

export function createNestedObject<T extends string>(str: T, value: string, delimiter = "."): NestedPath<T> {
   const keys = str.split(delimiter) as (keyof NestedPath<T>)[];

   const lastIndex = keys.length - 1;
   const nestedObject = {} as NestedPath<T>;

   keys.reduce((obj, key, index) => {
      if (index === lastIndex) {
         (obj as any)[key] = value;
      } else {
         (obj as any)[key] = obj[key] || {};
      }
      return obj[key] as NestedPath<T>;
   }, nestedObject);

   return nestedObject;
}

export function nestedObject(target: object, path: string,delimiter:string=".",cb?: (target: any, key: string) => void): any {
   const keys: string[] = path.split(delimiter);
   let currentTarget: any = target;

   for (const key of keys) {
      if ((isArray(currentTarget) || isObject(currentTarget)) && Object.keys(currentTarget).indexOf(key) !== -1) {
         currentTarget = (currentTarget as any)[key];
         if(cb){
            cb(currentTarget, key);
         }
      } else {
         throw new Error("Unreachable access path");
      }
   }
   return currentTarget
}

/**
 * Recursively filter out null values in the object
 * @param {Object|Array} obj the object to be filtered
 * @returns {Object|Array} Object after filtering out empty values
 */
export function filterEmpty<T extends any[] | Map<any, any> | (Object & {})>(obj: T): any {
   return Array.isArray(obj)
      ? obj.reduce((acc, cur) => {
         if (isEmpty(cur)) {
            return acc;
         }
         if (isObject(cur) || isArray(cur)) {
            const filtered = filterEmpty(cur);
            if (!isEmpty(filtered)) {
               return [...acc, filtered];
            }
         } else {
            return [...acc, cur];
         }
      }, [] as any[])
      : Object.entries(obj as { [key: string]: any }).reduce((acc, [key, value]) => {
         if (isEmpty(value)) {
            return acc;
         }
         if (isObject(value) || isArray(value)) {
            const filtered = filterEmpty(value);
            if (!isEmpty(filtered)) {
               return { ...acc, [key]: filtered };
            }
         } else {
            return { ...acc, [key]: value };
         }
      }, {} as any);
}
/**
 * Creates a new object by omitting specified keys from the input object.
 * @param {T} object - The input object from which keys will be omitted.
 * @param {K[]} keys - An array of keys to be omitted from the object.
 * @returns {Omit<T, K>}  A new object without the specified keys.
 */
export function OmitObjectKeys<T extends object & {}, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
   const OmitObject = {} as Omit<T, K>;
   return objectFilter(object, (key) => {
      return !(keys.indexOf(key as K) !== -1)
   }) as Omit<T, K>
}

/**
 * Creates a new object by picking specified keys from the input object.
 * @param {T} object - The input object from which keys will be picked.
 * @param {K[]} keys - An array of keys to be picked from the object.
 * @returns {Pick<T, K>}  A new object containing only the specified keys.
 */
export function PickObjectKeys<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
   return objectFilter(object, (key) => {
      return keys.indexOf(key as K) !== -1
   }) as Pick<T, K>
}
/**
 * [target description]
 * @type {T}
 */
export function objectFilter<T extends object>(target: T, filter: (key: keyof T, value: T[keyof T]) => boolean) {
   const filterObject = {}
   Object.getOwnPropertyNames(target).forEach((key) => {
      let value = (target as any)[key as T[keyof T]]
      if (Boolean(filter(key as keyof T, value))) {
         (filterObject as any)[key] = value
      }
   })
   return filterObject
}

type TypeOf<T> =
   T extends object
      ? "object"
      : T extends Array<unknown>
         ? "array"
         : T extends number
            ? "number"
            : T extends string
               ? "string"
               : T extends boolean
               ? "boolean"
               : "never"

type TypeObject<T extends object> = {
   [K in keyof T]:TypeOf<T[K]>
}

export function settingZeroValue<T extends object>(target:T,zeroConfig:Partial<{number:number,string:string,boolean:boolean,array:any[],object:any}>){
 Object.getOwnPropertyNames(target).forEach((key)=>{
   let valueType = typeis((target as any)[key]) as keyof typeof zeroConfig;
   let zeroValue = zeroConfig[valueType]
   if (zeroValue && (isZeroValue(target[key as keyof T]) || isNone(target[key as keyof T]))) {
      (target as any)[key] = zeroValue
   }
 })
 return target
}

export function randomChoosen<T>(arr: T[], nums: number) {
   const result: T[] = [];
   for (let i = 0; i < nums; i++) {
      result.push(arr[getRandomInt(0, arr.length)]);
   }
   return result;
}

export function traverseObject(target: object, sym = "."): Record<string, any> {
   const record: Record<string, any> = {};

   const traverse = (obj: any, path: string[]) => {
      if (typeof obj === "object") {
         for (const key in obj) {
            switch (typeof obj[key]) {
               case "object":
                  if (isArray(obj[key]) || isMap(obj[key]) || isWeakMap(obj[key])) {
                     (obj[key] as any[]).forEach((value, idx) => {
                        traverse(value, path.concat(`${key}${sym}${idx}`));
                     });
                  } else {
                     traverse(obj[key], path.concat(key));
                  }
                  break;
               case "function":
                  break;
               default:
                  record[path.concat(key).join(sym)] = obj[key];
            }
         }
      } else {
         record[path.join(sym)] = obj;
      }
   };
   traverse(target, []);

   return record;
}
