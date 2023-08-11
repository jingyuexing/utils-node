import { isNone } from '../typeis'
import type { Nullable,Options, OptionsInspectCallback,OptionsNone,OptionsSome } from '../types'
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

export function Some<T>(value: T): OptionsSome<T> {
  return {
    isSome: () => true,
    isNone: () => false,
    unwrap: () => {
      if (isNone(value)) {
        console.error('Value is None');
        return 'None';
      }
      return value;
    },
    unwrapOr: <Default>(defaultValue: Default) => {
      if (isNone(value)) {
        return defaultValue;
      }
      return value;
    },
    isSomeAnd: (callback:(val:T)=>boolean) => {
      if (isNone(value)) {
        return false;
      }
      return callback(value);
    },
    expect: (msg: string) => {
      if (isNone(value)) {
        throw new Error(msg);
      }
      return value;
    },
    inspect: (callback: OptionsInspectCallback<T>) => {
      if (isNone(value)) {
        return None();
      }
      callback(value);
      return Some(value);
    },
  };
}

export function Option<T>(value: Nullable<T>): Options<T> {
  if (isNone(value)) {
    return None();
  } else {
    return Some(value);
  }
}
