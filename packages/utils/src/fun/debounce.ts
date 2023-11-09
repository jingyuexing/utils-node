/**
 * creates a debounced function that executes the callback only once within a specified duration.
 * @param {(...args: P[]) => T} callback - The callback function to execute.
 * @param {number} duration - The duration (in milliseconds) within which the callback function should only be executed once. Default value is 3000 milliseconds.
 * @returns {(...args: any[]) => T} - The wrapped debounced function.
 */
export function useDebounce<T, P extends object & {}>(callback: (...args: P[]) => T, duration = 3000) {
   let timeout: ReturnType<typeof setTimeout> | undefined = undefined;
   let enable = true;
   let result: T | undefined;

   const wrapper = function (...args: any[]) {
      if (enable) {
         clearTimeout(timeout); // 清除之前的定时器
         enable = false;
         timeout = setTimeout(() => {
            result = callback(...args);
            enable = true;
         }, duration);
      }
      return result;
   };

   return wrapper;
}

export function debounce<T>(delay: number): MethodDecorator {
   return function (
      _target: Object,
      _propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<any>,
   ) {
      const originalMethod = descriptor.value;
      descriptor.value = useDebounce<T, ReturnType<typeof originalMethod>>(originalMethod);
      return descriptor;
   };
}

export function debouncedByEvent(
   name: string,
   cb: Function,
   remove: [remove: typeof document.removeEventListener],
) {
   const [_remove] = remove;
   return function (...args: any[]) {
      cb(...args);
      _remove(name, e => {
         cb(e, ...args);
      });
   };
}
