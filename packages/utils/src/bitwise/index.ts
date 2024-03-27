import { countBits } from "@/math"

export function fill(target:number[],val:number):number[] {
   var mask:number,fullmask:number
   mask = 0xff
   let bit = countBits(val)
   fullmask = ((1 << bit) - 1)
   mask = ( fullmask >> 8) ^ mask
   while(mask != 0){
      let c = val & mask
      val = val & (mask ^ fullmask)
      console.table({
         hex:c.toString(16),
         cache:c,
         value:val
      })
      target.push(c)
      mask = mask >> 8
      fullmask = fullmask >> 8
      bit = bit - 8
   }
   return target
}
