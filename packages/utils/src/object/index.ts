import { isArray, isMap, isObject } from '@/typeis';
/**
 * exclude specified fields
 * @type {T}
 * @param {T} obj the target object
 * @param {(keyof T)[]} excludeName the exclude fields
 */
export function exclude<T extends object>(obj: T, excludeName: (keyof T)[]) {
   const keys = Object.keys(obj) as unknown as (keyof T)[];
   const result: any = {};
   keys.forEach(key => {
      if (!excludeName.includes(key)) {
         result[key] = obj[key];
      }
   });
   return result;
}
/**
 * rename object field
 * @param {T} obj the target object
 * @param {{ [P in keyof T]: string }} config change config
 */
export function renameKey<T extends object & {}>(obj: T, config: { [P in keyof T]: string }) {
   const result = {};
   const configKeys = Object.keys(config);
   configKeys.forEach(key => {
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
 * @return {Utils.Entries<T>}
 */
export function entries<T extends any[] | Map<any, any> | (Object & {})>(obj: T): Utils.Entries<T> {
   let entries_: [keyof T, any][] = [];
   if (isArray(obj)) {
      obj.forEach((val, index) => {
         entries_.push([index as Utils.Keyof<T>, val]);
      });
   } else if (isMap(obj)) {
      entries_ = [...obj.entries()] as [any, any][];
   } else if (isObject(obj)) {
      Object.keys(obj).forEach(key => {
         entries_.push([key as Utils.Keyof<T>, (obj as any)[key]]);
      });
   }
   return entries_ as Utils.Entries<T>;
}

export function Extends(target: any, obj: any) {
   return Object.assign(target, Object.create(obj));
}
