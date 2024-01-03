
type CommandFunction<P extends any[], R> = (...args: P) => R;

export function commander<N extends string, P extends any[], R>() {
    const commanders: Record<N, CommandFunction<P, R>> & {} = {} as Record<N, CommandFunction<P, R>>;
    const register = <P extends any[],R>(name: N, cb: CommandFunction<P, R>) => {
        (commanders as any)[name] = cb;
    };
    const execute = (name: N, ...args: P) => {
        return commanders[name](...args);
    };
    return {
        register,
        execute
    };
}


const { register, execute } = commander()


register("hai",function(name:string){
   return "${1}"
})

execute("hai",12);
