/**
 * Represents the signature of an overloaded function.
 * The last element of the tuple is the actual function implementation.
 */
type OverloadSignature<T extends any[]> = [...T, (...args: any[]) => any];
/**
 * Creates an overloaded function that can have multiple implementations based on argument types.
 * @returns The overloaded function.
 */
export function Overload() {
  const overloads: Map<string, (...args: any[]) => any> = new Map();
  /**
   * Generates a unique key based on the types of the provided arguments.
   * @param args - The arguments to generate a signature key from.
   * @returns The signature key.
   */
  function getSignatureKey(args: any[]): string {
    return args.map((arg) => typeof arg).join(",");
  }
  /**
   * The overloaded function. Invokes the appropriate implementation based on the arguments.
   * @param args - The arguments to match against the available implementations.
   * @returns The result of the matched implementation.
   * @throws {Error} Throws an error if no matching function is found.
   */
  function overload<T extends any[]>(...args: T) {
    const signatureKey = getSignatureKey(args);
    const matchingOverload = overloads.get(signatureKey);

    if (matchingOverload) {
      return matchingOverload(...args);
    }
    throw new Error("No matching function found");
  }
  /**
   * Adds a new implementation to the overloaded function.
   * @param args - The argument types defining the signature of the implementation.
   *               The last element of the arguments must be the actual function implementation.
   * @throws {Error} Throws an error if the last argument is not a function.
   */
  overload.addImpl = function <T extends any[]>(...args: OverloadSignature<T>): void {
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw new Error("Last argument must be a function");
    }
    overloads.set(args.join(','), fn);
  };

  return overload;
}
