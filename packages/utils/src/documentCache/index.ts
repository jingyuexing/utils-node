import { isUndefined } from '@/typeis';
import { duration } from '../duration';
import type { Dict, DurationUnits } from '../types';
type ExpiresValue<T> = {
   [P in keyof T]: {
      value: T[P];
      expires: number;
   };
};
type ProxyValue<T extends ExpiresValue<T>> = {
   [key in keyof T]: T[key]['value'];
};
export class DocumentCache<T extends object & {}> {
   private callbacks: Dict<
      'change' | 'changeTime' | 'changeValue' | 'timeout',
      ((...args: any[]) => void)[]
   > = {
      change: [],
      changeTime: [],
      changeValue: [],
      timeout: [],
   };
   $data: ExpiresValue<T>;
   data: ProxyValue<T & object>;
   constructor(data: object = {}) {
      const that = this;
      that.$data = {} as ExpiresValue<T>;
      that.callbacks;
      Object.keys(data).forEach(key => {
         that.$data[key as keyof T] = {
            value: (data as any)[key as keyof T],
            expires: duration(new Date(), '10m').getTime(),
         };
      });
      if (isUndefined(Proxy)) {
         Object.keys(data).forEach(key => {
            Object.defineProperty(that, key, {
               get() {
                  const now = Date.now();
                  if (now < that.$data[key as keyof T].expires) {
                     that.$data[key as keyof T].expires += 60000;
                     that.call('change', 'change', that.$data[key as keyof T]);
                     that.call('changeTime', 'changeTime', that.$data[key as keyof T]);
                     return that.$data[key as keyof T].value;
                  } else {
                     that.call('timeout', 'timeout', that.$data[key as keyof T]);
                     that.$data[key as keyof T] = undefined;
                     return undefined;
                  }
               },
               set(v) {
                  that.$data[key as keyof T].value = v;
                  that.$data[key as keyof T].expires += 60000;
               },
            });
         });
      } else {
         that.data = new Proxy(that.$data, {
            get: (target, key) => {
               const item = target[key as keyof T];
               if (item && item.expires > Date.now()) {
                  item.expires = duration(new Date(), '1m').getTime();
                  this.call('change', 'change', item);
                  this.call('changeTime', 'changeTime', item);
                  return item.value;
               } else {
                  this.call('timeout', target[key as keyof T]);
                  target[key as keyof T] = undefined;
                  return undefined;
               }
            },
            set: (target, prop, value) => {
               target[prop as keyof T] = {
                  value,
                  expires: duration(new Date(), '10m').getTime(),
               };
               this.call('change', 'change', target[prop as keyof T]);
               this.call('changeValue', 'changeValue', target[prop as keyof T]);
               this.call('changeTime', 'changeTime', target[prop as keyof T]);
               return true;
            },
         });
      }
   }
   private call(eventName: 'change' | 'changeTime' | 'changeValue' | 'timeout', ...args: any[]) {
      for (let i = 0; i < this.callbacks[eventName].length; i++) {
         this.callbacks[eventName][i](...args);
      }
   }
   setTime(key: keyof T, time: `${number}${DurationUnits}` = '10m') {
      this.$data[key].expires = duration(new Date(), time).getTime();
      this.call('change');
      this.call('changeTime');
   }
   on(eventName: 'change' | 'changeTime' | 'changeValue' | 'timeout', callback: (...args: any[]) => void) {
      // TODO:
      this.callbacks[eventName].push(callback);
   }
}

export function useCeche<T extends {}>(obj: T) {
   const caches = new DocumentCache<T>(obj);
   function getCache() {
      return caches;
   }
   return getCache();
}
