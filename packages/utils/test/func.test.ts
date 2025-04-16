import { Call } from "@/fun/callLink"
import { Overload } from "@/fun/overload"
import { describe,it,expect } from "vitest"

describe('testing function',()=>{
   it("cookie testing",()=>{
      let final = Call({
         name:(val)=>{
            if(!val) return "name+"
            return val+"+name"
         },
         Some:(value)=>{
            if(!value) return "Some+"
            return value+"+Some"
         }
      })
      expect(final.name.Some.end).toBe("name++Some")
      expect(final.name.Some.name.end).toBe("name++Some+name+Some+name")
   })

})

describe('Overload', () => {
   it('should match and call correct implementation', () => {
      const o = Overload()
      o.addImpl('number', 'number', (a: number, b: number) => a + b)
      o.addImpl('string', 'string', (a: string, b: string) => a + b)

      expect(o(1, 2)).toBe(3)
      expect(o('a', 'b')).toBe('ab')
   })

   it('should throw error for unmatched signature', () => {
      const o = Overload()
      o.addImpl('number', 'number', (a: number, b: number) => a + b)

      expect(() => o('hello', 123)).toThrow('No matching function')
   })

   it('should throw error if no implementations and proxy is called', () => {
      const o = Overload()
      const fn = o.proxy()
      expect(() => fn(1, 2)).toThrow('No overload implementations have been registered.')
   })

   it('should call correct implementation via proxy', () => {
      const o = Overload()
      o.addImpl('number', 'number', (a: number, b: number) => a * b)
      o.addImpl('string', 'string', (a: string, b: string) => `${a}=${b}`)

      const fn = o.proxy()
      expect(fn(2, 4)).toBe(8)
      expect(fn("hello", "world")).toBe("hello=world")
      console.log(fn(2,4))
      console.log(fn("hello", "world"))
   })

   it('should throw if Proxy is not supported', () => {
      const originalProxy = globalThis.Proxy
      // @ts-ignore
      global.Proxy = undefined

      const o = Overload()
      expect(() => o.proxy()).toThrow('Proxy is not supported in this environment.')

      globalThis.Proxy = originalProxy // restore
   })
})
