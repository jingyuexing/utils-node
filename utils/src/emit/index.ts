export function useEmit() {
   const emitList = new Map<string, Function[]>();
   return {
      Emit<T extends string>(name: T) {
         const list = emitList.get(name) ?? [];
         return function (target: any, propertyName: string) {
            list.push(target[propertyName]);
            emitList.set(name, list);
         }
      },
      Handler<T extends string>(name: T, ...args: any[]) {
         let events = emitList.get(name)
         if (events) {
            let obj: any = {}
            obj[name] = events.map((func) => {
               return func(args)
            })
            return obj
         } else {
            return []
         }
      }
   }
}
