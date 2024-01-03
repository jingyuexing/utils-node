type Func<T, U> = (prev: U, order: number) => U;

export function fibExecute<T, U>(...funcs: Func<U, U>[]): (arg: U) => U {
  const result: U[] = [];
  return (val: U) => {
    let order = 1;
    result.push(val);
    for (const func of funcs) {
      const output = func(result[order - 1], order);
      result.push(output);
      order++;
    }
    return result[result.length - 1];
  };
}
