import { isUndefined } from "../typeis";
/**
 * @type {T}
 * @param {T} obj the target object
 * @param {(key:keyof T,value:T[keyof T],target:T)=>boolean} filter the filter
 */
export function reactive<T extends object & {}>(obj: T, filter?: (key: keyof T, value: T[keyof T], target?: T) => boolean) {
   let _getter: <S>(target: T, key: string | symbol) => S
   let _setter: <S>(target: T, key: string | symbol, value: any) => S
   let _reactiveObject: T = {} as T;
   let defaultFilter = filter || function(key,value,target){return true};
   const handler: ProxyHandler<T> = {
      get(target, key) {
         if (!isUndefined(_getter) && defaultFilter(key as keyof T, Reflect.get(target,key), _reactiveObject)) {
            _getter(target, key)
         }
         return Reflect.get(target, key, _reactiveObject);
      },
      set(target, key, value) {
         if (!isUndefined(_setter) && defaultFilter(key as keyof T, value, target)) {
            _setter(target, key, value)
         }
         return Reflect.set(target, key, value, _reactiveObject);
      },
   };
   if (typeof Proxy !== "undefined") {
      _reactiveObject = new Proxy(obj, handler);
   } else {
      for (const key in obj) {
         Object.defineProperty(obj, key, {
            get() {
               if (!isUndefined(_getter) && defaultFilter(key as keyof T, obj[key], _reactiveObject)) {
                  _getter(obj, key)
               }
               return obj[key];
            },
            set(value) {
               if (!isUndefined(_setter) && defaultFilter(key as keyof T, obj[key], _reactiveObject)) {
                  _setter(obj, key, value)
               }
               obj[key] = value;
            },
         });
      }
      _reactiveObject = obj;
   }
   const getter = (cb: (<S>(target: T, key: keyof T | string | symbol) => S)) => {
      _getter = cb
   }
   const setter = (cb: <S>(target: T, key: keyof T | string | symbol, value: T[keyof T]) => S) => {
      _setter = cb
   }
   return {
      values: _reactiveObject,
      getter,
      setter
   }
}
