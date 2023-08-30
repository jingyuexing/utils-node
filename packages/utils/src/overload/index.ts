type OverloadSignature<T extends any[]> = [...T, (...args: any[]) => any];

export function Overload() {
  const overloads: Map<string, (...args: any[]) => any> = new Map();

  function getSignatureKey(args: any[]): string {
    return args.map((arg) => typeof arg).join(",");
  }

  function overload<T extends any[]>(...args: T) {
    const signatureKey = getSignatureKey(args);
    const matchingOverload = overloads.get(signatureKey);

    if (matchingOverload) {
      return matchingOverload(...args);
    }
    throw new Error("No matching function found");
  }

  overload.addImpl = function <T extends any[]>(...args: OverloadSignature<T>): void {
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw new Error("Last argument must be a function");
    }
    overloads.set(args.join(','), fn);
  };

  return overload;
}
