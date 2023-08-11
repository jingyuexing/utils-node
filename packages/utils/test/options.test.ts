import { Option } from '@/options';
import { describe, expect, it, Nullable } from 'vitest';

describe('options testing case',()=>{
   it('some testing case',()=>{
      let data:Nullable<any[]> = []
      const expectResult = Option(data).expect('this is empty array')
      expect(expectResult).toEqual(data)
      data = null
      expect(Option(data).isNone()).eq(true)
   })
   it('None testing case',()=>{
      let data:Nullable<number> = 12;
      expect(Option(data).unwrapOr(33)).eq(12)
      data = null
      expect(Option(data).unwrapOr(44)).eq(44)
      data = undefined
      expect(Option(data).unwrap()).eq('None')
   })
})
