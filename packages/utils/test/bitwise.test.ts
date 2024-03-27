import { describe, expect, it } from 'vitest';
import { fill } from "@/bitwise"
describe("testing bitwise operator",()=>{
   it("testing fill",()=>{
      let testingData = 0xceffdd0e;
      let result = fill([],testingData)
      expect(result[0]).eq(0xce)
      expect(result[1]).eq(0xff)
      expect(result[2]).eq(0xdd)
      expect(result[3]).eq(0x0e)
   })
})
