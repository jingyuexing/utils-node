type Result<T, E> = Ok<T> | Err<E>;

type Ok<T> = {
  ok: true;
  value: T;
};

type Err<E> = {
  ok: false;
  error: E;
};

export function Result<T, E>() {
  // Helper types for readability
  type OkValue<T> = { ok: true; value: T };
  type ErrValue<E> = { ok: false; error: E };

  // Factory functions for clarity
  const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
  const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

  // Type guards for improved type safety
  const isOk = <T, E>(result: Result<T, E>): result is OkValue<T> => result.ok === true;
  const isErr = <T, E>(result: Result<T, E>): result is ErrValue<E> => result.ok === false;

  // Utility functions with clearer error handling
  const unwrap = <T, E>(result: Result<T, E>): T => {
    if (!isOk(result)) {
      throw new Error(`Cannot unwrap an Err value: ${result.error}`);
    }
    return result.value;
  };

  const unwrapOr = <T, E>(result: Result<T, E>, defaultValue: T): T =>
    isOk(result) ? result.value : defaultValue;

  const map = <T, U, E>(result: Result<T, E>, f: (value: T) => U): Result<U, E> => {
    if (!isOk(result)) {
      return err(result.error);
    }
    return ok(f(result.value));
  };

  const andThen = <T, U, E>(result: Result<T, E>, f: (value: T) => Result<U, E>): Result<U, E> => {
    if (!isOk(result)) {
      return err(result.error);
    }
    return f(result.value);
  };

  const tryCatch = <T, E>(block: () => T): Result<T, E> => {
    try {
      return ok(block());
    } catch (error) {
      return err(error) as Result<T,E>;
    }
  };

  // Return the public API with improved type safety
  return {
    ok,
    err,
    isOk,
    isErr,
    unwrap,
    unwrapOr,
    map,
    andThen,
    tryCatch
  } as const; // Mark the object as immutable
}


