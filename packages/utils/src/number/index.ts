import { isArray } from "..";

export function decimal(integer: number, float: number) {
  const integerMask = (1 << integer) - 1;
  const floatMask = (1 << float) - 1;
  const floatLength = float;
  const integerLength = integer;
  let floatPart = 0;
  let integerPart = 0;
  const getFloat = () => {
    let floatBits = floatPart & floatMask;
    let result = 0;
    let bits = float;

    while (floatBits !== 0) {
      result += (floatBits & 1) * 2 ** -bits;
      floatBits >>= 1;
      bits--;
    }

    return result;
  };
  const setNumber = (val: number | [number, number]) => {
    if (isArray(val)) {
      [integerPart, floatPart] = val;
    } else {
      integerPart = val >> float;
      floatPart = val & floatMask;
    }
  };
  const valueOf = () => {
    return getInteger() + getFloat();
  };

  const getInteger = () => {
    let integerBits = integerPart & integerMask;
    let result = 0;
    let bits = integer;

    while (integerBits !== 0) {
      result += (integerBits & 1) * 2 ** bits;
      integerBits >>= 1;
      bits--;
    }

    return result;
  };
  const toString = ()=>{
   return `${valueOf()}`
  }
  return {
    getFloat,
    getInteger,
    setNumber,
    valueOf,
    toString
  };
}
