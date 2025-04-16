type Call<T extends string | number | symbol, V = any, Value = any> = {
  // Define a recursive type for nested calls with type-safe keys
  [K in T & string]: Call<T, V, Value>;
} & {
  // Add a property 'end' to hold the final value
  ["end"]: Value;
};


// Function to create a chain of callable functions
export function Call<Names extends string, T>(
  params: Record<Names, (v: unknown) => unknown> // Use a generic signature for value manipulation
){
  // Ensure a concrete value is used for correct flow typing
  let value: unknown = undefined;

  const fnObj: Call<keyof typeof params, unknown, T> = Object.create(null);

  Object.keys(params).forEach((fnName) => {
    const fn = params[fnName as keyof typeof params];

    Object.defineProperty(fnObj, fn.name, {
      get() {
        // Preserve compatibility with unknown by casting back to unknown
        value = fn(value as unknown) as unknown;
        return this
      },
    });
  });

  Object.defineProperty(fnObj, "end", {
    get() {
      // Use unknown for broader compatibility with possible return types
      return value as unknown as T;
    },
  });

  return fnObj;
}
