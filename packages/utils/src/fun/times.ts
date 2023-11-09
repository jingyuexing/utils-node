export function times<P, T>(cb: (...args: P[]) => T, x: number) {
   let _value: T;
   let _times = 0;
   let _errorHandler: (e: Error) => void;
   const onerror = (cb: (e: Error) => void) => {
      _errorHandler = cb;
   };
   const invoke = (...args: P[]): T => {
      try {
         if (_times < x) {
            _value = cb.call(null, ...args);
            _times++;
         }
      } catch (e) {
         _errorHandler.call(null, e as Error);
      }
      return _value;
   };
   const reset = () => {
      _times = 0;
   };
   return {
      reset,
      onerror,
      invoke,
   };
}
