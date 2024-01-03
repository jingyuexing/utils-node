import { curry } from '@/fun/curry';
import { describe, expect, it } from 'vitest';

describe("test curry function",()=>{
   it("test two params",()=>{
      function add(a:number,b:number){
         return a+b;
      }
      const curriedAdd = curry(add)
      expect(curriedAdd(3)(4)).eq(7)

      function compose(a:number,b:string){
         return `${a}+${b}`
      }
      const curriedCompose = curry(compose)
      expect(curriedCompose(12)("ARGS")).eq("12+ARGS")
   })
})
