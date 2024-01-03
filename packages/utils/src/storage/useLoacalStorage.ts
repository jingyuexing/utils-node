import { objectPath } from "../object"
export function useLocalStorage(name: string) {
   let storage:any = null;

   const value = localStorage.getItem(name);
   if (value) {
      storage = JSON.parse(value);
   }
   Object.defineProperty(storage, name, {
      get() {
         return storage;
      },
      set(newValue) {
         storage = newValue;
         localStorage.setItem(name, JSON.stringify(newValue));
      },
   });

   return storage;
}
