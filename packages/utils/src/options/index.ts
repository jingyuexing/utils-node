import { isArray, isNone, isObject } from '../typeis'
import type { Nullable,Options, OptionsInspectCallback,OptionsNone,OptionsSome, ToOptions } from '../types'
/**
 * Creates an empty option (None).
 * @returns An empty option (None).
 */
export function None<T>(): OptionsNone<T> {
  return {
    isSome: () => false,
    isNone: () => true,
    unwrap: () => 'None',
    unwrapOr: <Default>(defaultValue: Default) => defaultValue,
    isSomeAnd: () => false,
    expect: (msg: string) => {
      throw new Error(msg);
    },
    inspect: () => None(),
  };
}
/**
 * Creates an option with a value (Some).
 * @param value The value to wrap in the option.
 * @returns An option with the specified value.
 */
export function Some<T>(value: T): OptionsSome<T> {
   const _value = value
  return {
    isSome: () => true,
    isNone: () => false,
    unwrap: () => {
      if (isNone(value)) {
        console.error('Value is None');
        return 'None';
      }
      return _value;
    },
    unwrapOr: <Default>(defaultValue: Default) => {
      if (isNone(_value)) {
        return defaultValue;
      }
      return _value;
    },
    isSomeAnd: (callback:(val:T)=>boolean) => {
      if (isNone(_value)) {
        return false;
      }
      return callback(_value);
    },
    expect: (msg: string) => {
      if (isNone(_value)) {
        throw new Error(msg);
      }
      return _value;
    },
    inspect: (callback: OptionsInspectCallback<T>) => {
      if (isNone(_value)) {
        return None();
      }
      callback(_value);
      return Some(_value);
    },
  };
}
/**
 * Creates an option from a value.
 * @param value The value to convert to an option.
 * @returns An option containing the specified value, or an empty option (None) if the value is null or undefined.
 */
export function Option<T>(value: Nullable<T>): Options<T> {
  if (isNone(value)) {
    return None();
  } else {
    return Some(value);
  }
}

export function toOption<T>(value: T): ToOptions<T> {
  if (isNone(value)) {
    return Option(value) as ToOptions<T>;
  }

  if (isArray(value)) {
    return Option(value.map((val) => toOption(val))) as ToOptions<T>;
  }

  if (isObject(value)) {
    const optionsObject = Object.entries(value).reduce((acc, [key, val]) => {
      return { ...acc, [key]: toOption(val) };
    }, {}) as ToOptions<T>;
    return Option(optionsObject) as ToOptions<T>
  }

  return Option(value) as ToOptions<T>;
}

