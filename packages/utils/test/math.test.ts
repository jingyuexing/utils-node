import { it, describe, expect } from 'vitest';
import { getLowestBits, getHighestBits, getLowestBytes } from '../src/math';

describe('testing math module', () => {
   it('testing getLowestBits', () => {
      const value = 0xccefc;
      expect(getLowestBits(value, 8)).eq(0xfc, 'this value should be 0xfc');
      expect(getLowestBits(value, 12)).eq(0xefc, 'this value should be 0xefc');
   });
   it('testing getHighestBits', () => {
      const value = 0xefaec12;
      expect(getHighestBits(value, 8)).eq(0xef, 'this value should be 0xef');
      expect(getHighestBits(value, 12)).eq(0xefa, 'this value should be 0xefa');
   });
   it("testing getLowestBytes",()=>{
      const value = 0xefacaeefacf;
      expect(getLowestBytes(value,2)).eq(0xfacf,"this value should be 0xfacf")
   })
});
