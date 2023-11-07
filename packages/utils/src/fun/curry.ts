type Curry<Fn extends (...args: any[]) => any, Args extends any[] = []> =
    Args['length'] extends Parameters<Fn>['length']
    ? ReturnType<Fn>
    : (arg: Parameters<Fn>[Args['length']]) => Curry<Fn, [...Args, Parameters<Fn>[Args['length']]]>;

export function curry<Fn extends (...args: any[]) => any>(fn: Fn) {
    return function curried(...args: any[]) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...args2: any[]) => curried(...args, ...args2);
    };
}
