import { countBits } from "@/math"

export function fill(target: number[], val: number): number[] {
   let _value = val;
   while (_value !== 0) {
      target.push(_value & 0xff)
      _value = _value >>> 8
   }
   return target.reverse()
}
