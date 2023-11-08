import { Overload } from '@/fun/overload';
import { describe, expect, it, test } from 'vitest';

describe("function overload testing case",()=>{
   it("two params case",()=>{
      const addTwo = Overload();
      addTwo.addImpl("string","string",(a:string,b:string)=>{
         return a+b;
      })
      addTwo.addImpl("number","number",(a:number,b:number)=>{
         return a+b
      })
      expect(addTwo(12,33)).eq(45)
      expect(addTwo("hello ","world")).eq("hello world")
   })
   it("three params case",()=>{
      const test2 = Overload()
      test2.addImpl("number","number","number",(a:number,b:number,c:number)=>{
         return a+b+c;
      })
      test2.addImpl("number","string","number",(a:number,b:string,c:number)=>{
         return `${a + c} ${b}`
      })
      expect(test2(1,2,3)).eq(6)
      expect(test2(1,"A",6)).eq("7 A")
   })
})
