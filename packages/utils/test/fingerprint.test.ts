import { describe, expect, it } from 'vitest';
import { fingerprint } from '@/fingerprint';

describe("testing fingerprint",()=>{
   it("fingerprint testing case",()=>{
      expect(fingerprint()).eq("")
   })
})
