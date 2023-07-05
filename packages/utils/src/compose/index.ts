/**
 * define a composite function
 * @param {Function[]} ...funs functions that need to be combined
 */
export function compose(...funs: Function[]) {
   let callback = (func1: Function, func2: Function) => {
      return function (x: any) {
         return func1(func2(x));
      };
   };
   let fn = funs[0];
   for (let i = 1; i < funs.length; i++) {
      fn = callback(fn, funs[i]);
   }
   return fn;
}
