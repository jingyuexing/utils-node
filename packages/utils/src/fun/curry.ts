type Curried<A extends any[], R> = A extends []
  ? () => R
  : A extends [infer ARGS]
  ? (param: ARGS) => R
  : A extends [infer ARGS, ...infer REST]
  ? (param: ARGS) => Curried<REST, R>
  : never;

export function curry<A extends any[], R>(fn: (...args: A) => R): Curried<A, R> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...(args as A));
    }
    return (...args2: any[]) => curried(...args, ...args2);
  } as any;
}
