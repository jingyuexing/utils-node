import type { Dict } from '../types';

export function useEmit() {
   const emitList = new Map<string, Function[]>();
   return {
      Emit<T extends string>(name: T) {
         const list = emitList.get(name) ?? [];
         return function (target: any, propertyName: string) {
            list.push(target[propertyName]);
            emitList.set(name, list);
         };
      },
      Handler<T extends string, R>(name: T, ...args: R[]): Dict<T, R[]> {
         const events = emitList.get(name);
         const obj: any = {};
         if (events) {
            obj[name] = events.map(func => {
               return func(args);
            });
            return obj;
         } else {
            obj[name] = [];
            return obj;
         }
      },
   };
}
