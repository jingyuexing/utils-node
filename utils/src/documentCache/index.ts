import { duration } from "../duration";
type ExpiresValue<T> = {
   [P in keyof T]: {
      value: T[P],
      expires: number
   }
}
export class DocumentCache<T extends object & {}> {
   private callbacks: Utils.Dict<"change" | "changeTime" | "changeValue" | "timeout", (() => void)[]> = {
      change: [],
      changeTime: [],
      changeValue: [],
      timeout: []
   };
   $data: ExpiresValue<T>;
   constructor(data: object = {}) {
      let self = this
      this.$data = {} as ExpiresValue<T>;
      this.callbacks
      Object.keys(data).forEach((key) => {
         this.$data[key as keyof T] = {
            value: (data as any)[key],
            expires: duration(new Date(), "1m").getTime()
         }
         Object.defineProperty(this, key, {
            get() {
               let now = Date.now()
               if (now < self.$data[key as keyof T].expires) {
                  return self.$data[key as keyof T].value
               }
            },
            set(v) {
               self.$data[key as keyof T].value = v;
            },
         })
      })
   }
   setTime(key: keyof T, time: `${number}${Utils.DurationUnits}` = "10m") {

      this.$data[key].expires = duration(new Date(), time).getTime();
   }
   on(eventName: "change" | "changeTime" | "changeValue" | "timeout", callback: () => void) {
      // TODO:
      this.callbacks[eventName].push(callback)
   }

}

function useCeche<T extends {}>(obj: T) {
   let caches = new DocumentCache<T>(obj);
   function getCache() {
      return caches;
   }
   return getCache()
}
