import { convert } from '@/convert';
import { describe, expect, it } from 'vitest';

describe("convert testing",()=>{
   const { weight,storage,netSpeed } = convert()
   it("convert weight test case",()=>{
      expect(weight(1000,"g","kg")).eq(1,"1000g should be 1kg")
      expect(weight(1,"kg","g")).eq(1000,"1kg should be 1000g")
      expect(weight(1,"kg","g")).eq(1000,"1kg should be 1000g")
      expect(weight(1000,"kg","t")).eq(1,"1000kg should be 1t")
   })
   it("convert storage unit test case",()=>{
      expect(storage(1024,"KB","MB")).eq(1,"1024KB should be 1MB")
      expect(storage(1024,"MB","GB")).eq(1,"1024MB should be 1GB")
      expect(storage(1024,"GB","TB")).eq(1,"1024GB should be 1TB")
      expect(storage(1024,"TB","PB")).eq(1,"1024TB should be 1PB")
      expect(storage(33,"MB","KB")).eq(33792,"33MB should be 33792KB")
   })
   it("convert net speet unit test case",()=>{
      expect(netSpeed(300,"Kbps","Gbps"))
   })
})
