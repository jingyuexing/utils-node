/**
 * Creates a memoized function that caches the result of a promise-based callback on successful execution.
 * @template T - The type of the arguments passed to the callback function.
 * @template R - The type of the result returned by the callback function.
 * @param {(...args: T[]) => Promise<R>} cb - The promise-based callback function to execute.
 * @returns {{ onerror: (cb: (e: Error) => void) => void, invoke: (...args: T[]) => Promise<R> }} - An object containing the `onerror` function to set the error handler and the `invoke` function to invoke the callback.
 */
export function memoizedOnSuccess<T, R>(cb: (...args: T[]) => Promise<R>) {
   let _successFlag = false;
   let _values: R | undefined = undefined;
   let _errorHandler: (e: Error) => void;
   /**
    * Sets the error handler function to handle errors thrown by the callback.
    * @param {(e: Error) => void} cb - The error handler function.
    */
   const onerror = (cb: (e: Error) => void) => {
      _errorHandler = cb;
   };
   /**
    * Invokes the callback function with the provided arguments and returns a promise that resolves to the result.
    * If the callback has been executed successfully before, it returns a cached result instead.
    * @param {...T[]} args - The arguments to pass to the callback function.
    * @returns {Promise<R>} - A promise that resolves to the result returned by the callback function.
    */
   const invoke = (...args: T[]) => {
      if (_successFlag) {
         return Promise.resolve(_values as R);
      }
      const promise = cb.call(null, ...args);
      return Promise.all([promise])
         .then(([val]) => {
            _values = val;
            _successFlag = true;
            return val;
         })
         .catch((reason) => {
            if (_errorHandler) {
               _errorHandler(reason);
            } else {
               throw reason;
            }
         });
   };
   return {
      onerror,
      invoke
   }
}
